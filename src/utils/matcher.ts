export type KeywordCategory = 
  | 'Programming' 
  | 'Frameworks & Tools' 
  | 'Data & Analytics' 
  | 'Soft Skills' 
  | 'Business & Management';

export interface KeywordDefinition {
  name: string;
  category: KeywordCategory;
}

export const ALL_KEYWORDS: KeywordDefinition[] = [
  // Programming
  { name: 'python', category: 'Programming' },
  { name: 'java', category: 'Programming' },
  { name: 'javascript', category: 'Programming' },
  { name: 'typescript', category: 'Programming' },
  { name: 'c++', category: 'Programming' },
  { name: 'c#', category: 'Programming' },
  { name: 'sql', category: 'Programming' },
  { name: 'html', category: 'Programming' },
  { name: 'css', category: 'Programming' },
  { name: 'php', category: 'Programming' },
  { name: 'ruby', category: 'Programming' },
  { name: 'go', category: 'Programming' },
  { name: 'swift', category: 'Programming' },
  { name: 'kotlin', category: 'Programming' },
  { name: 'r', category: 'Programming' },
  { name: 'matlab', category: 'Programming' },
  { name: 'bash', category: 'Programming' },
  { name: 'rust', category: 'Programming' },
  { name: 'scala', category: 'Programming' },
  { name: 'dart', category: 'Programming' },

  // Frameworks & Tools
  { name: 'react', category: 'Frameworks & Tools' },
  { name: 'angular', category: 'Frameworks & Tools' },
  { name: 'vue', category: 'Frameworks & Tools' },
  { name: 'node.js', category: 'Frameworks & Tools' },
  { name: 'django', category: 'Frameworks & Tools' },
  { name: 'flask', category: 'Frameworks & Tools' },
  { name: 'spring', category: 'Frameworks & Tools' },
  { name: 'express', category: 'Frameworks & Tools' },
  { name: 'git', category: 'Frameworks & Tools' },
  { name: 'docker', category: 'Frameworks & Tools' },
  { name: 'kubernetes', category: 'Frameworks & Tools' },
  { name: 'aws', category: 'Frameworks & Tools' },
  { name: 'azure', category: 'Frameworks & Tools' },
  { name: 'gcp', category: 'Frameworks & Tools' },
  { name: 'jenkins', category: 'Frameworks & Tools' },
  { name: 'next.js', category: 'Frameworks & Tools' },
  { name: 'tailwind', category: 'Frameworks & Tools' },
  { name: 'redux', category: 'Frameworks & Tools' },
  { name: 'graphql', category: 'Frameworks & Tools' },
  { name: 'rest api', category: 'Frameworks & Tools' },
  { name: 'ci/cd', category: 'Frameworks & Tools' },
  { name: 'terraform', category: 'Frameworks & Tools' },
  { name: 'linux', category: 'Frameworks & Tools' },
  { name: 'webpack', category: 'Frameworks & Tools' },
  { name: 'vite', category: 'Frameworks & Tools' },

  // Data & Analytics
  { name: 'excel', category: 'Data & Analytics' },
  { name: 'tableau', category: 'Data & Analytics' },
  { name: 'power bi', category: 'Data & Analytics' },
  { name: 'pandas', category: 'Data & Analytics' },
  { name: 'numpy', category: 'Data & Analytics' },
  { name: 'machine learning', category: 'Data & Analytics' },
  { name: 'data analysis', category: 'Data & Analytics' },
  { name: 'mongodb', category: 'Data & Analytics' },
  { name: 'mysql', category: 'Data & Analytics' },
  { name: 'postgresql', category: 'Data & Analytics' },
  { name: 'redis', category: 'Data & Analytics' },
  { name: 'elasticsearch', category: 'Data & Analytics' },
  { name: 'spark', category: 'Data & Analytics' },
  { name: 'hadoop', category: 'Data & Analytics' },
  { name: 'scikit-learn', category: 'Data & Analytics' },
  { name: 'tensorflow', category: 'Data & Analytics' },
  { name: 'pytorch', category: 'Data & Analytics' },
  { name: 'data visualization', category: 'Data & Analytics' },
  { name: 'statistics', category: 'Data & Analytics' },
  { name: 'big data', category: 'Data & Analytics' },

  // Soft Skills
  { name: 'communication', category: 'Soft Skills' },
  { name: 'leadership', category: 'Soft Skills' },
  { name: 'teamwork', category: 'Soft Skills' },
  { name: 'problem solving', category: 'Soft Skills' },
  { name: 'project management', category: 'Soft Skills' },
  { name: 'time management', category: 'Soft Skills' },
  { name: 'critical thinking', category: 'Soft Skills' },
  { name: 'collaboration', category: 'Soft Skills' },
  { name: 'adaptability', category: 'Soft Skills' },
  { name: 'creativity', category: 'Soft Skills' },
  { name: 'mentorship', category: 'Soft Skills' },
  { name: 'conflict resolution', category: 'Soft Skills' },
  { name: 'emotional intelligence', category: 'Soft Skills' },
  { name: 'presentation skills', category: 'Soft Skills' },

  // Business Skills
  { name: 'marketing', category: 'Business & Management' },
  { name: 'sales', category: 'Business & Management' },
  { name: 'seo', category: 'Business & Management' },
  { name: 'digital marketing', category: 'Business & Management' },
  { name: 'content writing', category: 'Business & Management' },
  { name: 'social media', category: 'Business & Management' },
  { name: 'customer service', category: 'Business & Management' },
  { name: 'negotiation', category: 'Business & Management' },
  { name: 'agile', category: 'Business & Management' },
  { name: 'scrum', category: 'Business & Management' },
  { name: 'budgeting', category: 'Business & Management' },
  { name: 'strategic planning', category: 'Business & Management' },
  { name: 'product management', category: 'Business & Management' },
  { name: 'market research', category: 'Business & Management' },
  { name: 'business analysis', category: 'Business & Management' },
  { name: 'risk management', category: 'Business & Management' },
  { name: 'stakeholder management', category: 'Business & Management' }
];

export interface MatchResult {
  score: number | null;
  matchedKeywords: string[];
  missingKeywords: string[];
}

/**
  Checks if a normalized text contains the target keyword as a discrete term
 */
function textContainsKeyword(normalizedText: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#.\\-])${escaped}(?:$|[^a-zA-Z0-9_+#.\\-])`, 'i');
  return regex.test(normalizedText);
}

/**
  Matches a resume text against a job description text and calculates ATS score
 */
export function analyzeMatch(resumeText: string, jdText: string): MatchResult {
  const lowerResume = resumeText.toLowerCase();
  const lowerJd = jdText.toLowerCase();

  // Find all predefined keywords present in the Job Description
  const jdKeywords: string[] = [];
  
  for (const kw of ALL_KEYWORDS) {
    if (textContainsKeyword(lowerJd, kw.name)) {
      jdKeywords.push(kw.name);
    }
  }

  // If no keywords detected in JD text, return score: null
  if (jdKeywords.length === 0) {
    return {
      score: null,
      matchedKeywords: [],
      missingKeywords: []
    };
  }

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const keyword of jdKeywords) {
    if (textContainsKeyword(lowerResume, keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  const score = Math.round((matchedKeywords.length / jdKeywords.length) * 100);

  return {
    score,
    matchedKeywords,
    missingKeywords
  };
}

/**
  Helper to retrieve category for a keyword
 */
export function getKeywordCategory(keywordName: string): KeywordCategory {
  const found = ALL_KEYWORDS.find(k => k.name.toLowerCase() === keywordName.toLowerCase());
  return found ? found.category : 'Frameworks & Tools';
}
