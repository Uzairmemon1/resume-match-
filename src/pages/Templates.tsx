import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  ArrowRight, 
  LayoutTemplate, 
  Sparkles, 
  Download, 
  ExternalLink, 
  Loader2, 
  X, 
  AlertCircle,
  FileCheck2,
  Palette
} from 'lucide-react';
import { generatePdfResume, type UseResumeContent } from '../utils/useResumeApi';

interface TemplateCard {
  id: string;
  name: string;
  apiTemplateId: string;
  category: string;
  tag: string;
  description: string;
  highlights: string[];
}

const TEMPLATES: TemplateCard[] = [
  {
    id: 'clean',
    name: 'Modern Minimalist',
    apiTemplateId: 'clean',
    category: 'General & Tech',
    tag: 'ATS Optimized',
    description: 'A clean single-column structure with high readability, optimized for Taleo, Workday, and Greenhouse ATS parsing.',
    highlights: ['Single column flow', 'Zero graphic clutter', 'Maximum ATS readability'],
  },
  {
    id: 'apex',
    name: 'Software Engineer Pro',
    apiTemplateId: 'apex',
    category: 'Engineering',
    tag: 'Technical Focus',
    description: 'Tailored for software developers, devops, and data scientists with prominent technical skills and project impact metrics.',
    highlights: ['Categorized skills matrix', 'Project bullet points', 'GitHub & portfolio links'],
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    apiTemplateId: 'executive',
    category: 'Management',
    tag: 'Leadership',
    description: 'Designed for engineering managers, directors, and VPs. Prioritizes strategic achievements, revenue scale, and leadership scopes.',
    highlights: ['Core competencies section', 'Career trajectory layout', 'Quantified business wins'],
  },
  {
    id: 'harvard',
    name: 'Classic Ivy League',
    apiTemplateId: 'harvard',
    category: 'Finance & Law',
    tag: 'Traditional ATS',
    description: 'The standard traditional Harvard-format resume trusted by tier-1 investment banks, consulting firms, and Fortune 500 enterprises.',
    highlights: ['Academic prestige layout', 'Formal chronological order', 'Universal parser support'],
  },
  {
    id: 'cascade',
    name: 'Product & Design',
    apiTemplateId: 'cascade',
    category: 'Product & UX',
    tag: 'High Impact',
    description: 'Structured for product managers, business analysts, and scrum masters to highlight product lifecycle leadership and metrics.',
    highlights: ['KPI & metric callouts', 'Agile process section', 'Cross-functional scope'],
  },
  {
    id: 'zenith',
    name: 'Data & Cloud Specialist',
    apiTemplateId: 'zenith',
    category: 'Data Science',
    tag: 'Analytics Stack',
    description: 'Ideal for machine learning engineers and data analysts, structured for tools, models, pipelines, and data stacks.',
    highlights: ['Tooling & library stack', 'Data pipeline summaries', 'Education & credentials'],
  },
];

const ACCENT_COLORS = [
  { name: 'Blue', value: 'blue', hex: '#2563EB' },
  { name: 'Emerald', value: 'emerald', hex: '#059669' },
  { name: 'Black', value: 'black', hex: '#18181B' },
  { name: 'Purple', value: 'purple', hex: '#7C3AED' },
];

