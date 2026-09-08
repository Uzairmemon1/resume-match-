import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  FileText, 
  Briefcase, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Check
} from 'lucide-react';
import type { Analysis } from '../types';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { KeywordBadge } from '../components/KeywordBadge';
import { saveAnalysis, getAllAnalyses } from '../utils/storage';

export const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read analysis from location state or fallback to the latest analysis in history
  const locationAnalysis = location.state?.analysis as Analysis | undefined;
  const [analysis] = useState<Analysis | null>(() => {
    if (locationAnalysis) return locationAnalysis;
    const all = getAllAnalyses();
    return all.length > 0 ? all[0] : null;
  });

  const [savedFeedback, setSavedFeedback] = useState(false);
  const [showFullResume, setShowFullResume] = useState(false);
  const [showFullJD, setShowFullJD] = useState(false);

  // When analysis is present, ensure it is persisted in storage
  React.useEffect(() => {
    if (analysis) {
      saveAnalysis(analysis);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="max-w-xl mx-auto my-16 text-center glass-card p-10 rounded-3xl space-y-6 border border-slate-800 shadow-2xl">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">No Active Analysis Found</h2>
          <p className="text-slate-400 text-sm">
            Please paste your resume and job description on the Analyze page to view your score breakdown.
          </p>
        </div>
        <Link
          to="/analyze"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all"
        >
          Go to Analyze Page
        </Link>
      </div>
    );
  }

  const handleSaveToHistory = () => {
    if (analysis) {
      saveAnalysis(analysis);
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2000);
    }
  };

  const handleAnalyzeAnother = () => {
    navigate('/analyze');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 pt-4">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Analysis Report
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            ATS Compatibility Breakdown
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Generated on {analysis.date}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSaveToHistory}
            className="px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60"
            title="Analysis is automatically saved to history"
          >
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>{savedFeedback ? 'Saved to History!' : 'Saved in History'}</span>
          </button>

          <Link
            to="/history"
            className="px-4 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-indigo-500/30 shadow-sm"
          >
            <span>View All History</span>
          </Link>

          <button
            type="button"
            onClick={handleAnalyzeAnother}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-slate-800"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Main Score Display Gauge */}
      <ScoreDisplay score={analysis.score} />

      {/* Breakdown Grid: Matched vs Missing Keywords */}
      {analysis.score !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Matched Keywords Box */}
          <div className="glass-card rounded-3xl border-emerald-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Matched Keywords</h3>
                  <p className="text-slate-400 text-xs">Present in both resume and job description</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                {analysis.matchedKeywords.length} Found
              </span>
            </div>

            {analysis.matchedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {analysis.matchedKeywords.map((kw) => (
                  <KeywordBadge key={kw} keyword={kw} type="matched" />
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic py-4">
                No matching target keywords detected from the skill dictionary.
              </p>
            )}
          </div>

          {/* Missing Keywords Box */}
          <div className="glass-card rounded-3xl border-rose-500/30 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Missing Keywords</h3>
                  <p className="text-slate-400 text-xs">Required by job posting, missing in resume</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-300 border border-rose-500/30">
                {analysis.missingKeywords.length} Missing
              </span>
            </div>

            {analysis.missingKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {analysis.missingKeywords.map((kw) => (
                  <KeywordBadge key={kw} keyword={kw} type="missing" />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-emerald-950/60 text-emerald-300 text-sm font-semibold rounded-2xl flex items-center gap-2 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Outstanding! Zero missing target keywords detected.</span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Suggestions Section */}
      {analysis.missingKeywords.length > 0 && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Optimization Suggestions</h3>
              <p className="text-indigo-200/90 text-sm">
                Add these specific missing keywords into your experience bullet points to boost your ATS score.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {analysis.missingKeywords.map((kw) => (
              <div
                key={kw}
                className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm flex items-start gap-3 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                <div>
                  <span className="font-extrabold capitalize text-white">{kw}</span>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Incorporate <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[11px]">{kw}</code> into your work experience or skills section.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Text Inspection Accordion */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
        <h3 className="font-bold text-white text-base">Inspected Content Text</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Resume Accordion */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <button
              onClick={() => setShowFullResume(!showFullResume)}
              className="w-full flex items-center justify-between text-slate-200 font-bold text-sm"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Resume Text ({analysis.fullResumeText.length} chars)
              </span>
              {showFullResume ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showFullResume ? (
              <pre className="text-xs bg-slate-950 p-3.5 rounded-xl text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto border border-slate-800 font-mono">
                {analysis.fullResumeText}
              </pre>
            ) : (
              <p className="text-xs text-slate-400 line-clamp-2 italic">
                "{analysis.resumePreview}"
              </p>
            )}
          </div>

          {/* Job Description Accordion */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
            <button
              onClick={() => setShowFullJD(!showFullJD)}
              className="w-full flex items-center justify-between text-slate-200 font-bold text-sm"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                Job Description ({analysis.fullJDText.length} chars)
              </span>
              {showFullJD ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFullJD ? (
              <pre className="text-xs bg-slate-950 p-3.5 rounded-xl text-slate-300 whitespace-pre-wrap max-h-60 overflow-y-auto border border-slate-800 font-mono">
                {analysis.fullJDText}
              </pre>
            ) : (
              <p className="text-xs text-slate-400 line-clamp-2 italic">
                "{analysis.fullJDText.slice(0, 120)}..."
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
