import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '@shared/types/user';
import { Layout, Search, UserCheck, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (user?.role === UserRole.STUDENT) {
      navigate('/student/dashboard');
    } else if (user?.role === UserRole.RECRUITER) {
      navigate('/recruiter/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]"> {/* Eggshell White Background */}
      {/* Navigation */}
      <nav className="relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#0F172A]">
                NextTern
              </span>
            </div>
            <div className="flex items-center space-x-6">
              {isAuthenticated ? (
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172A]"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[#0F172A] font-medium hover:text-[#334155] transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full text-white bg-[#0F172A] hover:bg-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F172A]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0F172A] mb-8 leading-tight">
              Review humans, <br/>
              <span className="text-[#334155]">not resumes.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-[#475569] leading-relaxed">
              Experience a hiring process designed for clarity. We replaced the black hole with a transparent, intent-driven marketplace where every interaction counts.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-[#0F172A] text-white rounded-full font-semibold text-lg hover:bg-[#1E293B] transition-all transform hover:scale-105 shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
              >
                Find Internships <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0F172A] border-2 border-[#E2E8F0] rounded-full font-semibold text-lg hover:border-[#CBD5E1] hover:bg-gray-50 transition-all"
              >
                Find Talent
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-slate-200/50 blur-3xl"></div>
        </div>
      </div>

      {/* Value Props Section */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#0F172A] text-3xl font-bold sm:text-4xl">
              Anxiety is a UX Bug
            </h2>
            <p className="mt-4 text-lg text-[#64748B]">
              We redesigned the entire hiring workflow to respect your time and attention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: Layout,
                title: "Structured Identity",
                desc: "No more repetitive forms. Build your profile card once and use it everywhere."
              },
              {
                icon: CheckCircle,
                title: "Proof Over Claims",
                desc: "Showcase real projects and outcomes instead of keyword-stuffing your resume."
              },
              {
                icon: Search,
                title: "Intent Matching",
                desc: "High-signal connections only. Swipe mechanism ensures mutual interest before chatting."
              },
              {
                icon: Clock,
                title: "Radical Transparency",
                desc: "Real-time status updates. Know exactly where you stand with every application."
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-[#FDFBF7] border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
             <span className="text-xl font-bold opacity-90">NextTern</span>
             <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} NextTern. Discovery beats paperwork.
             </div>
        </div>
      </footer>
    </div>
  );
}