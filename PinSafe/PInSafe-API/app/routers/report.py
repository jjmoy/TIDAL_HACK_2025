from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/report",
    tags=["Report"]
)

@router.post("/", response_model=schemas.IncidentRead)
def create_report(payload: schemas.IncidentCreate, db: Session = Depends(get_db)):
    inc = models.Incident(
        lat=payload.lat,
        lng=payload.lng,
        type=payload.type,
        severity=payload.severity,
        note=payload.note,
        time_of_incident=payload.time_of_incident,
        grid_key=f"{round(payload.lat,3)}:{round(payload.lng,3)}",
    )
    db.add(inc)
    db.commit()
    db.refresh(inc)
    return inc
