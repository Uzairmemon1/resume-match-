import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Search, BarChart3, Cpu, ArrowRight, HelpCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-4">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
          <Target className="w-3.5 h-3.5 text-zinc-600" />
          <span>ATS Matching Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          How ResumeMatch Works
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          ResumeMatch scans resumes using the same keyword extraction principles that commercial Applicant Tracking Systems employ.
        </p>
      </div>

      {/* 100% Client-Side Privacy Card */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-12 h-12 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 flex-shrink-0 shadow-2xs">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-zinc-900">
            100% Client-Side Local Execution
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            All text extraction and keyword matching happen locally in your web browser. Your resume files and job descriptions are never transmitted to any external server or saved in a remote database.
          </p>
        </div>
      </div>

      {/* 3 Simple Steps */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
          The 3-Step Matching Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-zinc-600" />
              <span>Keyword Extraction</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              We extract skills from the target job posting against a library of over 100+ technical, analytics, and business skills.
            </p>
          </div>

          {/* Step 2 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-600" />
              <span>Overlap Comparison</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              We parse your uploaded resume text and determine which required skills are present and which are missing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="card-minimal p-5 rounded-xl space-y-2.5">
            <div className="w-7 h-7 rounded-md bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-zinc-600" />
              <span>Scoring & Feedback</span>
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              We calculate your overall percentage match score and provide tailored suggestions on how to improve your resume.
            </p>
          </div>

        </div>
      </div>

      {/* FAQ Section */}
      <div className="card-minimal rounded-xl p-6 sm:p-8 space-y-4">
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
              You can upload PDF files (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.pdf</code>), Word documents (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.docx, .doc</code>), or plain text files (<code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800">.txt</code>).
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h4 className="font-semibold text-zinc-900 text-xs">
              How is the ATS score calculated?
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              The score represents the percentage of required job keywords found in your resume: <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800 font-mono">(matched / total) * 100</code>.
            </p>
          </div>

          <div className="pt-3 space-y-1">
            <h4 className="font-semibold text-zinc-900 text-xs">
              Where is my history saved?
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              All saved analyses are stored securely inside your browser's <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800 font-mono">localStorage</code> under the key <code className="bg-zinc-100 px-1 py-0.5 rounded text-zinc-800 font-mono">resumeMatchHistory</code>.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-2">
        <Link
          to="/analyze"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-lg transition-colors text-xs shadow-xs"
        >
          <span>Test Your Resume Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
