import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  Loader2, 
  AlertCircle, 
  Wand2, 
  ArrowRight, 
  UploadCloud, 
  FileCheck2, 
  Trash2, 
  CheckCircle2, 
  Edit3
} from 'lucide-react';
import { analyzeMatch } from '../utils/matcher';
import { saveAnalysis } from '../utils/storage';
import { extractTextFromFile } from '../utils/documentParser';
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Resume state
  const [resumeText, setResumeText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showExtractedPreview, setShowExtractedPreview] = useState(false);

  // Job description state
  const [jdText, setJdText] = useState('');
  const [touched, setTouched] = useState({ resume: false, jd: false });

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Parsing resume structure & skills...',
    'Extracting target keywords from job description...',
    'Comparing keyword overlap & calculating match score...',
    'Preparing optimization suggestions...'
  ];

  const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);
  const countChars = (text: string) => text.length;

  // Strict Validation: Both fields are mandatory!
  const isResumeEmpty = resumeText.trim().length === 0;
  const isJdEmpty = jdText.trim().length === 0;
  const isFormValid = !isResumeEmpty && !isJdEmpty && !isExtracting;

  const handleFileProcess = async (file: File) => {
    setIsExtracting(true);
    setExtractionError(null);
    setTouched((prev) => ({ ...prev, resume: true }));

    try {
      const extracted = await extractTextFromFile(file);
      setResumeText(extracted);
      setUploadedFile(file);
      setIsExtracting(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to extract text from file';
      setExtractionError(msg);
      setUploadedFile(null);
      setIsExtracting(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setResumeText('');
    setExtractionError(null);
    setShowExtractedPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadSample = () => {
    setUploadedFile(null);
    setResumeText(SAMPLE_RESUME);
    setJdText(SAMPLE_JD);
    setTouched({ resume: true, jd: true });
    setExtractionError(null);
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
    }, 350);

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
          minute: '2-digit',
        }),
        resumePreview: previewText,
        fullResumeText: resumeText,
        fullJDText: jdText,
        score: matchResult.score,
        matchedKeywords: matchResult.matchedKeywords,
        missingKeywords: matchResult.missingKeywords,
      };

      // Automatically persist to history
      saveAnalysis(newAnalysis);

      setIsLoading(false);
      navigate('/results', { state: { analysis: newAnalysis } });
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 pt-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Analyze Resume & Job Description
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Upload your resume document and paste the job description to test compatibility.
          </p>
        </div>

        {/* Preset Sample Button */}
        <button
          type="button"
          onClick={handleLoadSample}
          disabled={isLoading || isExtracting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-colors self-start sm:self-auto shadow-2xs"
        >
          <Wand2 className="w-3.5 h-3.5 text-zinc-500" />
          <span>Fill Sample Data</span>
        </button>
      </div>

      {/* Input Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ================= RESUME UPLOAD SECTION ================= */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-zinc-700" />
              <span>Resume</span>
              <span className="text-rose-500 text-xs font-normal">* (Mandatory)</span>
            </label>
            {resumeText.trim().length > 0 && (
              <span className="text-xs text-zinc-500">
                {countWords(resumeText)} words | {countChars(resumeText)} chars
              </span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
          />

          {/* If file is uploaded & extracted */}
          {uploadedFile ? (
            <div className="card-minimal p-4 rounded-xl space-y-3 bg-zinc-50/50">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 flex-shrink-0">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-semibold text-zinc-900 text-xs truncate">{uploadedFile.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                      <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Text extracted
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* View / Edit toggle */}
              <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setShowExtractedPreview(!showExtractedPreview)}
                  className="text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5 text-zinc-500" />
                  {showExtractedPreview ? 'Hide extracted text' : 'View / Edit extracted text'}
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-zinc-500 hover:text-zinc-800 underline"
                >
                  Replace file
                </button>
              </div>

              {showExtractedPreview && (
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={8}
                  className="w-full p-3 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-xs font-mono focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 mt-2"
                />
              )}
            </div>
          ) : (
            /* Upload Drop Area */
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors flex flex-col items-center justify-center space-y-2.5 ${
                  isDragOver
                    ? 'border-zinc-900 bg-zinc-50'
                    : touched.resume && isResumeEmpty
                    ? 'border-rose-300 bg-rose-50/20'
                    : 'border-zinc-300 bg-zinc-50/40 hover:border-zinc-400 hover:bg-zinc-50'
                }`}
              >
                {isExtracting ? (
                  <div className="space-y-1.5 py-3">
                    <Loader2 className="w-7 h-7 text-zinc-600 animate-spin mx-auto" />
                    <p className="font-semibold text-zinc-900 text-xs">Extracting text from resume...</p>
                    <p className="text-[11px] text-zinc-500">Reading document structure</p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center shadow-2xs">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 text-sm">
                        Upload your resume (PDF or Word)
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Drag and drop or click to select <span className="text-zinc-700 font-medium">.pdf, .docx, .doc, .txt</span>
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Extraction Error */}
              {extractionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Unable to read file</p>
                    <p>{extractionError}</p>
                  </div>
                </div>
              )}

              {/* Or paste manual text */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs text-zinc-500 font-medium">
                  Or paste resume text directly:
                </span>
                <textarea
                  id="resume-input"
                  value={resumeText}
                  onChange={(e) => {
                    setResumeText(e.target.value);
                    if (uploadedFile) setUploadedFile(null);
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, resume: true }))}
                  placeholder="Paste resume text here (Work Experience, Skills, Education)..."
                  rows={6}
                  disabled={isLoading || isExtracting}
                  className={`w-full p-3 rounded-lg border text-xs font-sans focus:outline-none transition-colors ${
                    touched.resume && isResumeEmpty
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-zinc-200 bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Validation Warning */}
          {touched.resume && isResumeEmpty && !isExtracting && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please upload your resume file or paste your resume text.
            </p>
          )}
        </div>

        {/* ================= JOB DESCRIPTION SECTION ================= */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="jd-input" className="font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-zinc-700" />
              <span>Job Description</span>
              <span className="text-rose-500 text-xs font-normal">* (Mandatory)</span>
            </label>
            <span className="text-xs text-zinc-500">
              {countWords(jdText)} words | {countChars(jdText)} chars
            </span>
          </div>

          <textarea
            id="jd-input"
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, jd: true }))}
            placeholder="Paste the target job description or job posting here (responsibilities, required skills, qualifications)..."
            rows={15}
            disabled={isLoading}
            className={`w-full p-3.5 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
              touched.jd && isJdEmpty
                ? 'border-rose-300 bg-rose-50/20'
                : 'border-zinc-200 bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900'
            }`}
          />

          {touched.jd && isJdEmpty && (
            <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please paste the job description to match against.
            </p>
          )}
        </div>

      </div>

      {/* Loading Overlay or Action Button */}
      <div className="pt-2 flex flex-col items-center justify-center space-y-3">
        
        {isLoading ? (
          <div className="w-full max-w-sm card-minimal p-5 rounded-xl text-center space-y-3 shadow-sm">
            <Loader2 className="w-6 h-6 text-zinc-700 animate-spin mx-auto" />
            <div>
              <h4 className="font-semibold text-zinc-900 text-sm">Analyzing Match Compatibility</h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                {loadingSteps[loadingStep]}
              </p>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-zinc-900 h-full transition-all duration-300"
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full max-w-sm">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!isFormValid}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs cursor-pointer'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
              }`}
            >
              <span>Analyze Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isFormValid && (
              <p className="text-xs text-zinc-400 font-normal text-center">
                Both Resume (upload or text) and Job Description are required.
              </p>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
