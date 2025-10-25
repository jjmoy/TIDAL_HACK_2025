import React, { useState } from 'react';
import { MapPin, MessageSquare, Shield, Bell, Users, TrendingUp, ChevronRight, Menu, X, Search, Locate, Filter, Layers, Send, AlertTriangle, Info, Mail } from 'lucide-react';

const SafePathApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'user', text: 'Is it safe here?' },
    { type: 'bot', text: 'Area labeled Caution ⚠️ - 3 incidents reported in the last 7 days within 0.5 miles. View details on map.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('history');

  const Navigation = () => (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SafePath</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition">Home</button>
            <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition">About</button>
            <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-blue-600 transition">How It Works</button>
            <button 
              onClick={() => setCurrentPage('app')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Use the App
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">Home</button>
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">About</button>
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2">How It Works</button>
            <button 
              onClick={() => { setCurrentPage('app'); setMobileMenuOpen(false); }}
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Use the App
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Know Before You Go
              </h1>
              <p className="text-xl text-gray-600">
                Community-powered safety intelligence at your fingertips. Drop a pin, report incidents, and get instant safety insights powered by AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('app')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Use the App</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition">
                <div className="bg-white rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <MapPin className="w-12 h-12 text-blue-600" />
                    <MessageSquare className="w-12 h-12 text-purple-600" />
                  </div>
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Interactive Map Preview</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">"Is it safe here?"</p>
                    <p className="text-sm text-blue-600 mt-2">Area labeled Safe ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-12 flex items-center justify-center shadow-xl">
                <Shield className="w-32 h-32 text-white" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">About SafePath</h2>
              <p className="text-lg text-gray-600">
                SafePath is a community-driven platform that empowers people to make informed decisions about their safety. By crowdsourcing incident reports and leveraging AI, we provide real-time safety intelligence for any location.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to create safer communities through transparency, collaboration, and technology. Every report helps others stay informed and make better choices.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time community incident reporting',
                  'AI-powered safety assessments',
                  'Interactive maps with detailed insights',
                  'Privacy-focused and anonymous reporting'
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-1 mt-1">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How To Use Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to stay informed</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                step: '1',
                title: 'Drop a Pin',
                description: 'Select any location on the map to check safety information or report an incident in that area.'
              },
              {
                icon: Bell,
                step: '2',
                title: 'Report an Issue',
                description: 'Share what you witnessed with the community. Choose incident type, severity, and add relevant details.'
              },
              {
                icon: MessageSquare,
                step: '3',
                title: 'Ask the Bot',
                description: 'Get instant AI-powered safety assessments. Ask "Is it safe here?" and receive contextual risk information.'
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {idx < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-gray-300 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What the Bot Can Do</h2>
            <p className="text-xl text-gray-600">Intelligent features powered by AI</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Real-time Responses',
                description: 'Get instant safety assessments based on the latest community reports and historical data.'
              },
              {
                icon: MapPin,
                title: 'Location Context',
                description: 'Understand safety patterns in specific neighborhoods with detailed geographic analysis.'
              },
              {
                icon: Users,
                title: 'Community Insights',
                description: 'Benefit from collective knowledge as the community shares experiences and observations.'
              },
              {
                icon: Shield,
                title: 'Risk Assessment',
                description: 'Receive clear safety ratings with context: Safe, Caution, or High Risk labels with explanations.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">SafePath</span>
              </div>
              <p className="text-sm text-gray-400">
                Community-powered safety intelligence for everyone, everywhere.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@safepath.com" className="hover:text-blue-400 transition">
                  contact@safepath.com
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-500 text-center">
              <strong>Disclaimer:</strong> Community-reported data is provided for informational purposes only. SafePath does not verify all reports and is not responsible for accuracy or completeness. Always use your best judgment and contact local authorities for emergencies.
            </p>
            <p className="text-sm text-gray-500 text-center mt-4">
              © 2025 SafePath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  const AppPage = () => (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Column - Map & Controls */}
        <div className="flex-1 flex flex-col lg:w-[70%]">
          {/* Top Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Locate className="w-4 h-4" />
                <span className="hidden sm:inline">Locate Me</span>
              </button>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>0.5 miles</option>
                <option>1 mile</option>
                <option>2 miles</option>
                <option>5 miles</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Types</option>
                <option>Theft</option>
                <option>Assault</option>
                <option>Vandalism</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">Toggle View</span>
              </button>
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search location..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Map Area Placeholder</p>
                <p className="text-gray-400 text-sm mt-2">Interactive map will be displayed here</p>
              </div>
            </div>
            
            {/* Pin Icon Example */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <MapPin className="w-8 h-8 text-red-500 drop-shadow-lg animate-bounce" />
            </div>

            {/* Floating Report Button */}
            <button 
              onClick={() => setReportDrawerOpen(!reportDrawerOpen)}
              className="absolute bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center space-x-2 transform hover:scale-105"
            >
              <Bell className="w-5 h-5" />
              <span className="font-semibold">Report</span>
            </button>
          </div>

          {/* Report Drawer */}
          {reportDrawerOpen && (
            <div className="absolute bottom-0 left-0 right-0 lg:right-auto lg:w-[70%] bg-white rounded-t-2xl shadow-2xl p-6 transform transition-transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">New Report</h3>
                <button 
                  onClick={() => setReportDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select type...</option>
                    <option>Theft</option>
                    <option>Assault</option>
                    <option>Vandalism</option>
                    <option>Suspicious Activity</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    defaultValue="3"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea 
                    rows="4"
                    placeholder="Describe what happened..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex gap-3">
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
            </div>
          )}
        </div>

        {/* Right Column - Chat & Info Panel */}
        <div className="hidden lg:flex lg:w-[30%] flex-col bg-white border-l border-gray-200">
          {/* Location Summary Card */}
          <div className="p-6 border-b border-gray-200">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Downtown Area</h3>
              <p className="text-sm text-gray-500">37.7749° N, 122.4194° W</p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Caution
                </span>
                <span className="text-sm text-gray-600">12 reports (7 days)</span>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Prompts */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {['Is it safe here?', 'Recent incidents?', 'Safety tips'].map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setChatInput(prompt)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Row */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about safety..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatInput.trim()) {
                      setChatMessages([...chatMessages, { type: 'user', text: chatInput }]);
                      setChatInput('');
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    if (chatInput.trim()) {
                      setChatMessages([...chatMessages, { type: 'user', text: chatInput }]);
                      setChatInput('');
                    }
                  }}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              {['history', 'stats', 'photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="p-4 max-h-48 overflow-y-auto">
              {activeTab === 'history' && (
                <div className="space-y-3">
                  {[
                    { date: 'Oct 24, 2025', type: 'Theft', severity: 'Medium' },
                    { date: 'Oct 23, 2025', type: 'Vandalism', severity: 'Low' },
                    { date: 'Oct 22, 2025', type: 'Suspicious Activity', severity: 'High' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.severity === 'High' ? 'bg-red-100 text-red-800' :
                        item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'stats' && (
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
              
              {activeTab === 'photos' && (
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

  return (
    <div className="min-h-screen">
      <Navigation />
      {currentPage === 'home' ? <HomePage /> : <AppPage />}
    </div>
  );
};

export default SafePathApp;