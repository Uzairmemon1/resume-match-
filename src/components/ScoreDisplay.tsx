import React, { useEffect, useState } from 'react';
import { AlertTriangle, ShieldAlert, Sparkles, Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number | null;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (score === null) return;

    let start = 0;
    const end = score;
    const duration = 1000;
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
      <div className="glass-card border-amber-500/30 rounded-3xl p-8 text-center max-w-2xl mx-auto shadow-xl space-y-4">
        <div className="w-14 h-14 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-2">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-amber-300">
          Unable to Calculate ATS Score
        </h3>
        <p className="text-amber-200/80 text-sm leading-relaxed max-w-lg mx-auto">
          Could not detect specific skills in job description — try adding more details, technical tools, or job responsibilities to the Job Description field.
        </p>
      </div>
    );
  }

  // Determine dark colors and labels based on score threshold
  let colorTheme = {
    ring: '#ef4444', // Red 500
    text: 'text-rose-400',
    border: 'border-rose-500/40',
    glow: 'shadow-rose-500/20',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    label: 'Poor Match',
    description: 'Your resume is missing critical keywords from this job description. Tweak your skills & bullet points to increase match potential.',
    icon: ShieldAlert
  };

  if (score >= 71) {
    colorTheme = {
      ring: '#10b981', // Emerald 500
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      glow: 'shadow-emerald-500/20',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      label: 'Excellent Match',
      description: 'Great job! Your resume aligns strongly with the job description keywords and is highly likely to pass ATS screening.',
      icon: Trophy
    };
  } else if (score >= 41) {
    colorTheme = {
      ring: '#f59e0b', // Amber 500
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      glow: 'shadow-amber-500/20',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      label: 'Good Match',
      description: 'Solid match! Adding a few missing key skills could significantly boost your application ranking.',
      icon: Sparkles
    };
  }

  const Icon = colorTheme.icon;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`glass-card rounded-3xl p-6 sm:p-10 border ${colorTheme.border} shadow-2xl ${colorTheme.glow} max-w-3xl mx-auto transition-all duration-300`}>
      <div className="flex flex-col sm:flex-row items-center gap-8">
        
        {/* SVG Circular Gauge */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <svg className="w-40 h-40 sm:w-44 sm:h-44 transform -rotate-90">
            {/* Background Circle Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-slate-800"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Animated Score Arc */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={colorTheme.ring}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
              style={{ filter: `drop-shadow(0 0 8px ${colorTheme.ring}80)` }}
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-4xl sm:text-5xl font-black ${colorTheme.text} tracking-tight`}>
              {animatedScore}%
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">
              ATS Score
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border ${colorTheme.badgeBg}`}>
            <Icon className="w-4 h-4" />
            <span>{colorTheme.label}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Match Quality: <span className={colorTheme.text}>{colorTheme.label}</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            {colorTheme.description}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-400 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div>
              Match Tier: <span className="text-white font-bold">{score >= 71 ? 'Top 10%' : score >= 41 ? 'Top 30%' : 'Needs Review'}</span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div>
              Status: <span className="text-white font-bold">{score >= 71 ? 'ATS Ready' : 'Optimization Recommended'}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
