
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingDown, 
  Activity, 
  Clock,
  CheckCircle2,
  Play,
  Shield
} from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-sm">H</span>
          </div>
          <span className="text-xl font-bold tracking-tight">HRMS Lite</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <button type="button" onClick={() => alert('Feature coming soon!')} className="hover:text-white transition-colors">Features</button>
          <button type="button" onClick={() => alert('Demo video starting...')} className="hover:text-white transition-colors">Demo</button>
          <button type="button" onClick={() => alert('Exploring benefits...')} className="hover:text-white transition-colors">Benefits</button>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Go to App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8">
          <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
          <span>The Next-Gen Workforce Tool</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight mb-8">
          The Future of HR is <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Simple</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Streamline your employee management and attendance tracking with a clean, modern, and high-performance interface. No login required.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Employee Records
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Daily Attendance
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Admin Dashboard
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/30 text-sm text-zinc-300">
            <CheckCircle2 className="w-4 h-4 text-blue-500" /> Dark Mode UI
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
            Enter Dashboard <ArrowRight className="w-5 h-5" />
          </Link>
          <button type="button" onClick={() => alert('Feature coming soon!')} className="w-full sm:w-auto px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100 font-bold rounded-xl border border-zinc-800 transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" /> Watch Demo
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-20">
        <div className="text-center group">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20 transition-all group-hover:scale-110">
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold mb-1">3x</div>
          <div className="text-sm text-zinc-500">Faster Operations</div>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 transition-all group-hover:scale-110">
            <TrendingDown className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="text-3xl font-bold mb-1">80%</div>
          <div className="text-sm text-zinc-500">Workload Cut</div>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-emerald-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 transition-all group-hover:scale-110">
            <Clock className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold mb-1">Real-time</div>
          <div className="text-sm text-zinc-500">Live Syncing</div>
        </div>
        <div className="text-center group">
          <div className="w-12 h-12 bg-amber-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20 transition-all group-hover:scale-110">
            <Shield className="w-6 h-6 text-amber-500" />
          </div>
          <div className="text-3xl font-bold mb-1">99.9%</div>
          <div className="text-sm text-zinc-500">Data Security</div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
