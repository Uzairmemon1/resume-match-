import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Award, Zap } from 'lucide-react';
import type { MatchTier, MatchBreakdown } from '../types';

interface ScoreDisplayProps {
  score: number | null;
  tier?: MatchTier;
  breakdown?: MatchBreakdown;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, tier: passedTier, breakdown }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (score === null) return;

    let start = 0;
    const end = score;
    const duration = 900;
    const increment = Math.max(1, end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  if (score === null) {
    return (
      <div className="card-minimal rounded-xl p-8 text-center max-w-xl mx-auto space-y-3 bg-amber-50/40 border-amber-200">
        <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center mx-auto">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-amber-900">
          Unable to Calculate ATS Score
        </h3>
        <p className="text-amber-800 text-xs leading-relaxed max-w-md mx-auto">
          Could not extract valid requirements from the job description or resume. Please verify both fields contain complete text.
        </p>
      </div>
    );
  }

  // Determine standard 5 ATS Tiers
  let colorTheme = {
    ring: '#e11d48', // rose-600
    text: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-800 border-rose-200',
    label: 'Poor Match',
    description: 'Minimal keyword overlap. High risk of ATS rejection. Substantial resume revisions needed for this role.',
  };

  if (score >= 80) {
    colorTheme = {
      ring: '#059669', // emerald-600
      text: 'text-emerald-700',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      label: 'Strong Match',
      description: 'Outstanding alignment with both required and preferred qualifications. Excellent positioning for ATS shortlisting.',
    };
  } else if (score >= 60) {
    colorTheme = {
      ring: '#0d9488', // teal-600
      text: 'text-teal-700',
      badge: 'bg-teal-50 text-teal-800 border-teal-200',
      label: 'Good Match',
      description: 'Solid keyword and experience overlap. Adding a few more specific tools or responsibilities will push this into top tier.',
    };
  } else if (score >= 40) {
    colorTheme = {
      ring: '#d97706', // amber-600
      text: 'text-amber-700',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      label: 'Moderate Match',
      description: 'Moderate overlap. Several key skills or qualifications are missing. Tailoring your experience bullets is recommended.',
    };
  } else if (score >= 20) {
    colorTheme = {
      ring: '#ea580c', // orange-600
      text: 'text-orange-700',
      badge: 'bg-orange-50 text-orange-800 border-orange-200',
      label: 'Weak Match',
      description: 'Low keyword alignment. Significant gaps in required competencies and technologies for this specific role.',
    };
  }

  const effectiveTier = passedTier && passedTier !== 'No Score' ? passedTier : colorTheme.label;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="card-minimal rounded-xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        
        {/* SVG Circular Gauge */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-zinc-100"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={colorTheme.ring}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-bold ${colorTheme.text} tracking-tight`}>
              {animatedScore}%
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mt-0.5">
              ATS Match
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 text-center sm:text-left space-y-2.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorTheme.badge}`}>
              {score >= 60 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              <span>{effectiveTier}</span>
            </div>

            {breakdown?.experienceBoostApplied && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>Applied Skills Bonus (+5%)</span>
              </span>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Match Status: <span className={colorTheme.text}>{effectiveTier}</span>
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            {colorTheme.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-500 pt-1">
            <span>Score: <strong className="text-zinc-900">{score}%</strong></span>
            <span>•</span>
            <span>ATS Tier: <strong className="text-zinc-900">{effectiveTier}</strong></span>
            <span>•</span>
            <span className="text-zinc-400">Taleo / Workday Benchmark</span>
          </div>
        </div>

      </div>

      {/* Weighted ATS Breakdown Pill Bar */}
      {breakdown && (
        <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Required */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-800 flex items-center gap-1">
                <Zap className="w-3 h-3 text-zinc-600" />
                Required Skills
              </span>
              <span className="font-bold text-zinc-900">{breakdown.requiredScore}%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-800 h-full rounded-full"
                style={{ width: `${Math.min(100, breakdown.requiredScore)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              {breakdown.requiredMatched} of {breakdown.requiredTotal} matched (60% weight)
            </p>
          </div>

          {/* Preferred */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-800">Preferred Skills</span>
              <span className="font-bold text-zinc-900">{breakdown.preferredScore}%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-800 h-full rounded-full"
                style={{ width: `${Math.min(100, breakdown.preferredScore)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              {breakdown.preferredMatched} of {breakdown.preferredTotal} matched (25% weight)
            </p>
          </div>

          {/* Soft Skills & Responsibilities */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-800">Responsibilities / Soft</span>
              <span className="font-bold text-zinc-900">{breakdown.softSkillsScore}%</span>
            </div>
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-800 h-full rounded-full"
                style={{ width: `${Math.min(100, breakdown.softSkillsScore)}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              {breakdown.softSkillsMatched} of {breakdown.softSkillsTotal} matched (15% weight)
            </p>
          </div>

        </div>
      )}
    </div>
  );
};
