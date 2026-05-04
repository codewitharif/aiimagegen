import Link from 'next/link';
import { Wand2, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Wand2 size={32} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">
            CreativeAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Studio</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
            Revolutionize your social media presence with AI-powered visuals and automated campaign management.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/register" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl font-bold text-lg shadow-sm transition-all active:scale-95"
          >
            Create Account
          </Link>
        </div>

        <div className="pt-12">
          <Link href="/dashboard" className="text-slate-400 hover:text-indigo-600 text-sm font-semibold transition-colors">
            Access Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
