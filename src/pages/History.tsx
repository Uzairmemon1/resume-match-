import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { History as HistoryIcon, Trash2, Eye, Calendar, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import type { Analysis } from '../types';
import { getAllAnalyses, deleteAnalysis, clearAllAnalyses } from '../utils/storage';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const refreshHistory = () => {
      setAnalyses(getAllAnalyses());
    };

    refreshHistory();

    window.addEventListener('resumeMatchHistoryUpdated', refreshHistory);
    window.addEventListener('storage', refreshHistory);
    window.addEventListener('focus', refreshHistory);

    return () => {
      window.removeEventListener('resumeMatchHistoryUpdated', refreshHistory);
      window.removeEventListener('storage', refreshHistory);
      window.removeEventListener('focus', refreshHistory);
    };
  }, []);

  const handleDeleteOne = (id: string) => {
    deleteAnalysis(id);
    setAnalyses(getAllAnalyses());
  };

  const handleClearAll = () => {
    clearAllAnalyses();
    setAnalyses([]);
    setShowClearConfirm(false);
  };

  const handleViewDetails = (item: Analysis) => {
    navigate('/results', { state: { analysis: item } });
  };

  const getScoreBadge = (score: number | null) => {
    if (score === null) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
          No Skills
        </span>
      );
    }
    if (score >= 71) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {score}% Match
        </span>
      );
    }
    if (score >= 41) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          {score}% Match
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        {score}% Match
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 pt-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-zinc-700" />
            <span>Analysis History</span>
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
            Review past resume match reports saved locally on this browser.
          </p>
        </div>

        {analyses.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-700 font-medium text-xs rounded-lg border border-zinc-200 hover:border-rose-200 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg border border-zinc-200 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900">Clear all saved reports?</h3>
              <p className="text-zinc-600 text-xs">
                This will delete all stored reports from your local storage. This cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-lg shadow-2xs"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {analyses.length === 0 ? (
        <div className="card-minimal rounded-xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 bg-zinc-100 text-zinc-600 rounded-lg flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-900">No Saved Analyses Yet</h3>
            <p className="text-zinc-500 text-xs">
              Upload your resume and analyze it against a job description to see your first report here.
            </p>
          </div>
          <Link
            to="/analyze"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <span>Scan Your Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* History Items List */
        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 bg-zinc-50 rounded-lg text-xs font-semibold text-zinc-500 uppercase tracking-wider border border-zinc-200">
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-4">Resume Snippet</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="space-y-2.5">
            {analyses.map((item) => (
              <div
                key={item.id}
                className="card-minimal rounded-xl p-4 sm:px-4 sm:py-3.5 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3 hover:border-zinc-300 transition-colors"
              >
                {/* Date */}
                <div className="sm:col-span-3 flex items-center gap-2 text-xs text-zinc-600 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  <span>{item.date}</span>
                </div>

                {/* Score */}
                <div className="sm:col-span-2 sm:text-center">
                  {getScoreBadge(item.score)}
                </div>

                {/* Preview */}
                <div className="sm:col-span-4 space-y-1">
                  <div className="text-xs text-zinc-700 line-clamp-1 italic">
                    "{item.resumePreview}"
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-emerald-700 font-medium">
                      ✓ {item.matchedKeywords.length} Matched
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-rose-600 font-medium">
                      ✗ {item.missingKeywords.length} Missing
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="sm:col-span-3 flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(item)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs rounded-md transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-600" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteOne(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 rounded-md transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
