from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class IncidentCreate(BaseModel):
    lat: float
    lng: float
    type: str = Field(..., min_length=1)
    severity: int = Field(..., ge=1, le=5)
    note: Optional[str] = ""
    time_of_incident: Optional[datetime] = None  # user provides ISO 8601 string

class IncidentRead(IncidentCreate):
    id: int
    created_at: datetime
    grid_key: Optional[str] = None

    class Config:
        from_attributes = True
        
class NearbyIncident(IncidentRead):
    distance_m: float