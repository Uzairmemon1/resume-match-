import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Search, BarChart3, Cpu, ArrowRight, HelpCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold border border-indigo-500/30">
          <Target className="w-4 h-4 text-indigo-400" />
          Transparent ATS Matching Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How ResumeMatch Works
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          ResumeMatch replicates the scanning algorithms used by modern Applicant Tracking Systems (ATS) to score and filter job applications.
        </p>
      </div>

      {/* 100% Client-Side Privacy Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 p-6 sm:p-10 shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 flex-shrink-0">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-xs uppercase font-black tracking-widest text-indigo-400">
            Privacy First Architecture
          </span>
          <h3 className="text-xl font-extrabold text-white">
            100% Client-Side Local Execution
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            This tool operates entirely within your browser memory. Your resume text and job description details are <span className="text-white font-bold underline decoration-indigo-400 decoration-2">never sent to any external server</span> or stored in a remote database.
          </p>
        </div>
      </div>

      {/* 3 Simple Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white tracking-tight text-center sm:text-left">
          The 3-Step Matching Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-600/30">
              1
            </div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" />
              Keyword Extraction
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We analyze the job description against a dictionary of over 100+ technical, frameworks, data, soft, and management skills.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-purple-600/30">
              2
            </div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Overlap Comparison
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We evaluate your resume text to determine which skills you possess and which critical terms are missing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white font-black text-sm flex items-center justify-center shadow-lg shadow-pink-600/30">
              3
            </div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Scoring & Feedback
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We calculate your overall percentage match score <code className="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[11px]">(matched / total) * 100</code> and generate tailored recommendations.
            </p>
          </div>

        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="glass-card rounded-3xl border border-slate-800 p-8 space-y-6 shadow-xl">
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 divide-y divide-slate-800/80">
          
          <div className="pt-4 space-y-1">
            <h4 className="font-bold text-white text-sm">
              What is an ATS (Applicant Tracking System)?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              An ATS is automated HR software used by most top companies to collect, scan, sort, and rank job applicants based on skill keyword overlap.
            </p>
          </div>

          <div className="pt-4 space-y-1">
            <h4 className="font-bold text-white text-sm">
              How can I boost a low match score?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Check the "Missing Keywords" column in your report and integrate those specific technical & soft skills into your experience bullet points.
            </p>
          </div>

          <div className="pt-4 space-y-1">
            <h4 className="font-bold text-white text-sm">
              Where is my analysis history saved?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              All saved analyses are stored securely inside your browser's <code className="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[11px]">localStorage</code> under the key <code className="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[11px]">resumeMatchHistory</code>.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all text-base"
        >
          <span>Analyze Your Resume Now</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
};
