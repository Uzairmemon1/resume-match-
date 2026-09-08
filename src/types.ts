export interface Analysis {
  id: string;
  date: string;
  resumePreview: string;
  fullResumeText: string;
  fullJDText: string;
  score: number | null;
  matchedKeywords: string[];
  missingKeywords: string[];
}
