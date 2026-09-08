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
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
          No Skills
        </span>
      );
    }
    if (score >= 71) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          {score}% Match
        </span>
      );
    }
    if (score >= 41) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-300 border border-amber-500/30">
          {score}% Match
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-300 border border-rose-500/30">
        {score}% Match
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 pt-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <HistoryIcon className="w-7 h-7 text-indigo-400" />
            Analysis History
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review past resume score reports stored locally in your browser memory.
          </p>
        </div>

        {analyses.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs rounded-xl border border-rose-500/30 transition-all self-start sm:self-auto shadow-sm"
          >
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Clear All Saved Reports?</h3>
              <p className="text-slate-400 text-sm">
                This will permanently remove all stored reports from your local browser storage.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {analyses.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 shadow-2xl border border-slate-800">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">No Saved Analyses Yet</h3>
            <p className="text-slate-400 text-sm">
              You haven't saved any resume score reports yet. Perform your first analysis to test your resume.
            </p>
          </div>
          <Link
            to="/analyze"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition-all"
          >
            <span>Analyze Your Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* History Items List */
        <div className="space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-900/60 rounded-xl text-xs font-bold text-slate-400 uppercase tracking-wider border border-slate-800">
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-2 text-center">Score</div>
            <div className="col-span-4">Resume Snippet</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          <div className="space-y-3">
            {analyses.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 sm:px-6 sm:py-4 shadow-sm hover:border-indigo-500/40 hover:shadow-indigo-500/10 transition-all duration-200 flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-4 border border-slate-800"
              >
                {/* Date */}
                <div className="sm:col-span-3 flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{item.date}</span>
                </div>

                {/* Score */}
                <div className="sm:col-span-2 sm:text-center">
                  {getScoreBadge(item.score)}
                </div>

                {/* Preview */}
                <div className="sm:col-span-4 space-y-1.5">
                  <div className="text-xs text-slate-300 line-clamp-2 italic bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    "{item.resumePreview}"
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="text-emerald-400">
                      ✓ {item.matchedKeywords.length} Matched
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-rose-400">
                      ✗ {item.missingKeywords.length} Missing
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="sm:col-span-3 flex items-center justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(item)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-500/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteOne(item.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-transparent hover:border-rose-500/20"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
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
