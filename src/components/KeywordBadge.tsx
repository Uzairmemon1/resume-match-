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
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
        <Check className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
        <span className="capitalize">{keyword}</span>
        {showCategory && (
          <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-white/70 text-emerald-900 border border-emerald-200/60 font-normal">
            {category}
          </span>
        )}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
      <Plus className="w-3 h-3 text-rose-600 stroke-[2.5]" />
      <span className="capitalize">{keyword}</span>
      {showCategory && (
        <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-white/70 text-rose-900 border border-rose-200/60 font-normal">
          {category}
        </span>
      )}
    </span>
  );
};
