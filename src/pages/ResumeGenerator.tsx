import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wand2, 
  Download, 
  FileText, 
  Check, 
  ArrowRight, 
  User, 
  Briefcase, 
  Calendar, 
  Code, 
  AlignLeft, 
  Sparkles, 
  ExternalLink, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { generatePdfResume, type UseResumeContent } from '../utils/useResumeApi';

export const ResumeGenerator: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('Alex Rivera');
  const [jobTitle, setJobTitle] = useState('Senior Full Stack Engineer');
  const [years, setYears] = useState<number>(5);
  const [skills, setSkills] = useState('TypeScript, React, Node.js, Python, PostgreSQL, AWS, Docker, CI/CD, Agile');
  const [summary, setSummary] = useState(
    'Passionate engineer dedicated to building scalable web applications, optimizing API performance, and mentoring cross-functional agile teams.'
  );

  const [selectedTemplate, setSelectedTemplate] = useState('clean');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleGenerateText = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingText(true);

    setTimeout(() => {
      const skillList = skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const formatted = `${name.toUpperCase()}
${jobTitle} | ${years}+ Years of Experience
Email: ${name.toLowerCase().replace(/\s+/g, '.')}@example.com | Portfolio: https://github.com/${name.toLowerCase().replace(/\s+/g, '')}

==================================================
PROFESSIONAL SUMMARY
==================================================
${summary}

==================================================
CORE TECHNICAL SKILLS
==================================================
${skillList.map((sk) => `• ${sk}`).join('\n')}

==================================================
PROFESSIONAL WORK EXPERIENCE
==================================================
${jobTitle} | Enterprise Cloud Solutions
2022 - Present (Current Role)
• Engineered and delivered high-traffic web features utilizing ${skillList.slice(0, 3).join(', ')}.
• Spearheaded architecture scaling initiatives, accelerating page performance by 40% and decreasing latency.
• Collaborated in cross-functional Agile sprints, orchestrating daily standups and code reviews.
• Integrated robust CI/CD automation pipelines ensuring zero-downtime deployment workflows.

Software Engineer | High-Growth Tech Ventures
2019 - 2022
• Designed and maintained microservices using ${skillList.slice(2, 5).join(' and ')}.
• Partnered closely with product managers and stakeholders to translate user stories into reliable services.
• Enhanced unit test coverage to 92%, mitigating production regressions and downtime.

==================================================
EDUCATION & CREDENTIALS
==================================================
B.S. in Computer Science / Information Systems
Accredited University • Magna Cum Laude Honors
Certifications: AWS Certified Solutions Architect • Professional Scrum Master`;

      setGeneratedResume(formatted);
      setIsGeneratingText(false);
    }, 500);
  };

  const handleGeneratePdfLive = async () => {
    setIsGeneratingPdf(true);
    setPdfError(null);

    const skillList = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const content: UseResumeContent = {
      name,
      role: jobTitle,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      summary,
      skills: skillList,
    };

    const res = await generatePdfResume(content, {
      template: selectedTemplate,
      template_color: 'blue',
      page_format: 'a4',
    });

    setIsGeneratingPdf(false);

    if (res.success && res.fileUrl) {
      setGeneratedPdfUrl(res.fileUrl);
    } else {
      setPdfError(res.error || 'Unable to generate PDF via useResume.ai API.');
    }
  };

  const handleDownloadTxt = () => {
    if (!generatedResume) return;
    const blob = new Blob([generatedResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-4">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-100 text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>AI Resume Builder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
          AI Resume Generator
        </h1>
        <p className="text-zinc-600 text-sm leading-relaxed">
          Provide your core skills and career highlights to generate an ATS-formatted resume. Download plain text or generate a polished PDF with the useResume.ai API.
        </p>
      </div>

      {/* Grid: Inputs Form & Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-5 card-minimal rounded-2xl p-6 border border-zinc-200 bg-white space-y-5 shadow-xs">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="font-bold text-zinc-900 text-base">Candidate Details</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Customize fields to structure your document</p>
          </div>

          <form onSubmit={handleGenerateText} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-600" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Target Job Title */}
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
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Template Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center justify-between">
                <span>PDF Template Style</span>
                <span className="text-[10px] text-zinc-400 font-normal">useResume API</span>
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              >
                <option value="clean">Clean Minimal (General ATS)</option>
                <option value="apex">Apex (Software & Cloud)</option>
                <option value="executive">Executive (Leadership)</option>
                <option value="harvard">Harvard (Classic Academic)</option>
                <option value="cascade">Cascade (Product & Design)</option>
                <option value="zenith">Zenith (Data Science)</option>
              </select>
            </div>

            {/* Years of Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                <span>Years of Experience</span>
              </label>
              <input
                type="number"
                min="0"
                max="40"
                required
                value={years}
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Key Skills */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-zinc-600" />
                <span>Key Skills (comma separated)</span>
              </label>
              <input
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, TypeScript, Node.js, SQL, AWS"
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                <AlignLeft className="w-3.5 h-3.5 text-zinc-600" />
                <span>Summary of Experience</span>
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Highlight your strongest technical strengths and accomplishments..."
                className="w-full p-2.5 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isGeneratingText}
                className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isGeneratingText ? 'Generating Text...' : 'Format Plain Text Resume'}</span>
              </button>

              <button
                type="button"
                onClick={handleGeneratePdfLive}
                disabled={isGeneratingPdf}
                className="w-full py-2.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Rendering PDF via useResume API...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Generate Official PDF (useResume.ai)</span>
                  </>
                )}
              </button>
            </div>

            {pdfError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{pdfError}</span>
              </div>
            )}
          </form>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* If PDF has been generated via API */}
          {generatedPdfUrl && (
            <div className="card-minimal rounded-2xl p-5 border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-950 text-sm">Official PDF Ready!</h3>
                    <p className="text-[11px] text-emerald-800">Generated with template: <strong>{selectedTemplate}</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={generatedPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <a
                    href={generatedPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 font-semibold text-xs rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Plain text preview */}
          {generatedResume ? (
            <div className="card-minimal rounded-2xl p-6 border border-zinc-200 bg-white space-y-4 shadow-xs animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">Plain Text ATS Format</h3>
                    <p className="text-zinc-500 text-xs">Formatted for raw text input</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/analyze')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-[#2563EB] hover:bg-blue-100 border border-blue-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Test in Analyzer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 font-mono text-[11px] text-zinc-800 whitespace-pre-wrap max-h-[480px] overflow-y-auto leading-relaxed shadow-inner">
                {generatedResume}
              </div>

            </div>
          ) : (
            !generatedPdfUrl && (
              <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 text-zinc-400 flex items-center justify-center mx-auto shadow-2xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-zinc-800 text-sm">Preview Will Appear Here</h3>
                  <p className="text-zinc-500 text-xs max-w-sm mx-auto">
                    Fill in your details and click either "Format Plain Text Resume" or "Generate Official PDF" to see your resume preview.
                  </p>
                </div>
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
};
