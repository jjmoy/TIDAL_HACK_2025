import React, { useRef, useState } from "react";
import {
  MapPin,
  Bell,
  Search,
  Locate,
  Layers,
  Send,
  AlertTriangle,
  Info,
} from "lucide-react";

// Leaflet / React-Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

// --- Fix default Leaflet marker icon paths (works in Vite/CRA) ---
const iconUrl = new URL("leaflet/dist/images/marker-icon.png", import.meta.url);
const iconRetinaUrl = new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url);
const shadowUrl = new URL("leaflet/dist/images/marker-shadow.png", import.meta.url);
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl.toString(),
  iconRetinaUrl: iconRetinaUrl.toString(),
  shadowUrl: shadowUrl.toString(),
});

export default function Crime() {
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: "user", text: "Is it safe here?" },
    {
      type: "bot",
      text:
        "Area labeled Caution ⚠️ - 3 incidents reported in the last 7 days within 0.5 miles. View details on map.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const pinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  });

  // --- Map state ---
  const mapRef = useRef(null);
  const [center, setCenter] = useState([37.7749, -122.4194]); // default: San Francisco
  const [zoom, setZoom] = useState(13);
  const [pin, setPin] = useState(null); // { lat, lng }
  
  // --- Report form state ---
  const [reportForm, setReportForm] = useState({
    lat: null,
    lng: null,
    crimeType: "",
    severity: 3,
    incidentTime: "",
    description: "",
  });

  // Click on the map to drop a pin and show report form
  function ClickToPin() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPin({ lat, lng });
        
        // Pre-fill form with location and current datetime
        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        
        setReportForm({
          lat: lat.toFixed(6),
          lng: lng.toFixed(6),
          crimeType: "",
          severity: 3,
          incidentTime: localDateTime,
          description: "",
        });
      },
    });
    return null;
  }

  // Locate Me handler
  const handleLocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        setCenter(latlng);
        setZoom(15);
        const map = mapRef.current;
        if (map) {
          map.flyTo(latlng, 15, { duration: 0.8 });
        }
        setPin({ lat: latlng[0], lng: latlng[1] });
        
        // Pre-fill form
        const now = new Date();
        const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        
        setReportForm({
          lat: latlng[0].toFixed(6),
          lng: latlng[1].toFixed(6),
          crimeType: "",
          severity: 3,
          incidentTime: localDateTime,
          description: "",
        });
      },
      () => {
        // Optional: toast/alert; silently ignore for now
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmitReport = () => {
    if (!reportForm.crimeType || !reportForm.incidentTime) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Here you would save to your database
    console.log("Submitting report:", reportForm);
    
    // For SQLite3, your datetime format would be: YYYY-MM-DD HH:MM:SS
    // Convert from HTML datetime-local format
    const sqliteDateTime = reportForm.incidentTime.replace('T', ' ') + ':00';
    
    const reportData = {
      latitude: parseFloat(reportForm.lat),
      longitude: parseFloat(reportForm.lng),
      crime_type: reportForm.crimeType,
      severity: parseInt(reportForm.severity),
      incident_datetime: sqliteDateTime, // SQLite3 format: "2025-10-25 14:30:00"
      description: reportForm.description,
    };
    
    console.log("SQLite3 format:", reportData);
    
    // Reset and close
    alert(`Report submitted!\n\nLocation: ${reportForm.lat}, ${reportForm.lng}\nType: ${reportForm.crimeType}\nSeverity: ${reportForm.severity}\nTime: ${sqliteDateTime}`);
    setPin(null);
    setReportForm({
      lat: null,
      lng: null,
      crimeType: "",
      severity: 3,
      incidentTime: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLocate}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-0"
            >
              <Locate className="w-4 h-4" />
              <span className="hidden sm:inline">Locate Me</span>
            </button>

            <select className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>0.5 miles</option>
              <option>1 mile</option>
              <option>2 miles</option>
              <option>5 miles</option>
            </select>

            <select className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Types</option>
              <option>Theft</option>
              <option>Assault</option>
              <option>Vandalism</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-0">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Toggle View</span>
            </button>

            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-6 relative rounded-xl overflow-hidden">
          <MapContainer
            center={center}
            zoom={zoom}
            className="w-full rounded-xl"
            style={{ height: "clamp(520px, 75vh, 900px)" }}
            scrollWheelZoom
            whenCreated={(map) => (mapRef.current = map)}   // ← add this
          >

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickToPin />

            {pin && (
              <Marker position={[pin.lat, pin.lng]} icon={pinIcon}>
                <Popup maxWidth={350} autoOpen={true} closeOnClick={false}>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-3">Report Incident</h3>
                    
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Location
                      </label>
                      <div className="text-sm text-gray-800">
                        Lat: {reportForm.lat}<br/>
                        Lng: {reportForm.lng}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Crime Type *
                      </label>
                      <select
                        value={reportForm.crimeType}
                        onChange={(e) => setReportForm({...reportForm, crimeType: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select type...</option>
                        <option value="Theft">Theft</option>
                        <option value="Assault">Assault</option>
                        <option value="Vandalism">Vandalism</option>
                        <option value="Suspicious Activity">Suspicious Activity</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Severity: {reportForm.severity}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={reportForm.severity}
                        onChange={(e) => setReportForm({...reportForm, severity: e.target.value})}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Incident Time *
                      </label>
                      <input
                        type="datetime-local"
                        value={reportForm.incidentTime}
                        onChange={(e) => setReportForm({...reportForm, incidentTime: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Description
                      </label>
                      <textarea
                        value={reportForm.description}
                        onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                        placeholder="Describe what happened..."
                        rows={3}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={handleSubmitReport}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setPin(null)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-blue-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setReportDrawerOpen((v) => !v)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center space-x-2 hover:scale-105 focus:outline-none focus:ring-0"
          > 
            <Bell className="w-5 h-5" />
            <span className="font-semibold">Report</span>
          </button>
          </div>

        </div>

        {/* Report Drawer (original, kept for reference) */}
        {reportDrawerOpen && (
          <div className="mt-4 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">New Report</h3>
              <button
                onClick={() => setReportDrawerOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-0"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-4">Click on the map to place a pin and report an incident at that location.</p>

            <button
              onClick={() => setReportDrawerOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-0"
            >
              Close
            </button>
          </div>
        )}

        {/* Location summary */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Downtown Area</h3>
              <p className="text-sm text-gray-500">37.7749° N, 122.4194° W</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Caution
              </span>
              <span className="text-sm text-gray-600">12 reports (7 days)</span>
            </div>
          </div>
        </div>

        {/* Chat (UNDER the map) */}
        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Messages */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 flex flex-col min-h-[320px]">
            <div className="flex-1 overflow-y-auto space-y-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-2 ${
                      msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["Is it safe here?", "Recent incidents?", "Safety tips"].map((p) => (
                <button
                  key={p}
                  onClick={() => setChatInput(p)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition focus:outline-none focus:ring-0"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about safety..."
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && chatInput.trim()) {
                    setChatMessages((m) => [...m, { type: "user", text: chatInput }]);
                    setChatInput("");
                  }
                }}
              />
              <button
                onClick={() => {
                  if (chatInput.trim()) {
                    setChatMessages((m) => [...m, { type: "user", text: chatInput }]);
                    setChatInput("");
                  }
                }}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Side tabs/info */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="bg-white flex border-b border-gray-200">
              {["history", "stats"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`bg-white text-gray-500 flex-1 px-4 py-3 text-sm font-medium capitalize focus:outline-none ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-4 max-h-64 overflow-y-auto">
              {activeTab === "history" && (
                <div className="space-y-3">
                  {[
                    { date: "Oct 24, 2025", type: "Theft", severity: "Medium" },
                    { date: "Oct 23, 2025", type: "Vandalism", severity: "Low" },
                    { date: "Oct 22, 2025", type: "Suspicious Activity", severity: "High" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.severity === "High"
                            ? "bg-red-100 text-red-800"
                            : item.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stats" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Reports</span>
                    <span className="text-lg font-bold text-gray-900">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last 7 Days</span>
                    <span className="text-lg font-bold text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Most Common</span>
                    <span className="text-sm font-medium text-gray-900">Theft</span>
                  </div>
                </div>
              )}

              {activeTab === "photos" && (
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <Info className="w-6 h-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}