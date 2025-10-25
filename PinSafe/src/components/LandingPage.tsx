import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  MapPin, 
  MessageSquare, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onNavigateToApp: () => void;
}

export function LandingPage({ onNavigateToApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full backdrop-blur-sm border border-white/20">
                <span className="text-sm">Community-Powered Safety Intelligence</span>
              </div>
              <h1 className="text-5xl md:text-6xl">
                Stay Safe with <span className="text-blue-200">SafePath</span>
              </h1>
              <p className="text-xl text-blue-100">
                Report incidents, check safety ratings, and make informed decisions about your surroundings with real-time community data and AI-powered insights.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={onNavigateToApp}
                  className="bg-white text-blue-700 hover:bg-blue-50"
                >
                  Use the App
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1638447841552-8194177a5536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBuYXZpZ2F0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjE0MDc4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Map technology interface"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760883344496-8b338d8070c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwc2FmZXR5fGVufDF8fHx8MTc2MTQwNzg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Community safety concept"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Right Column - Text */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                <span className="text-sm">About SafePath</span>
              </div>
              <h2 className="text-4xl text-gray-900">
                Empowering Communities Through Shared Knowledge
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SafePath is a community-driven safety platform that helps people make informed decisions about their surroundings. By combining real-time incident reports with AI-powered analysis, we provide instant safety assessments for any location.
                </p>
                <p>
                  Our intelligent chatbot analyzes recent incidents, historical data, and community reports to give you a clear picture of safety conditions in your area. Whether you're planning a route, exploring a new neighborhood, or just want peace of mind, SafePath is here to help.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Real-time incident reporting from community members</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">AI-powered safety analysis and risk assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Interactive map with pinpoint location accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Privacy-focused design protecting your data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
              <span className="text-sm">How It Works</span>
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">
              Three Simple Steps to Stay Safe
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              SafePath makes it easy to check safety conditions and contribute to your community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <Card className="p-8 text-center border-2 hover:border-blue-300 transition-colors relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                1
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-2">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Drop a Pin</h3>
              <p className="text-gray-600">
                Click anywhere on the interactive map to select a location you want to check or report an incident at.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 text-center border-2 hover:border-blue-300 transition-colors relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                2
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-2">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Report an Issue</h3>
              <p className="text-gray-600">
                Share incidents you've witnessed with severity levels and details to help others stay informed.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 text-center border-2 hover:border-blue-300 transition-colors relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                3
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-2">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl mb-4 text-gray-900">Ask the Bot</h3>
              <p className="text-gray-600">
                Get instant AI-powered safety assessments by asking "Is it safe here?" and receive detailed insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
              <span className="text-sm">Powerful Features</span>
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">
              What SafePath Can Do For You
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Real-time Responses</h3>
              <p className="text-gray-600">
                Get instant safety assessments based on the latest community reports and incident data.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Risk Analysis</h3>
              <p className="text-gray-600">
                Advanced AI analyzes patterns and trends to provide accurate risk labels for any location.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Community-Driven</h3>
              <p className="text-gray-600">
                Powered by real people sharing real experiences to keep everyone safer together.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 border-2 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">Historical Insights</h3>
              <p className="text-gray-600">
                Access historical data and trends to understand long-term safety patterns in any area.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-xl mb-4">SafePath</h3>
              <p className="text-sm">
                Community-powered safety intelligence for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <p className="text-sm">
                <a href="mailto:contact@safepath.com" className="hover:text-white transition-colors">
                  contact@safepath.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              <span className="text-yellow-400">⚠️ Disclaimer:</span> Community-reported data is provided for informational purposes only. 
              SafePath does not verify all reports and should not be your sole source for safety decisions. 
              Always use your best judgment and follow local authorities' guidance.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              © 2025 SafePath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
