import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, CheckCircle2, ShieldCheck, Target, Lightbulb, Activity, ArrowUpRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 pt-6">
      
      {/* Clean Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-8 pb-10 px-4">
        
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>100% Client-Side • Your Data Never Leaves Your Device</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.15]">
          Does your resume pass the ATS test?
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Upload your resume in PDF or Word format and compare it against any job description. Uncover missing keywords and optimize your application in seconds.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/analyze"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <Link
            to="/about"
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span>How it works</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-zinc-700" />
            <span>PDF & Word Upload</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-zinc-700" />
            <span>No Account Needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-zinc-700" />
            <span>Private & Offline-Ready</span>
          </div>
        </div>

      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Designed for Clarity & Accuracy
          </h2>
          <p className="text-zinc-600 text-sm">
            Get straightforward feedback so you can tailor your resume for recruitment screeners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="card-minimal card-minimal-hover p-6 rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-zinc-900">Instant Score</h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Receive an accurate match percentage (0–100%) showing how closely your resume aligns with job requirements.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card-minimal card-minimal-hover p-6 rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-zinc-900">Keyword Analysis</h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                See a clear breakdown of matched skills you already have versus crucial missing keywords found in the job description.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card-minimal card-minimal-hover p-6 rounded-xl space-y-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-zinc-900">Improvement Tips</h3>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Get specific recommendations detailing which skills and tools to integrate into your experience bullet points.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* Clean Callout Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Private & Client-Side Only</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Ready to scan your resume?
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-md">
              Upload your resume in PDF or Word format and get your compatibility score right away.
            </p>
          </div>

          <Link
            to="/analyze"
            className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm transition-colors flex items-center gap-2 flex-shrink-0 shadow-xs"
          >
            <FileCheck className="w-4 h-4" />
            <span>Start Analysis</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
