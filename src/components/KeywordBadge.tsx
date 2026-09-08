import React from 'react';
import { Check, Plus } from 'lucide-react';
import { getKeywordCategory } from '../utils/matcher';

interface KeywordBadgeProps {
  keyword: string;
  type: 'matched' | 'missing';
  showCategory?: boolean;
}

export const KeywordBadge: React.FC<KeywordBadgeProps> = ({ keyword, type, showCategory = true }) => {
  const category = getKeywordCategory(keyword);

  if (type === 'matched') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 shadow-xs shadow-emerald-500/10 transition-all hover:border-emerald-500/60 hover:bg-emerald-900/60">
        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
        <span className="capitalize">{keyword}</span>
        {showCategory && (
          <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-900/80 text-emerald-200 font-semibold border border-emerald-500/20">
            {category}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/60 text-rose-300 border border-rose-500/30 shadow-xs shadow-rose-500/10 transition-all hover:border-rose-500/60 hover:bg-rose-900/60">
      <Plus className="w-3.5 h-3.5 text-rose-400 stroke-[3]" />
      <span className="capitalize">{keyword}</span>
      {showCategory && (
        <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-rose-900/80 text-rose-200 font-semibold border border-rose-500/20">
          {category}
        </span>
      )}
    </span>
  );
};
