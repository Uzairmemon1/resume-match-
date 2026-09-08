import React from 'react';
import { Check, Plus, RefreshCw, Layers } from 'lucide-react';
import { getKeywordCategory } from '../utils/matcher';
import type { MatchStatus } from '../types';

interface KeywordBadgeProps {
  keyword: string;
  type: MatchStatus | 'matched';
  matchedWith?: string;
  sectionFound?: string;
  sourceSection?: string;
  inExperience?: boolean;
  showCategory?: boolean;
  category?: string;
}

export const KeywordBadge: React.FC<KeywordBadgeProps> = ({
  keyword,
  type,
  matchedWith,
  sectionFound,
  sourceSection,
  inExperience,
  showCategory = true,
  category: propCategory,
}) => {
  const category = propCategory || getKeywordCategory(keyword);

  // Exact Match
  if (type === 'exact' || type === 'matched') {
    return (
      <span className="inline-flex items-center flex-wrap gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
        <Check className="w-3 h-3 text-emerald-600 stroke-[2.5] flex-shrink-0" />
        <span className="capitalize font-semibold">{keyword}</span>
        
        {sectionFound && (
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${
            inExperience 
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
              : 'bg-white/80 text-emerald-900 border-emerald-200'
          }`}>
            {inExperience ? '★ in Experience' : `in ${sectionFound}`}
          </span>
        )}

        {showCategory && (
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/70 text-emerald-900 border border-emerald-200/60 font-normal">
            {category}
          </span>
        )}
      </span>
    );
  }

  // Synonym / Semantic Match
  if (type === 'synonym') {
    return (
      <span className="inline-flex items-center flex-wrap gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-teal-50 text-teal-800 border border-teal-200">
        <RefreshCw className="w-3 h-3 text-teal-600 stroke-[2] flex-shrink-0" />
        <span className="capitalize font-semibold">{keyword}</span>

        {matchedWith && (
          <span className="text-[11px] text-teal-700 italic">
            (via {matchedWith})
          </span>
        )}

        {sectionFound && (
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${
            inExperience 
              ? 'bg-teal-100 text-teal-900 border-teal-300' 
              : 'bg-white/80 text-teal-900 border-teal-200'
          }`}>
            {inExperience ? '★ in Experience' : `in ${sectionFound}`}
          </span>
        )}

        {showCategory && (
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/70 text-teal-900 border border-teal-200/60 font-normal">
            {category}
          </span>
        )}
      </span>
    );
  }

  // Partial Multi-word Overlap
  if (type === 'partial') {
    return (
      <span className="inline-flex items-center flex-wrap gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-300">
        <Layers className="w-3 h-3 text-zinc-500 flex-shrink-0" />
        <span className="capitalize font-semibold">{keyword}</span>

        {matchedWith && (
          <span className="text-[11px] text-zinc-600 italic">
            (partial: {matchedWith})
          </span>
        )}

        {sectionFound && (
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-white text-zinc-700 border border-zinc-200 font-normal">
            in {sectionFound}
          </span>
        )}

        {showCategory && (
          <span className="px-1.5 py-0.2 rounded text-[10px] bg-white text-zinc-600 border border-zinc-200 font-normal">
            {category}
          </span>
        )}
      </span>
    );
  }

  // Missing Keyword
  return (
    <span className="inline-flex items-center flex-wrap gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
      <Plus className="w-3 h-3 text-rose-600 stroke-[2.5] flex-shrink-0" />
      <span className="capitalize font-semibold">{keyword}</span>

      {sourceSection && (
        <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-100/70 text-rose-900 border border-rose-200 font-medium">
          {sourceSection === 'required' ? 'Required' : sourceSection === 'preferred' ? 'Preferred' : 'Responsibility'}
        </span>
      )}

      {showCategory && (
        <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/70 text-rose-900 border border-rose-200/60 font-normal">
          {category}
        </span>
      )}
    </span>
  );
};
