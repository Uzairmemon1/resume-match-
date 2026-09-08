import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Lightbulb, ShieldCheck, Sparkles, CheckCircle2, FileSearch, Activity } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 sm:p-14 lg:p-16 text-center mt-4 shadow-2xl backdrop-blur-xl">
        
        {/* Animated Glow Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 glow-blob-1 animate-pulse-glow pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 glow-blob-2 animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 glow-blob-3 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-8 z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>100% Client-Side Engine — Zero Server Uploads</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white">
            Does your resume pass the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent underline decoration-indigo-500/40 decoration-wavy decoration-2">
              ATS test?
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Instantly match your resume against any job description. Uncover missing keywords, boost your compatibility score, and land more interviews.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/analyze"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center gap-2.5 text-base group"
            >
              <Zap className="w-5 h-5 fill-white/20" />
              <span>Analyze My Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/about"
              className="w-full sm:w-auto px-7 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl border border-slate-700/80 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 text-base"
            >
              How Engine Works
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400 font-medium border-t border-slate-800/80 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Sign-up Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Local Browser Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100+ Skill Categories</span>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
            Powered by Keyword Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Job Seekers Choose ResumeMatch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Over 75% of resumes are filtered out by ATS bots. Our algorithm gives you the exact blueprint to pass automated screening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Instant Score</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Get a real-time, color-coded ATS compatibility percentage score calculated instantly inside your browser memory.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <span>0–100% Precision gauge</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Keyword Analysis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Side-by-side breakdown showing matched skills you already possess vs crucial missing keywords specified in the job posting.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <span>Matched vs Missing badges</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">Improvement Tips</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Actionable tailoring suggestions guiding you exactly where and how to integrate missing technical & soft skills into your resume.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800 text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <span>Tailored actionable advice</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Confidential & Private
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to test your resume in seconds?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Paste your resume and job description. Get your score report immediately.
            </p>
          </div>
          <Link
            to="/analyze"
            className="relative z-10 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/40 transition-all flex items-center gap-2.5 text-base flex-shrink-0"
          >
            <FileSearch className="w-5 h-5" />
            Start Free Analysis
          </Link>
        </div>
      </section>

    </div>
  );
};
