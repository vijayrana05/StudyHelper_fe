import { useState, useEffect } from 'react';
import { Search, FileText, Zap, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const NotesLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()
  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Creation",
      description: "Generate comprehensive notes instantly with advanced AI that understands context and creates structured content tailored to your needs."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Context-Aware Search",
      description: "Go beyond keywords — use AI to ask natural questions and get accurate answers from your notes using vector embeddings."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Experience instant responses and seamless performance. Create, search, and organize notes without any delays or friction."
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + '%',
            top: mousePosition.y * 0.02 + '%',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"
          style={{
            right: mousePosition.x * 0.01 + '%',
            bottom: mousePosition.y * 0.01 + '%',
            transition: 'all 0.5s ease-out'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 px-6 py-4 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              NoteIQ
            </span>
          </div>



          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => {
                navigate('/signup')
              }}>
              Sign In
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => {
                navigate('/login')
              }}>
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>


            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-purple-700 to-pink-600 bg-clip-text text-transparent">
              Your Mind,
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amplified
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Effortlessly capture, summarize, and explore knowledge with AI - from PDFs to personalized notes and intelligent answers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg" onClick={() => {
                navigate('/signup')
              }}>
                <span>Start Creating Notes</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>


            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent">
              Intelligent Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Every feature designed to enhance your thinking and streamline your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <div className="text-purple-600 mb-4 group-hover:text-pink-600 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-700 transition-colors text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      {/* <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent">
                  See It In Action
                </h3>
                <p className="text-slate-600">Experience the power of AI-driven note-taking</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-6 backdrop-blur-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-purple-100 rounded-lg p-3 border border-purple-200">
                      <p className="text-sm text-purple-800">Generate notes about quantum computing applications</p>
                    </div>
                  </div>

                  <div className="ml-11 space-y-2">
                    <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                      <h4 className="font-semibold text-purple-700 mb-2">Quantum Computing Applications</h4>
                      <p className="text-sm text-slate-600">Quantum computing represents a paradigm shift in computational power, with applications spanning cryptography, drug discovery, and financial modeling...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent leading-tight pb-2">
              Ready to Transform Your Notes?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Discover how AI-powered notes can transform the way you capture and explore ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg" onClick={() => {
                navigate('/signup')
              }}>
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="px-10 py-4 border border-purple-300 rounded-xl text-lg font-semibold hover:bg-purple-50 transition-all duration-300 backdrop-blur-sm text-purple-700 shadow-sm">
          Schedule Demo
        </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="relative z-10 px-6 py-12 border-t border-purple-200 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                NotesAI
              </span>
            </div>

            <div className="flex space-x-6 text-slate-600">
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Support</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-purple-200 text-center text-slate-500">
            <p>&copy; 2025 NotesAI. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default NotesLandingPage;