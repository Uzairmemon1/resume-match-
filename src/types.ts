export type MatchTier = 
  | 'Strong Match' 
  | 'Good Match' 
  | 'Moderate Match' 
  | 'Weak Match' 
  | 'Poor Match' 
  | 'No Score';

export type MatchStatus = 'exact' | 'synonym' | 'partial' | 'missing';

export type RequirementSection = 'required' | 'preferred' | 'responsibilities' | 'general';

export type ResumeSection = 'Experience' | 'Skills' | 'Summary' | 'Education' | 'Certifications' | 'General';

export type KeywordCategory = 
  | 'Programming' 
  | 'Frameworks & Tools' 
  | 'Data & Analytics' 
  | 'Soft Skills' 
  | 'Business & Management';

export interface KeywordMatchDetail {
  keyword: string;
  category: KeywordCategory;
  sourceSection: RequirementSection;
  status: MatchStatus;
  matchedWith?: string; // the variation/synonym term found in resume
  resumeSection?: ResumeSection; // which section of resume it was found in
  inExperience: boolean;
}

export interface MatchBreakdown {
  requiredScore: number;
  requiredMatched: number;
  requiredTotal: number;
  preferredScore: number;
  preferredMatched: number;
  preferredTotal: number;
  softSkillsScore: number;
  softSkillsMatched: number;
  softSkillsTotal: number;
  experienceBoostApplied: boolean;
}

export interface Analysis {
  id: string;
  date: string;
  resumePreview: string;
  fullResumeText: string;
  fullJDText: string;
  score: number | null;
  tier?: MatchTier;
  matchedKeywords: string[];
  missingKeywords: string[];
  partialKeywords?: string[];
  detailedMatches?: KeywordMatchDetail[];
  breakdown?: MatchBreakdown;
}
