# app/seed.py
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from random import randint, choice
from .database import SessionLocal, engine, Base
from .models import Incident

def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    # Each entry = (lat, lng, location, note)
    incidents_data = [
        (30.616833, -96.339222, "Evans Library", "Bike stolen near Evans Library racks."),
        (30.611904, -96.341012, "Memorial Student Center (MSC)", "Argument reported outside MSC fountain."),
        (30.621263, -96.340875, "Zachry Engineering Education Complex", "Backpack taken from study lounge in Zachry."),
        (30.620669, -96.343843, "Northgate District", "Group loitering near Northgate around midnight."),
        (30.624112, -96.336946, "Lot 50 Parking", "Suspicious vehicle slowly circling Lot 50."),
        (30.6119, -96.3441, "Wellborn Road Walkway", "Harassment reported while walking along Wellborn."),
        (30.6175, -96.3407, "Hullabaloo Hall", "Broken glass found at dorm entrance."),
        (30.6101, -96.3401, "Kyle Field", "Attempted wallet snatch after the football game."),
        (30.6162, -96.3384, "University Drive Tunnel", "Graffiti found inside pedestrian tunnel."),
        (30.6130, -96.3419, "MSC Bus Stop", "Aggressive shouting at the bus stop."),
        (30.6188, -96.3412, "Walton Hall", "Trespasser seen entering dorm stairwell."),
        (30.6113, -96.3452, "Lot 100e", "Car break-in, window shattered."),
        (30.6143, -96.3439, "Academic Plaza", "Student felt followed while walking near Academic Plaza."),
        (30.6150, -96.3448, "Sbisa Dining Hall", "Physical altercation reported near Sbisa."),
        (30.6108, -96.3396, "Reed Arena", "Unattended bag triggered safety inspection by police."),
    ]

    now = datetime.now()
    type_map = {
        "theft": ["Bike stolen", "Backpack taken", "Car break-in", "Wallet snatch"],
        "harassment": ["Harassment", "Aggressive shouting"],
        "suspicious activity": ["Suspicious vehicle", "Group loitering"],
        "vandalism": ["Graffiti", "Broken glass"],
        "disturbance": ["Argument", "Physical altercation"],
        "trespassing": ["Trespasser", "Unattended bag check"],
    }

    incidents = []
    for lat, lng, place, note in incidents_data:
        # Infer a type from the note
        type_guess = next(
            (t for t, keywords in type_map.items() if any(k.lower() in note.lower() for k in keywords)),
            "suspicious activity"
        )
        severity = randint(1, 5)
        # Time of incident within last 7 days
        time_of_incident = now - timedelta(hours=randint(2, 160))

        inc = Incident(
            lat=lat,
            lng=lng,
            type=type_guess,
            severity=severity,
            note=f"{note} (Location: {place})",
            time_of_incident=time_of_incident,
            grid_key=f"{round(lat,3)}:{round(lng,3)}",
        )
        incidents.append(inc)

    db.add_all(incidents)
    db.commit()
    db.close()
    print(f"Seeded {len(incidents)} realistic TAMU incidents.")

if __name__ == "__main__":
    seed()
