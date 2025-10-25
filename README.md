# TIDAL_HACK_2025
Group project for TIDAL HACK 

## Inspiration

We were inspired by the growing need for community-driven safety awareness — especially for students and residents navigating cities or campuses at night. Many safety apps focus only on emergency alerts or police data, but we wanted something proactive and accessible, a way to “know before you go,” powered by real people and real data.
## What it does

PinSafe is a community-powered safety intelligence platform that helps users instantly understand how safe an area is.
- Users can view an interactive map, see recent reports, and drop pins to mark incidents.
- A built-in AI assistant provides contextual insights — users can ask, “Is it safe here?” and get an instant analysis based on crowd-sourced data.
- Anyone can report crimes or suspicious activity, rate severity, and contribute anonymously to the community database.

In short, PinSafe makes situational awareness simple and empowers users to make smarter, safer choices in real time.

## How we built it

We built the project using:
React + Vite + Tailwind CSS for a fast, responsive frontend UI.
Leaflet (React-Leaflet) for the interactive safety map and live pin markers.
FastAPI (Python) for backend APIs and geolocation data processing.
SQLite for structured data storage of reports and safety analytics.
Lucide Icons + Gradient UI design for a clean, modern visual experience.
The system ties together geolocation, AI-driven responses, and real-time map interactivity in one seamless app.

## Challenges we ran into

Handling real-time map updates without lag or layout glitches.
Getting the geolocation permissions to work smoothly across browsers and devices.
Balancing UI design for both desktop and mobile users while keeping a professional, lightweight interface.
Integrating AI safety insights that feel useful and natural to the user, rather than generic chatbot responses.

## Accomplishments that we're proud of

We made an attractice UI and map integration that connects to the database. 

## What we learned

- How to integrate Leaflet and React effectively for geolocation-based apps.
- The importance of data privacy and user trust when handling safety information.
- How to design user flows that encourage community participation without friction.
- The power of AI + crowdsourced data when combined thoughtfully for social good.

## What's next for PinSafe
Working AI chatbot integration with the database.

### Frontend
- Make sure node.js is installed, once installed, go to the pinsafe (not PinSafe) directory and do npm install, and then npm run dev to boot up the frontend server.
