import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Target, Sparkles, Activity, FileCheck } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
  quote: string;
  scoreGain: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Product Marketing Manager',
    company: 'TechCorp Solutions',
    initials: 'SC',
    avatarBg: 'bg-blue-600',
    quote: 'ResumeMatch flagged 6 essential keywords missing from my qualifications. After adding them into my experience bullet points, my match score jumped from 48% to 84% and I got my interview call!',
    scoreGain: 'Score: 48% → 84%',
  },
  {
    name: 'Marcus Vance',
    role: 'Senior DevOps & Cloud Engineer',
    company: 'FinScale Global',
    initials: 'MV',
    avatarBg: 'bg-emerald-600',
    quote: 'The section-aware parser showed me that my Kubernetes and Terraform experience was only listed under skills, not in my job bullets. Fixing that pushed my ATS ranking to top tier.',
    scoreGain: 'Score: 56% → 91%',
  },
  {
    name: 'Elena Rostova',
    role: 'Data Scientist & ML Specialist',
    company: 'Nexus Analytics',
    initials: 'ER',
    avatarBg: 'bg-purple-600',
    quote: 'Commercial ATS platforms like Taleo and Workday were filtering me out. ResumeMatch’s synonym and weighted scoring gave me the exact clarity I needed to optimize my resume.',
    scoreGain: 'Score: 42% → 88%',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="space-y-24 pb-20 pt-8">
      
      {/* ================= 1. HERO SECTION ================= */}
      {/* Clean, focused: headline, subheading, single CTA button */}
      <section className="text-center max-w-3xl mx-auto space-y-6 px-4">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.12]">
          Does your resume pass the ATS test?
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Upload your resume in PDF or Word format and compare it against any job description. Discover missing keywords and optimize your application in seconds.
        </p>

        {/* Single Primary CTA Button */}
        <div className="pt-2 flex justify-center">
          <Link
            to="/analyze"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>PDF & Word Upload</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant & Free</span>
          </div>
        </div>

      </section>

      {/* ================= 2. ABOUT WEBPAGE SECTION ================= */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="card-minimal rounded-2xl p-8 sm:p-10 border border-zinc-200 bg-zinc-50/50 space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About ResumeMatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Built to Beat Automated Applicant Tracking Filters
            </h2>
          </div>

          <div className="space-y-4 text-zinc-600 text-sm leading-relaxed">
            <p>
              Over 75% of job resumes are rejected before a human recruiter ever sees them. Modern hiring teams rely on automated Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse to screen for precise keyword alignment, applied skills, and role qualifications.
            </p>
            <p>
              ResumeMatch bridges this information gap. By parsing your resume and job description using real-world ATS methodologies—including dynamic extraction, morphological stemming, synonym normalization, and section weighting—we reveal exactly where your application excels and where it falls short.
            </p>
            <div className="pt-2 p-4 rounded-xl bg-white border border-zinc-200 text-zinc-800 font-medium text-xs sm:text-sm">
              <strong className="text-[#2563EB]">Our Mission:</strong> We help job seekers understand exactly what recruiters and ATS systems are looking for, empowering candidates to apply with confidence and secure more interviews.
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CORE BENEFITS SECTION ================= */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Designed for Clarity & ATS Accuracy
          </h2>
          <p className="text-zinc-600 text-sm">
            Actionable insights that align your qualifications with recruiter expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="card-minimal p-6 rounded-xl space-y-3 bg-white border border-zinc-200">
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB]">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Multi-Stage ATS Scoring</h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Calculates weighted scores based on Required (60%), Preferred (25%), and Soft Skills (15%), mirroring commercial hiring software.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card-minimal p-6 rounded-xl space-y-3 bg-white border border-zinc-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Synonym & Stem Recognition</h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Detects variations like <em>Project Coordination</em> for <em>Project Management</em> and stems action verbs so you aren't penalized for phrasing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card-minimal p-6 rounded-xl space-y-3 bg-white border border-zinc-200">
            <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900">Applied Experience Credit</h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Awards higher weighting to competencies demonstrated directly in work experience bullet points rather than static skill lists.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 4. TESTIMONIALS / REVIEWS SECTION ================= */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            What our users say
          </h2>
          <p className="text-zinc-600 text-sm">
            Job seekers who optimized their resumes with ResumeMatch report measurable interview improvements.
          </p>
        </div>

        {/* 3 Columns Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="card-minimal rounded-xl p-6 bg-white border border-zinc-200 flex flex-col justify-between space-y-4 hover:border-zinc-300 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                {/* 5-Star Rating (Static Amber) */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* User Metadata */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {/* Avatar Circle with Initials */}
                  <div className={`w-9 h-9 rounded-full ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs`}>
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-xs">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      {item.role}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {item.scoreGain}
                </span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ================= 5. FINAL CALLOUT BANNER ================= */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to scan your resume against job postings?
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              Upload your resume in PDF or Word format and get your comprehensive ATS compatibility report right away.
            </p>
          </div>

          <Link
            to="/analyze"
            className="px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 flex-shrink-0 shadow-xs"
          >
            <FileCheck className="w-4 h-4" />
            <span>Start Free Analysis</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
