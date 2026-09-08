import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  FileText, 
  Briefcase, 
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

  // Automatically ensure the current analysis is persisted
  React.useEffect(() => {
    if (analysis) {
      saveAnalysis(analysis);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="max-w-md mx-auto my-16 text-center card-minimal p-8 rounded-xl space-y-4">
        <div className="w-12 h-12 bg-zinc-100 text-zinc-700 rounded-lg flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-zinc-900">No Active Analysis Found</h2>
          <p className="text-zinc-500 text-xs">
            Please upload your resume and job description to generate your match report.
          </p>
        </div>
        <Link
          to="/analyze"
          className="inline-flex items-center justify-center px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-colors"
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
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-4">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium mb-1.5">
            Analysis Report
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            ATS Match Breakdown
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5">
            Generated on {analysis.date}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleSaveToHistory}
            className="px-3.5 py-2 rounded-lg font-medium text-xs transition-colors flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200"
            title="Analysis is automatically saved to history"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
            <span>{savedFeedback ? 'Saved to History!' : 'Saved in History'}</span>
          </button>

          <Link
            to="/history"
            className="px-3.5 py-2 bg-white hover:bg-zinc-50 text-zinc-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 border border-zinc-200"
          >
            <span>View All History</span>
          </Link>

          <button
            type="button"
            onClick={handleAnalyzeAnother}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-300" />
            <span>Analyze Another</span>
          </button>
        </div>
      </div>

      {/* Main Score Display Gauge */}
      <ScoreDisplay score={analysis.score} />

      {/* Breakdown Grid: Matched vs Missing Keywords */}
      {analysis.score !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matched Keywords Box */}
          <div className="card-minimal rounded-xl p-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-sm">Matched Keywords</h3>
                  <p className="text-zinc-500 text-xs">Present in both resume and job description</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {analysis.matchedKeywords.length}
              </span>
            </div>

            {analysis.matchedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysis.matchedKeywords.map((kw) => (
                  <KeywordBadge key={kw} keyword={kw} type="matched" />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-xs italic py-3">
                No matching keywords detected from predefined skill list.
              </p>
            )}
          </div>

          {/* Missing Keywords Box */}
          <div className="card-minimal rounded-xl p-6 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center">
                  <XCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-sm">Missing Keywords</h3>
                  <p className="text-zinc-500 text-xs">Required by job description, not found in resume</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                {analysis.missingKeywords.length}
              </span>
            </div>

            {analysis.missingKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysis.missingKeywords.map((kw) => (
                  <KeywordBadge key={kw} keyword={kw} type="missing" />
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero missing target keywords detected. Excellent!</span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Suggestions Section */}
      {analysis.missingKeywords.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-2xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Optimization Suggestions</h3>
              <p className="text-zinc-500 text-xs">
                Incorporate these missing skills naturally into your experience bullet points or summary:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {analysis.missingKeywords.map((kw) => (
              <div
                key={kw}
                className="bg-white border border-zinc-200 rounded-lg p-3 text-xs flex items-start gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold capitalize text-zinc-900">{kw}</span>
                  <p className="text-zinc-500 text-[11px] mt-0.5 leading-relaxed">
                    Add <code className="bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded font-mono">{kw}</code> to your skills or project description.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Text Content Preview Accordion */}
      <div className="card-minimal rounded-xl p-5 space-y-3">
        <h3 className="font-bold text-zinc-900 text-sm">Inspected Text</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Resume Accordion */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-1.5">
            <button
              onClick={() => setShowFullResume(!showFullResume)}
              className="w-full flex items-center justify-between text-zinc-800 font-semibold text-xs"
            >
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-600" />
                Resume ({analysis.fullResumeText.length} chars)
              </span>
              {showFullResume ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            
            {showFullResume ? (
              <pre className="text-[11px] bg-white p-3 rounded border border-zinc-200 text-zinc-700 whitespace-pre-wrap max-h-52 overflow-y-auto font-mono">
                {analysis.fullResumeText}
              </pre>
            ) : (
              <p className="text-xs text-zinc-500 line-clamp-2 italic">
                "{analysis.resumePreview}"
              </p>
            )}
          </div>

          {/* Job Description Accordion */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-1.5">
            <button
              onClick={() => setShowFullJD(!showFullJD)}
              className="w-full flex items-center justify-between text-zinc-800 font-semibold text-xs"
            >
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-600" />
                Job Description ({analysis.fullJDText.length} chars)
              </span>
              {showFullJD ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showFullJD ? (
              <pre className="text-[11px] bg-white p-3 rounded border border-zinc-200 text-zinc-700 whitespace-pre-wrap max-h-52 overflow-y-auto font-mono">
                {analysis.fullJDText}
              </pre>
            ) : (
              <p className="text-xs text-zinc-500 line-clamp-2 italic">
                "{analysis.fullJDText.slice(0, 120)}..."
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
