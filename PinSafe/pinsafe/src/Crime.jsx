import React, { useState } from "react";
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

  return (
    <div className="min-h-screen w-screen bg-gray-50 pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
            <button className="bg-blue-600 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-700 transition">
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
        <div className="mt-6 relative bg-gray-200 rounded-xl h-[50vh] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Map Area Placeholder</p>
              <p className="text-gray-400 text-sm mt-2">Interactive map will be displayed here</p>
            </div>
          </div>

          {/* Demo pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg animate-bounce" />
          </div>

          {/* Floating Report Button */}
          <button
            onClick={() => setReportDrawerOpen((v) => !v)}
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center space-x-2 hover:scale-105"
          >
            <Bell className="w-5 h-5" />
            <span className="font-semibold">Report</span>
          </button>
        </div>

        {/* Report Drawer */}
        {reportDrawerOpen && (
          <div className="mt-4 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">New Report</h3>
              <button
                onClick={() => setReportDrawerOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
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
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Submit Report
              </button>
              <button
                onClick={() => setReportDrawerOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
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
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
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
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
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
                  className={`flex-1 px-4 py-3 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? "bg-white text-blue-600 border-b-2 border-blue-600"
                      : "bg-white text-gray-500 hover:text-gray-700"
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
