from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func
from .database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    type = Column(String, nullable=False)
    severity = Column(Integer, nullable=False)
    note = Column(String, default="")
    time_of_incident = Column(DateTime, nullable=True)  # <-- user-entered time
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    grid_key = Column(String, index=True)
