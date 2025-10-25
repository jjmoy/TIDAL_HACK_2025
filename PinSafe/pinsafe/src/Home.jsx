import React from "react";
import {
  MapPin,
  MessageSquare,
  Shield,
  Bell,
  Users,
  TrendingUp,
  ChevronRight,
  Mail,
} from "lucide-react";

export default function Home({ onUseApp }) {
  return (
    // clip any horizontal overflow coming from transforms/absolutes
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-50 to-white overflow-x-clip pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
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
                  onClick={onUseApp}
                  className="bg-blue-600 hover:text-blue-300 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Use the App</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-blue-600 text-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-200 hover:text-blue-300 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Rotated mockup with proper overflow clipping */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition will-change-transform transform-gpu">
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

      {/* About */}
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
                  "Real-time community incident reporting",
                  "AI-powered safety assessments",
                  "Interactive maps with detailed insights",
                  "Privacy-focused and anonymous reporting",
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

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to stay informed</p>
          </div>

          {/* clip this whole grid so the arrows can’t widen the page */}
          <div className="relative overflow-x-clip">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  step: "1",
                  title: "Drop a Pin",
                  description:
                    "Select any location on the map to check safety information or report an incident in that area.",
                },
                {
                  icon: Bell,
                  step: "2",
                  title: "Report an Issue",
                  description:
                    "Share what you witnessed with the community. Choose incident type, severity, and add relevant details.",
                },
                {
                  icon: MessageSquare,
                  step: "3",
                  title: "Ask the Bot",
                  description:
                    'Get instant AI-powered safety assessments. Ask "Is it safe here?" and receive contextual risk information.',
                },
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

                  {/* was: hidden md:block absolute top-1/2 -right-4 ...  (caused overflow) */}
                  {idx < 2 && (
                    <ChevronRight
                      className="hidden md:block absolute top-1/2 right-2 w-8 h-8 text-gray-300 -translate-y-1/2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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
                title: "Real-time Responses",
                description:
                  "Get instant safety assessments based on the latest community reports and historical data.",
              },
              {
                icon: MapPin,
                title: "Location Context",
                description:
                  "Understand safety patterns in specific neighborhoods with detailed geographic analysis.",
              },
              {
                icon: Users,
                title: "Community Insights",
                description:
                  "Benefit from collective knowledge as the community shares experiences and observations.",
              },
              {
                icon: Shield,
                title: "Risk Assessment",
                description:
                  "Receive clear safety ratings with context: Safe, Caution, or High Risk labels with explanations.",
              },
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
            <p className="text-sm text-gray-500 text-center mt-4">© 2025 SafePath. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
