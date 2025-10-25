import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  MapPin,
  Locate,
  Search,
  Filter,
  Layers,
  Send,
  X,
  AlertCircle,
  Calendar,
  TrendingUp,
  Image as ImageIcon,
  Home,
  Plus,
} from "lucide-react";

interface MapPageProps {
  onNavigateHome: () => void;
}

export function MapPage({ onNavigateHome }: MapPageProps) {
  const [reportOpen, setReportOpen] = useState(false);
  const [severity, setSeverity] = useState([3]);
  const [reportType, setReportType] = useState("");
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, type: "user" as const, text: "Is it safe here?" },
    {
      id: 2,
      type: "bot" as const,
      text: "Based on recent reports, this area is labeled ⚠️ Caution. There have been 3 incidents reported in the past week within a 0.5 mile radius. Most reports involve property theft. View details on map →",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    setMessages([
      ...messages,
      { id: messages.length + 1, type: "user", text: inputText },
    ]);
    setInputText("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: "I'm analyzing the safety data for this location. Please wait...",
        },
      ]);
    }, 500);
  };

  const handleSubmitReport = () => {
    // Handle report submission
    setReportOpen(false);
    setReportType("");
    setNotes("");
    setSeverity([3]);
  };

  const suggestedPrompts = [
    "Is it safe at night?",
    "Show me recent incidents",
    "What's the crime trend?",
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl text-gray-900">SafePath</h1>
            <p className="text-sm text-gray-500">Community Safety Intelligence</p>
          </div>
        </div>
        <Button variant="ghost" onClick={onNavigateHome}>
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Map & Controls */}
        <div className="flex-1 lg:w-[65%] flex flex-col border-r border-gray-200 bg-white">
          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-3 flex-wrap">
            <Button variant="outline" size="sm">
              <Locate className="w-4 h-4 mr-2" />
              Locate Me
            </Button>
            <Select defaultValue="0.5">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.25">0.25 mi</SelectItem>
                <SelectItem value="0.5">0.5 mi</SelectItem>
                <SelectItem value="1">1 mi</SelectItem>
                <SelectItem value="2">2 mi</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Toggle View
            </Button>
            <div className="flex-1 min-w-[200px] max-w-sm">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search location..."
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative bg-gray-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Interactive Map Area</h3>
                <p className="text-gray-500">Map integration will be displayed here</p>
              </div>
            </div>

            {/* Pin Marker Example */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-500"></div>
              </div>
            </div>

            {/* Floating Report Button */}
            <Button
              className="absolute bottom-6 right-6 h-14 px-6 bg-blue-600 hover:bg-blue-700 shadow-lg"
              onClick={() => setReportOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Report Incident
            </Button>

            {/* Floating Report Drawer */}
            {reportOpen && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end p-4 lg:p-6">
                <Card className="w-full max-w-md bg-white shadow-2xl max-h-[90vh] overflow-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl text-gray-900">New Report</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReportOpen(false)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                          Incident Type
                        </label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="theft">Theft</SelectItem>
                            <SelectItem value="assault">Assault</SelectItem>
                            <SelectItem value="vandalism">Vandalism</SelectItem>
                            <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                          Severity Level: {severity[0]}
                        </label>
                        <Slider
                          value={severity}
                          onValueChange={setSeverity}
                          min={1}
                          max={5}
                          step={1}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Low</span>
                          <span>High</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                          Additional Notes
                        </label>
                        <Textarea
                          placeholder="Describe what happened..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={handleSubmitReport}
                        >
                          Submit Report
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setReportOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat & Info Panel */}
        <div className="w-full lg:w-[35%] flex flex-col bg-white">
          {/* Location Summary Card */}
          <div className="p-4 border-b border-gray-200">
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">Downtown District</h3>
                  <p className="text-sm text-gray-500">37.7749° N, 122.4194° W</p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  ⚠️ Caution
                </Badge>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Risk Score:</span>
                  <span className="ml-2 text-gray-900">6.5/10</span>
                </div>
                <div>
                  <span className="text-gray-500">Reports:</span>
                  <span className="ml-2 text-gray-900">12 this week</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-gray-900">Safety Assistant</h3>
              <p className="text-sm text-gray-500">Ask about safety in this area</p>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex gap-2 flex-wrap">
                {suggestedPrompts.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full"
                    onClick={() => setInputText(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Row */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about this location..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              <TabsContent value="history" className="p-4 max-h-64 overflow-auto">
                <div className="space-y-3">
                  {[
                    { date: "Oct 24, 2025", type: "Theft", severity: "Medium" },
                    { date: "Oct 23, 2025", type: "Vandalism", severity: "Low" },
                    { date: "Oct 21, 2025", type: "Suspicious Activity", severity: "Medium" },
                    { date: "Oct 20, 2025", type: "Assault", severity: "High" },
                  ].map((incident, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">{incident.type}</p>
                          <p className="text-xs text-gray-500">{incident.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          incident.severity === "High"
                            ? "bg-red-100 text-red-800"
                            : incident.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="stats" className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Incident Trend</p>
                      <p className="text-xs text-gray-500">↑ 15% from last month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Most Common</p>
                      <p className="text-xs text-gray-500">Theft (45% of reports)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      Safety score has decreased by 1.2 points in the past 30 days
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="photos" className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200"
                    >
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  No photos available for this location
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
