import React, { useEffect, useRef, useState } from "react";
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

// Format a datetime-local value to SQLite "YYYY-MM-DD HH:MM:SS"
function toSQLiteDateTime(dtLocal) {
  if (!dtLocal) return "";
  // dtLocal like "2025-10-25T14:05"
  // ensure seconds
  const withSeconds = dtLocal.length === 16 ? `${dtLocal}:00` : dtLocal;
  return withSeconds.replace("T", " ");
}

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

  // --- Map state ---
  const mapRef = useRef(null);
  const [center, setCenter] = useState([37.7749, -122.4194]); // default: San Francisco
  const [zoom, setZoom] = useState(13);

  // A "draft" pin created by clicking the map (shows the popup form)
  const [draftPin, setDraftPin] = useState(null); // { lat, lng }
  // Saved reports (persist in memory for now)
  const [reports, setReports] = useState([]); // [{lat,lng,type,severity,datetime}]

  // Popup open control
  const popupRef = useRef(null);

  // Click on the map to drop a draft pin + open popup
  function ClickToPin() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setDraftPin({ lat, lng, type: "", severity: 3, datetime: "" });
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
        if (map) map.setView(latlng, 15, { animate: true });
        setDraftPin({ lat: latlng[0], lng: latlng[1], type: "", severity: 3, datetime: "" });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // When a draft pin is created, try to open its popup automatically
  useEffect(() => {
    if (popupRef.current) {
      try {
        popupRef.current.openOn(mapRef.current);
      } catch (_) {}
    }
  }, [draftPin]);

  // Handle popup form submit
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!draftPin) return;
    const sqliteDate = toSQLiteDateTime(draftPin.datetime);
    const newReport = {
      lat: draftPin.lat,
      lng: draftPin.lng,
      type: draftPin.type || "Other",
      severity: Number(draftPin.severity || 3),
      datetime: sqliteDate || toSQLiteDateTime(new Date().toISOString().slice(0,16)),
    };
    setReports((r) => [...r, newReport]);
    setDraftPin(null); // close popup by removing draft
    // Optionally: show a toast, write to API/DB, etc.
    console.log("Saved report:", newReport);
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

            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition focus:outline-none focus:ring-0">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Toggle View</span>
            </button>

            <div className="flex-1 min-w-[220px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
            className="h-[50vh] w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickToPin />

            {/* Existing saved reports */}
            {reports.map((r, idx) => (
              <Marker key={`r-${idx}`} position={[r.lat, r.lng]}>
                <Popup>
                  <div className="space-y-1 text-sm">
                    <div className="font-semibold">{r.type}</div>
                    <div>Severity: {r.severity}</div>
                    <div>{r.datetime}</div>
                    <div className="text-gray-500">
                      ({r.lat.toFixed(5)}, {r.lng.toFixed(5)})
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Draft pin with popup form */}
            {draftPin && (
              <Marker position={[draftPin.lat, draftPin.lng]}>
                <Popup ref={popupRef}>
                  <form onSubmit={handleSubmitReport} className="space-y-3 w-60">
                    <div className="text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Lat:</span> {draftPin.lat.toFixed(6)}
                      </div>
                      <div>
                        <span className="font-medium">Lng:</span> {draftPin.lng.toFixed(6)}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Type of Crime
                      </label>
                      <select
                        value={draftPin.type}
                        onChange={(e) => setDraftPin((p) => ({ ...p, type: e.target.value }))}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      >
                        <option value="">Select type…</option>
                        <option>Theft</option>
                        <option>Assault</option>
                        <option>Vandalism</option>
                        <option>Suspicious Activity</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Severity (1–5)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={draftPin.severity}
                        onChange={(e) =>
                          setDraftPin((p) => ({ ...p, severity: e.target.value }))
                        }
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Time of Incident
                      </label>
                      <input
                        type="datetime-local"
                        value={draftPin.datetime}
                        onChange={(e) =>
                          setDraftPin((p) => ({ ...p, datetime: e.target.value }))
                        }
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        required
                      />
                      <p className="mt-1 text-[10px] text-gray-500">
                        Will save as SQLite: {toSQLiteDateTime(draftPin.datetime) || "—"}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                        onClick={() => setDraftPin(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {/* Floating Report Button (kept from your UI) */}
          <button
            onClick={() => setReportDrawerOpen((v) => !v)}
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center space-x-2 hover:scale-105 focus:outline-none focus:ring-0"
          >
            <Bell className="w-5 h-5" />
            <span className="font-semibold">Report</span>
          </button>
        </div>

        {/* (Your existing drawer / summary / chat UI stays unchanged below) */}
        {/* Report Drawer */}
        {reportDrawerOpen && (
          <div className="mt-4 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">New Report</h3>
              <button
                onClick={() => setReportDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition focus:outline-none focus:ring-0"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Select type...</option>
                  <option>Theft</option>
                  <option>Assault</option>
                  <option>Vandalism</option>
                  <option>Suspicious Activity</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <input type="range" min="1" max="5" defaultValue="3" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what happened..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold focus:outline-none focus:ring-0">
                Submit Report
              </button>
              <button
                onClick={() => setReportDrawerOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold focus:outline-none focus:ring-0"
              >
                Cancel
              </button>
            </div>
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
            <div className="flex border-b border-gray-200">
              {["history", "stats", "photos"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium capitalize focus:outline-none ${
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
        {/* /Chat & Side tabs */}
      </div>
    </div>
  );
}
