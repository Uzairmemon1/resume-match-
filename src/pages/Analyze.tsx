import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Briefcase, Sparkles, Loader2, AlertCircle, Wand2, ArrowRight } from 'lucide-react';
import { analyzeMatch } from '../utils/matcher';
import { saveAnalysis } from '../utils/storage';
import type { Analysis } from '../types';

const SAMPLE_RESUME = `Alex Rivera
Software Engineer | Full Stack Specialist

Email: alex.rivera@example.com | GitHub: github.com/alexrivera | LinkedIn: linkedin.com/in/alexrivera

PROFESSIONAL SUMMARY
Results-driven Software Engineer with 4+ years of experience designing and scaling web applications. Proficient in TypeScript, React, Node.js, Python, and SQL. Hands-on experience with Docker, AWS cloud infrastructure, and PostgreSQL databases. Strong advocate for Agile methodologies, CI/CD automation, and clean architecture.

TECHNICAL SKILLS
- Languages: JavaScript, TypeScript, Python, SQL, HTML, CSS
- Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
- Databases & Tools: PostgreSQL, MongoDB, Git, Docker, AWS, Rest API, Jest
- Methodologies: Agile, Scrum, Teamwork, Communication, Problem Solving

EXPERIENCE
Frontend Developer | TechCorp Inc. (2022 - Present)
- Developed responsive web interfaces using React, TypeScript, and Tailwind CSS.
- Integrated RESTful APIs with Node.js backend services, improving page load speed by 35%.
- Collaborated in an Agile Scrum team with 8 engineers, participating in code reviews and daily standups.

Software Developer Intern | DataSolutions (2021 - 2022)
- Built automated data analysis pipelines using Python and Pandas.
- Designed database schemas in MySQL and PostgreSQL for client dashboards.`;

const SAMPLE_JD = `Senior Full Stack Engineer (React / Node.js / AWS)

We are seeking a talented Senior Full Stack Engineer to join our growing product team. You will lead the development of our modern SaaS platform and collaborate closely with cross-functional teams.

KEY RESPONSIBILITIES
- Build scalable, responsive user interfaces using React, TypeScript, and Tailwind CSS.
- Architect backend microservices utilizing Node.js, Express, and Python.
- Deploy and manage cloud services on AWS using Docker, Kubernetes, and Terraform.
- Design high-performance database queries using PostgreSQL and Redis.
- Collaborate with product management, participating in Agile/Scrum sprint planning.

REQUIRED SKILLS & QUALIFICATIONS
- 4+ years of software development experience with JavaScript, TypeScript, and Python.
- Deep expertise in React, Next.js, and Node.js.
- Strong knowledge of AWS cloud, Docker, Kubernetes, and CI/CD pipelines.
- Experience with PostgreSQL, Redis, and GraphQL APIs.
- Excellent communication, leadership, and problem solving abilities.
- Background in Data Analysis, Machine Learning, or Python Pandas is a plus!`;

export const Analyze: React.FC = () => {
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  const [touched, setTouched] = useState({ resume: false, jd: false });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Parsing resume structure & technical skills...',
    'Extracting target keywords from job posting...',
    'Calculating ATS overlap & skill match tier...',
    'Generating optimization recommendations...'
  ];

  const countWords = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
  const countChars = (text: string) => text.length;

  const isResumeEmpty = resumeText.trim().length === 0;
  const isJdEmpty = jdText.trim().length === 0;
  const isFormValid = !isResumeEmpty && !isJdEmpty;

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    setTouched({ resume: true, jd: true });
  };

  const handleAnalyze = () => {
    setTouched({ resume: true, jd: true });
    if (!isFormValid) return;

    setIsLoading(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    setTimeout(() => {
      const matchResult = analyzeMatch(resumeText, jdText);

      const previewText = resumeText.trim().slice(0, 140) + (resumeText.length > 140 ? '...' : '');

      const newAnalysis: Analysis = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        resumePreview: previewText,
        fullResumeText: resumeText,
        fullJDText: jdText,
        score: matchResult.score,
        matchedKeywords: matchResult.matchedKeywords,
        missingKeywords: matchResult.missingKeywords,
      };

      // Automatically save to local history so it immediately appears in History
      saveAnalysis(newAnalysis);

      setIsLoading(false);
      navigate('/results', { state: { analysis: newAnalysis } });
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 pt-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-indigo-400" />
            Analyze Resume & Job Posting
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Paste your resume text and target job description below to generate your ATS score report.
          </p>
        </div>

        {/* Preset Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-bold text-xs rounded-xl border border-indigo-500/30 transition-all self-start sm:self-auto shadow-sm"
        >
          <Wand2 className="w-4 h-4 text-indigo-400" />
          <span>Fill Sample Preset</span>
        </button>
      </div>

      {/* Input Textarea Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Resume Box */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="resume-input" className="font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Paste Your Resume <span className="text-rose-400">*</span>
            </label>
            <span className="text-xs text-slate-400 font-semibold">
              {countWords(resumeText)} words | {countChars(resumeText)} chars
            </span>
          </div>

          <div className="relative">
            <textarea
              id="resume-input"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, resume: true }))}
              placeholder="Paste your resume content here (Work Experience, Skills, Education)..."
              rows={14}
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl border bg-slate-900/80 text-slate-100 text-sm font-sans focus:outline-none transition-all duration-200 shadow-inner ${
                touched.resume && isResumeEmpty
                  ? 'border-rose-500/50 ring-2 ring-rose-500/20 bg-rose-950/10'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
              }`}
            />
            {touched.resume && isResumeEmpty && (
              <p className="mt-1.5 text-xs text-rose-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Resume text cannot be empty. Please paste your resume.
              </p>
            )}
          </div>
        </div>

        {/* Job Description Box */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="jd-input" className="font-bold text-white text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              Paste Job Description <span className="text-rose-400">*</span>
            </label>
            <span className="text-xs text-slate-400 font-semibold">
              {countWords(jdText)} words | {countChars(jdText)} chars
            </span>
          </div>

          <div className="relative">
            <textarea
              id="jd-input"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, jd: true }))}
              placeholder="Paste the target job posting / job description here..."
              rows={14}
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl border bg-slate-900/80 text-slate-100 text-sm font-sans focus:outline-none transition-all duration-200 shadow-inner ${
                touched.jd && isJdEmpty
                  ? 'border-rose-500/50 ring-2 ring-rose-500/20 bg-rose-950/10'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
              }`}
            />
            {touched.jd && isJdEmpty && (
              <p className="mt-1.5 text-xs text-rose-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Job description cannot be empty. Please paste job text.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Loading Overlay or Action Button */}
      <div className="pt-4 flex flex-col items-center justify-center space-y-4">
        
        {isLoading ? (
          <div className="w-full max-w-md glass-card border-indigo-500/30 p-6 rounded-2xl shadow-2xl text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center border border-indigo-500/30">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Running ATS Keyword Engine</h4>
              <p className="text-xs text-indigo-300 font-semibold mt-1 animate-pulse">
                {loadingSteps[loadingStep]}
              </p>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 w-full max-w-md">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!isFormValid}
              className={`w-full py-4 px-8 rounded-2xl font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.01]'
                  : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>Analyze Match Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {!isFormValid && (
              <p className="text-xs text-slate-400 font-semibold">
                Please paste both your resume and the job description to run analysis.
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
