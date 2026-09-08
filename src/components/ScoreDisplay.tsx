import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ScoreDisplayProps {
  score: number | null;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (score === null) return;

    let start = 0;
    const end = score;
    const duration = 900;
    const increment = end / (duration / 16);

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
          Could not detect specific skills in the job description. Try adding more technical requirements or job duties to the job description field.
        </p>
      </div>
    );
  }

  let colorTheme = {
    ring: '#e11d48', // rose-600
    text: 'text-rose-600',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    label: 'Poor Match',
    description: 'Your resume is missing essential keywords from this job description. Consider tweaking your skills section.',
  };

  if (score >= 71) {
    colorTheme = {
      ring: '#059669', // emerald-600
      text: 'text-emerald-600',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Excellent Match',
      description: 'Your resume aligns strongly with the job description keywords and is well-positioned for ATS screening.',
    };
  } else if (score >= 41) {
    colorTheme = {
      ring: '#d97706', // amber-600
      text: 'text-amber-600',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Good Match',
      description: 'Solid keyword overlap. Adding a few more missing key skills could improve your candidate ranking.',
    };
  }

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="card-minimal rounded-xl p-6 sm:p-8 max-w-2xl mx-auto">
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
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorTheme.badge}`}>
            {score >= 71 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            <span>{colorTheme.label}</span>
          </div>
          
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Match Status: <span className={colorTheme.text}>{colorTheme.label}</span>
          </h2>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            {colorTheme.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-500 pt-1">
            <span>Score: <strong className="text-zinc-900">{score}%</strong></span>
            <span>•</span>
            <span>Tier: <strong className="text-zinc-900">{score >= 71 ? 'High Match' : score >= 41 ? 'Medium Match' : 'Low Match'}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};