export const Templates: React.FC = () => {
  const navigate = useNavigate();

  // Modal State
  const [activeTemplate, setActiveTemplate] = useState<TemplateCard | null>(null);
  const [selectedColor, setSelectedColor] = useState('blue');

  // Candidate Form Details for API Generation
  const [candidateName, setCandidateName] = useState('Alex Rivera');
  const [candidateRole, setCandidateRole] = useState('Senior Full Stack Engineer');
  const [candidateEmail, setCandidateEmail] = useState('alex.rivera@example.com');
  const [candidateSkills, setCandidateSkills] = useState('React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, CI/CD');
  const [candidateSummary, setCandidateSummary] = useState(
    'Results-driven Software Engineer with 5+ years of experience designing and scaling web applications, microservices, and cloud infrastructure.'
  );

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const openGeneratorModal = (tmpl: TemplateCard) => {
    setActiveTemplate(tmpl);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
  };

  const handleGeneratePdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTemplate) return;

    setIsGenerating(true);
    setGenerationError(null);

    const skillsArray = candidateSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const content: UseResumeContent = {
      name: candidateName,
      role: candidateRole,
      email: candidateEmail,
      summary: candidateSummary,
      skills: skillsArray,
    };

    const response = await generatePdfResume(content, {
      template: activeTemplate.apiTemplateId,
      template_color: selectedColor,
      page_format: 'a4',
    });

    setIsGenerating(false);

    if (response.success && response.fileUrl) {
      setGeneratedPdfUrl(response.fileUrl);
      if (response.fileSizeBytes) setFileSize(response.fileSizeBytes);
      if (response.creditsRemaining !== undefined) setCreditsLeft(response.creditsRemaining);
    } else {
      setGenerationError(response.error || 'Failed to generate PDF resume.');
    }
  };

  const handleTestInAnalyzer = () => {
    // Navigate to analyze page
    navigate('/analyze');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live useResume.ai API Integration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          Choose a resume template
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Select an ATS-tested resume template. Generate official, high-resolution PDF resumes in real-time powered by the useResume.ai API engine.
        </p>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="card-minimal rounded-2xl overflow-hidden flex flex-col justify-between border border-zinc-200 hover:border-zinc-300 transition-all hover:shadow-md bg-white group"
          >
            {/* Template Preview Illustration Box */}
            <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex items-center justify-center relative">
              <div className="w-48 h-56 bg-white rounded-lg border border-zinc-200 shadow-2xs p-3 space-y-2.5 transform group-hover:scale-[1.02] transition-transform">
                
                {/* Header skeleton */}
                <div className="space-y-1 border-b border-zinc-100 pb-2">
                  <div className="w-24 h-2.5 bg-zinc-800 rounded-xs" />
                  <div className="w-16 h-1.5 bg-[#2563EB] rounded-xs" />
                  <div className="flex gap-1 pt-0.5">
                    <div className="w-10 h-1 bg-zinc-200 rounded-xs" />
                    <div className="w-12 h-1 bg-zinc-200 rounded-xs" />
                  </div>
                </div>

                {/* Summary skeleton */}
                <div className="space-y-1">
                  <div className="w-14 h-1.5 bg-zinc-700 rounded-xs" />
                  <div className="w-full h-1 bg-zinc-200 rounded-xs" />
                  <div className="w-5/6 h-1 bg-zinc-200 rounded-xs" />
                </div>

                {/* Experience skeleton */}
                <div className="space-y-1 pt-1">
                  <div className="w-16 h-1.5 bg-zinc-700 rounded-xs" />
                  <div className="space-y-0.5">
                    <div className="w-20 h-1 bg-zinc-300 rounded-xs" />
                    <div className="w-full h-1 bg-zinc-100 rounded-xs" />
                    <div className="w-11/12 h-1 bg-zinc-100 rounded-xs" />
                  </div>
                </div>

                {/* Skills skeleton */}
                <div className="space-y-1 pt-1">
                  <div className="w-12 h-1.5 bg-zinc-700 rounded-xs" />
                  <div className="flex flex-wrap gap-1">
                    <div className="w-7 h-1.5 bg-blue-50 border border-blue-100 rounded-xs" />
                    <div className="w-8 h-1.5 bg-zinc-100 rounded-xs" />
                    <div className="w-6 h-1.5 bg-zinc-100 rounded-xs" />
                  </div>
                </div>

              </div>

              <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-white/90 border border-zinc-200 text-zinc-600 font-semibold shadow-2xs">
                api: {tmpl.apiTemplateId}
              </span>
            </div>

            {/* Details & Actions */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium">
                    {tmpl.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 group-hover:text-[#2563EB] transition-colors">
                  {tmpl.name}
                </h3>

                <p className="text-zinc-600 text-xs leading-relaxed">
                  {tmpl.description}
                </p>

                <ul className="space-y-1 pt-1">
                  {tmpl.highlights.map((h, i) => (
                    <li key={i} className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => openGeneratorModal(tmpl)}
                className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate PDF with this Template</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= MODAL: GENERATE PDF WITH USE-RESUME API ================= */}
      {activeTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveTemplate(null)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 sm:p-7 space-y-5 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveTemplate(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#2563EB] font-semibold mb-1">
                <Sparkles className="w-4 h-4" />
                <span>useResume.ai PDF Generation Engine</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900">
                Generate "{activeTemplate.name}" Resume
              </h2>
              <p className="text-xs text-zinc-500">
                Template API Identifier: <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-800 font-mono">{activeTemplate.apiTemplateId}</code>
              </p>
            </div>

            {/* If PDF was generated successfully */}
            {generatedPdfUrl ? (
              <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">
                      PDF Document Generated Successfully!
                    </h4>
                    <p className="text-xs text-emerald-800">
                      {fileSize ? `${(fileSize / 1024).toFixed(1)} KB • ` : ''}
                      Official useResume.ai cloud PDF
                      {creditsLeft !== null ? ` (${creditsLeft} API credits left)` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <a
                    href={generatedPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>

                  <a
                    href={generatedPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 text-zinc-500" />
                    <span>View in Browser</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                  <span>Want to test ATS match against a job posting?</span>
                  <button
                    type="button"
                    onClick={handleTestInAnalyzer}
                    className="font-semibold underline hover:text-emerald-950 cursor-pointer"
                  >
                    Go to Analyzer →
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleGeneratePdf} className="space-y-4">
                
                {/* Accent Color Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Accent Color</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {ACCENT_COLORS.map((col) => (
                      <button
                        key={col.value}
                        type="button"
                        onClick={() => setSelectedColor(col.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                          selectedColor === col.value
                            ? 'border-zinc-900 bg-zinc-50 text-zinc-900 font-semibold'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Candidate Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-800 block">Candidate Name</label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Target Role */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-800 block">Target Role / Title</label>
                  <input
                    type="text"
                    required
                    value={candidateRole}
                    onChange={(e) => setCandidateRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-800 block">Skills (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={candidateSkills}
                    onChange={(e) => setCandidateSkills(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-800 block">Professional Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={candidateSummary}
                    onChange={(e) => setCandidateSummary(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                {/* Error Message */}
                {generationError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{generationError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Generating PDF via useResume.ai...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-blue-200" />
                      <span>Generate Live PDF Resume</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-400 text-center">
                  Calls <code className="text-zinc-600">POST https://useresume.ai/api/v3/resume/create</code> with your API token
                </p>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
