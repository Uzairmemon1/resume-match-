import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Search, BarChart3, Cpu, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-semibold">
          <Target className="w-3.5 h-3.5" />
          <span>About ResumeMatch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          Demystifying the ATS Screening Process
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          We help job seekers understand exactly what recruiters and automated applicant tracking systems look for in top-tier candidates.
        </p>
      </div>

      {/* About the Problem & Mission Section */}
      <div className="card-minimal rounded-2xl p-8 border border-zinc-200 bg-zinc-50/60 space-y-4">
        <div className="flex items-center gap-2 text-[#2563EB]">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold text-zinc-900">
            The Problem We Solve
          </h2>
        </div>
        <div className="space-y-3 text-zinc-600 text-xs sm:text-sm leading-relaxed">
          <p>
            Modern hiring is heavily automated. When you submit a resume to a corporate job posting, it rarely lands in front of a hiring manager immediately. Instead, commercial Applicant Tracking Systems (ATS) like Workday, Taleo, Greenhouse, and Lever parse the text and score candidates based on strict keyword overlap, technical taxonomy, and section placements.
          </p>
          <p>
            Qualified applicants often face rejection simply because of minor vocabulary mismatches—such as writing "Project Coordination" instead of "Project Management" or listing key skills in a static summary instead of demonstrating them in practical experience bullet points.
          </p>
          <div className="p-4 rounded-xl bg-white border border-zinc-200 text-zinc-900 text-xs sm:text-sm">
            <strong className="text-[#2563EB]">Our Mission:</strong> We help job seekers understand exactly what recruiters and ATS systems are looking for. We provide transparent keyword audits, realistic scoring tiers, and actionable optimization feedback—all running privately inside your browser.
          </div>
        </div>
      </div>

      {/* 100% Client-Side Privacy Card */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
        <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-zinc-900">
            100% Client-Side Privacy Protection
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            Your personal resume information never leaves your device. All PDF/Word text parsing, keyword extraction, and score algorithms run strictly client-side via Web Workers and local JavaScript.
          </p>
        </div>
      </div>

      {/* 3 Simple Steps */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
          How Our Scoring Algorithm Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5 bg-white border border-zinc-200">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-zinc-600" />
              <span>Dynamic Extraction</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              We dynamically segment the job description into Required, Preferred, and Responsibilities keywords using NLP patterns.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5 bg-white border border-zinc-200">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-600" />
              <span>Fuzzy & Stem Matching</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Our stemmer and synonym dictionary recognize variations (e.g., <em>coordinating</em> ↔ <em>coordinate</em>, <em>MS Excel</em> ↔ <em>Excel</em>).
            </p>
          </div>

          {/* Step 3 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5 bg-white border border-zinc-200">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-zinc-600" />
              <span>Weighted ATS Tiering</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              We calculate weighted scores (Required 60%, Preferred 25%, Responsibilities 15%) and award bonus points for skills demonstrated in Experience bullets.
            </p>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="card-minimal rounded-xl p-6 sm:p-8 space-y-4 bg-white border border-zinc-200">
        <h2 className="text-base font-bold text-zinc-900 tracking-tight flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-zinc-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3 divide-y divide-zinc-100 text-xs">
          
          <div className="pt-3 space-y-1">
            <h4 className="font-semibold text-zinc-900 text-xs">
              What formats can I upload?
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              You can upload PDF documents (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.pdf</code>), Microsoft Word files (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.docx, .doc</code>), or plain text files (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.txt</code>).
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h4 className="font-semibold text-zinc-900 text-xs">
              How does the weighted scoring formula work?
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              Score = (Matched Required / Total Required) × 60% + (Matched Preferred / Total Preferred) × 25% + (Responsibilities / Soft Skills) × 15%. If a posting has no preferred qualifications, weights are adaptively normalized.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h4 className="font-semibold text-zinc-900 text-xs">
              Where is my analysis history saved?
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              All saved analyses are stored securely in your browser's <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800 font-mono">localStorage</code>. No server uploads or accounts are required.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-2">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-xs shadow-xs"
        >
          <span>Test Your Resume Compatibility</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
