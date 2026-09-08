import React, { useState } from 'react';
import { DollarSign, MapPin, Briefcase, Calendar, Sparkles, TrendingUp, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const POPULAR_CITIES = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
  'Chicago, IL',
  'London, UK',
  'Toronto, Canada',
  'Remote (US)',
  'Remote (Worldwide)',
];

interface SalaryResult {
  jobTitle: string;
  location: string;
  years: number;
  low: number;
  median: number;
  high: number;
  hourly: number;
  marketTrend: string;
}

export const SalaryCalculator: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer');
  const [location, setLocation] = useState('Remote (US)');
  const [years, setYears] = useState<number>(4);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      // Purely client-side demo calculation algorithm
      const cleanYears = Math.max(0, Math.min(30, Number(years) || 0));
      
      // Base calculation according to seniority & title keywords
      let baseMedian = 75000;
      const lowerTitle = jobTitle.toLowerCase();

      if (lowerTitle.includes('lead') || lowerTitle.includes('principal') || lowerTitle.includes('director') || lowerTitle.includes('architect')) {
        baseMedian += 55000;
      } else if (lowerTitle.includes('senior') || lowerTitle.includes('sr')) {
        baseMedian += 35000;
      } else if (lowerTitle.includes('manager')) {
        baseMedian += 40000;
      }

      if (lowerTitle.includes('engineer') || lowerTitle.includes('developer') || lowerTitle.includes('devops') || lowerTitle.includes('data')) {
        baseMedian += 25000;
      } else if (lowerTitle.includes('product') || lowerTitle.includes('designer') || lowerTitle.includes('security')) {
        baseMedian += 20000;
      }

      // Location multiplier
      let locMultiplier = 1.0;
      if (location.includes('San Francisco') || location.includes('New York')) {
        locMultiplier = 1.25;
      } else if (location.includes('Seattle') || location.includes('Boston')) {
        locMultiplier = 1.15;
      } else if (location.includes('London')) {
        locMultiplier = 1.05;
      }

      // Experience scaling: ~$7.5k per year of experience
      const expBonus = cleanYears * 7800;
      const computedMedian = Math.round((baseMedian + expBonus) * locMultiplier);
      const low = Math.round(computedMedian * 0.85);
      const high = Math.round(computedMedian * 1.22);
      const hourly = Math.round(computedMedian / 2080);

      setResult({
        jobTitle,
        location,
        years: cleanYears,
        low,
        median: computedMedian,
        high,
        hourly,
        marketTrend: cleanYears >= 5 ? '+7.4% High Demand' : '+5.2% Moderate Growth',
      });

      setIsCalculating(false);
    }, 600);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-semibold">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Compensation Benchmarking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          AI Salary Calculator
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Estimate realistic compensation benchmarks based on your target job title, location, and years of relevant professional experience.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="md:col-span-6 card-minimal rounded-2xl p-6 sm:p-7 border border-zinc-200 bg-white space-y-5 shadow-xs">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="font-bold text-zinc-900 text-base">Enter Role Parameters</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Customize your background details to generate estimates</p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            
            {/* Job Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-600" />
                <span>Target Job Title</span>
              </label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                <span>Job Location / Region</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              >
                {POPULAR_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Years of Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                <span>Years of Relevant Experience</span>
              </label>
              <input
                type="number"
                min="0"
                max="30"
                required
                value={years}
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{isCalculating ? 'Calculating Compensation...' : 'Calculate Salary'}</span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-zinc-400" />
              <span>Estimates are for demonstration purposes</span>
            </p>
          </form>
        </div>

        {/* Results Column */}
        <div className="md:col-span-6 space-y-4">
          {result ? (
            <div className="card-minimal rounded-2xl p-6 sm:p-7 border border-zinc-200 bg-white space-y-6 shadow-xs animate-in fade-in duration-200">
              
              <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider">
                    Estimated Annual Range
                  </span>
                  <h3 className="font-bold text-zinc-900 text-lg capitalize">
                    {result.jobTitle}
                  </h3>
                  <p className="text-zinc-500 text-xs">
                    {result.location} • {result.years} {result.years === 1 ? 'year' : 'years'} experience
                  </p>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  {result.marketTrend}
                </span>
              </div>

              {/* Main Numbers */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-center space-y-1">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Median Base Salary
                </span>
                <div className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
                  {formatCurrency(result.median)}
                </div>
                <p className="text-[11px] text-zinc-500">
                  Approx. <strong className="text-zinc-800">${result.hourly}/hr</strong> standard equivalent
                </p>
              </div>

              {/* Range Visualization Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                  <span>25th Percentile: {formatCurrency(result.low)}</span>
                  <span>75th Percentile: {formatCurrency(result.high)}</span>
                </div>
                
                <div className="w-full bg-zinc-100 h-2.5 rounded-full relative overflow-hidden">
                  <div className="bg-linear-to-r from-blue-400 to-[#2563EB] h-full rounded-full w-full" />
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
                  <span>Entry Range</span>
                  <span>Median Market</span>
                  <span>Top Tier</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <p className="text-xs text-zinc-600">
                  Tailor your resume for this pay tier
                </p>
                <Link
                  to="/analyze"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  <span>Test Resume ATS Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-400 flex items-center justify-center mx-auto shadow-2xs">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-800 text-sm">No Calculation Yet</h3>
                <p className="text-zinc-500 text-xs max-w-xs mx-auto">
                  Fill in your target title, location, and experience on the left, then click "Calculate Salary" to view salary estimates.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
