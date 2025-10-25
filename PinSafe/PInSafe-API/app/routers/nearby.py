# app/routers/nearby.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from math import radians, sin, cos, asin, sqrt

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/nearby", tags=["Nearby"])

# Haversine distance (meters)
def haversine_m(lat1, lng1, lat2, lng2) -> float:
    R = 6371000.0  # meters
    dlat = radians(lat2 - lat1)
    dlng = radians(lng2 - lng1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlng / 2) ** 2
    return 2 * R * asin(sqrt(a))

@router.get("/", response_model=List[schemas.NearbyIncident])
def get_nearby(
    lat: float = Query(..., description="Center latitude"),
    lng: float = Query(..., description="Center longitude"),
    radius_m: int = Query(300, ge=50, le=5000, description="Search radius in meters"),
    days: Optional[int] = Query(None, ge=1, le=365, description="Limit to last N days"),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
):
    """
    Returns incidents within radius_m of (lat,lng), sorted by distance (asc), then time (desc).
    Optional 'days' filters by recency.
    """
    # 1) Quick bounding box prefilter to keep the SQL light
    # ~1 deg lat ≈ 111_000 m, ~1 deg lng ≈ 111_000 * cos(lat) m
    lat_pad = radius_m / 111_000.0
    lng_pad = radius_m / (111_000.0 * max(0.1, cos(radians(lat))))  # guard against poles

    q = (
        db.query(models.Incident)
        .filter(models.Incident.lat.between(lat - lat_pad, lat + lat_pad))
        .filter(models.Incident.lng.between(lng - lng_pad, lng + lng_pad))
    )

    if days is not None:
        from datetime import datetime, timedelta, timezone
        cutoff = datetime.now(timezone.utc) - timedelta(days=days)
        q = q.filter(models.Incident.created_at >= cutoff)

    candidates = q.limit(1000).all()  # cap prefilter set

    # 2) Precise distance filter in Python
    enriched = []
    for inc in candidates:
        d = haversine_m(lat, lng, inc.lat, inc.lng)
        if d <= radius_m:
            enriched.append((d, inc))

    # 3) Sort & cap result set
    enriched.sort(key=lambda x: (x[0],), reverse=False)
    enriched = enriched[:limit]

    # 4) Map to response model
    out = []
    for dist_m, inc in enriched:
        out.append(
            schemas.NearbyIncident(
                id=inc.id,
                lat=inc.lat,
                lng=inc.lng,
                type=inc.type,
                severity=inc.severity,
                note=inc.note or "",
                time_of_incident=inc.time_of_incident,
                created_at=inc.created_at,
                grid_key=inc.grid_key,
                distance_m=round(dist_m, 1),
            )
        )
    return out
