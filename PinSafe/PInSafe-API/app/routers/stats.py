# app/routers/stats.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta, timezone

from ..database import get_db
from .. import models

router = APIRouter(prefix="/stats", tags=["Stats"])


@router.get("/total")
def total_reports(db: Session = Depends(get_db)):
    total = db.query(models.Incident).count()
    return {"total_reports": total}


@router.get("/last7")
def last7_reports(db: Session = Depends(get_db)):
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    last7 = db.query(models.Incident).filter(models.Incident.created_at >= cutoff).count()
    return {"reports_last_7_days": last7}


@router.get("/most-common")
def most_common_type(db: Session = Depends(get_db)):
    row = (
        db.query(models.Incident.type, func.count(models.Incident.id).label("count"))
        .group_by(models.Incident.type)
        .order_by(desc("count"))
        .first()
    )
    if not row:
        return {"most_common_type": None, "count": 0}

    return {"most_common_type": row[0], "count": row[1]}
