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
  Check,
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';
import type { Analysis } from '../types';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { KeywordBadge } from '../components/KeywordBadge';
import { saveAnalysis, getAllAnalyses } from '../utils/storage';

type FilterTab = 'all' | 'exact' | 'synonyms' | 'missing';

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
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

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

  // Organize detailed matches if available
  const detailedMatches = analysis.detailedMatches || [];
  const exactMatches = detailedMatches.filter(d => d.status === 'exact');
  const synonymMatches = detailedMatches.filter(d => d.status === 'synonym');
  const partialMatches = detailedMatches.filter(d => d.status === 'partial');
  const missingMatches = detailedMatches.filter(d => d.status === 'missing');

  // Segregate missing keywords by requirement importance
  const requiredMissing = missingMatches.filter(m => m.sourceSection === 'required');
  const preferredMissing = missingMatches.filter(m => m.sourceSection === 'preferred');
  const respMissing = missingMatches.filter(m => m.sourceSection === 'responsibilities');

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
            Generated on {analysis.date} • Real-World ATS Scoring (Taleo & Workday Algorithm)
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
      <ScoreDisplay 
        score={analysis.score} 
        tier={analysis.tier} 
        breakdown={analysis.breakdown} 
      />

      {/* Transparency Breakdown Tabs */}
      {analysis.score !== null && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 tracking-tight">
                Skill Overlap Transparency
              </h2>
              <p className="text-xs text-zinc-500">
                Detailed audit of detected skills, variations, and section placements in your resume.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg self-start sm:self-auto text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                All Skills ({detailedMatches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('exact')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'exact' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Exact ({exactMatches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('synonyms')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'synonyms' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Synonyms ({synonymMatches.length + partialMatches.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('missing')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'missing' 
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Missing ({missingMatches.length || analysis.missingKeywords.length})
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched / Found Section */}
            {(activeTab === 'all' || activeTab === 'exact' || activeTab === 'synonyms') && (
              <div className="card-minimal rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm">Matched Qualifications</h3>
                      <p className="text-zinc-500 text-xs">Exact terms and recognized synonyms found in your resume</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {activeTab === 'exact' 
                      ? exactMatches.length 
                      : activeTab === 'synonyms' 
                        ? synonymMatches.length + partialMatches.length 
                        : analysis.matchedKeywords.length + (analysis.partialKeywords?.length || 0)}
                  </span>
                </div>

                {/* Detailed items */}
                {detailedMatches.length > 0 ? (
                  <div className="space-y-3">
                    
                    {/* Exact matches */}
                    {(activeTab === 'all' || activeTab === 'exact') && exactMatches.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                          Exact String Matches ({exactMatches.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {exactMatches.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="exact"
                              sectionFound={m.resumeSection}
                              inExperience={m.inExperience}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Synonym matches */}
                    {(activeTab === 'all' || activeTab === 'synonyms') && synonymMatches.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 text-teal-600" />
                          Synonym & Semantic Matches ({synonymMatches.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {synonymMatches.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="synonym"
                              matchedWith={m.matchedWith}
                              sectionFound={m.resumeSection}
                              inExperience={m.inExperience}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Partial overlap matches */}
                    {(activeTab === 'all' || activeTab === 'synonyms') && partialMatches.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <Layers className="w-3 h-3 text-zinc-500" />
                          Partial Multi-word Matches ({partialMatches.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {partialMatches.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="partial"
                              matchedWith={m.matchedWith}
                              sectionFound={m.resumeSection}
                              inExperience={m.inExperience}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  /* Fallback to simple matched array for legacy history entries */
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matchedKeywords.map((kw) => (
                      <KeywordBadge key={kw} keyword={kw} type="matched" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Missing Keywords Box */}
            {(activeTab === 'all' || activeTab === 'missing') && (
              <div className="card-minimal rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm">Missing Keywords</h3>
                      <p className="text-zinc-500 text-xs">Required by posting but absent from your resume</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    {missingMatches.length || analysis.missingKeywords.length}
                  </span>
                </div>

                {/* Grouped Missing Keywords */}
                {missingMatches.length > 0 ? (
                  <div className="space-y-3">
                    
                    {/* Required missing (High Priority) */}
                    {requiredMissing.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          Required Qualifications ({requiredMissing.length}) — High Weight
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {requiredMissing.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="missing"
                              sourceSection={m.sourceSection}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Preferred missing (Medium Priority) */}
                    {preferredMissing.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Preferred Qualifications ({preferredMissing.length}) — Medium Weight
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {preferredMissing.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="missing"
                              sourceSection={m.sourceSection}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Responsibilities / Soft Skills missing */}
                    {respMissing.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          Responsibilities & Soft Skills ({respMissing.length})
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {respMissing.map((m) => (
                            <KeywordBadge
                              key={m.keyword}
                              keyword={m.keyword}
                              type="missing"
                              sourceSection={m.sourceSection}
                              category={m.category}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : analysis.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords.map((kw) => (
                      <KeywordBadge key={kw} keyword={kw} type="missing" />
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg flex items-center gap-2 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Zero missing target keywords detected. Excellent match!</span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Prioritized Optimization Suggestions */}
      {analysis.missingKeywords.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-2xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">ATS Optimization Suggestions</h3>
              <p className="text-zinc-500 text-xs">
                To increase your match score towards 85%+, naturally incorporate these missing competencies into your Experience bullets:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Show top 8 missing keywords */}
            {(missingMatches.length > 0 ? missingMatches.slice(0, 8) : analysis.missingKeywords.slice(0, 8).map(k => ({ keyword: k, sourceSection: 'required' }))).map((item) => (
              <div
                key={item.keyword}
                className="bg-white border border-zinc-200 rounded-lg p-3 text-xs flex items-start gap-2.5"
              >
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                  item.sourceSection === 'required' ? 'bg-rose-500' : item.sourceSection === 'preferred' ? 'bg-amber-500' : 'bg-zinc-400'
                }`} />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize text-zinc-900">{item.keyword}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {item.sourceSection === 'required' ? 'High Priority' : item.sourceSection === 'preferred' ? 'Medium Priority' : 'Suggested'}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">
                    Demonstrate <code className="bg-zinc-100 text-zinc-800 px-1 py-0.5 rounded font-mono font-medium">{item.keyword}</code> under a project or role bullet point.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Text Content Preview Accordion */}
      <div className="card-minimal rounded-xl p-5 space-y-3">
        <h3 className="font-bold text-zinc-900 text-sm">Inspected Text Documents</h3>
        
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
