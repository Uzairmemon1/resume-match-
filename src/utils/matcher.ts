import type {
  KeywordCategory,
  KeywordMatchDetail,
  MatchBreakdown,
  MatchStatus,
  MatchTier,
  RequirementSection,
  ResumeSection,
} from '../types';

export interface KeywordDefinition {
  name: string;
  category: KeywordCategory;
  synonyms?: string[];
}

/**
 * Built-in dictionary of tech, business, data, and soft skills with common synonyms
 */
export const COMPREHENSIVE_SKILLS: KeywordDefinition[] = [
  // Programming Languages
  { name: 'python', category: 'Programming', synonyms: ['py', 'python3', 'python2'] },
  { name: 'javascript', category: 'Programming', synonyms: ['js', 'es6', 'ecmascript', 'vanilla js'] },
  { name: 'typescript', category: 'Programming', synonyms: ['ts'] },
  { name: 'java', category: 'Programming', synonyms: ['core java', 'j2ee', 'jvm'] },
  { name: 'c++', category: 'Programming', synonyms: ['cpp', 'c plus plus'] },
  { name: 'c#', category: 'Programming', synonyms: ['csharp', 'c sharp', '.net', 'dotnet'] },
  { name: 'sql', category: 'Programming', synonyms: ['structured query language', 't-sql', 'pl/sql'] },
  { name: 'html', category: 'Programming', synonyms: ['html5', 'markup'] },
  { name: 'css', category: 'Programming', synonyms: ['css3', 'styles', 'stylesheet'] },
  { name: 'php', category: 'Programming', synonyms: ['lamp'] },
  { name: 'ruby', category: 'Programming', synonyms: ['ruby on rails', 'rails'] },
  { name: 'go', category: 'Programming', synonyms: ['golang'] },
  { name: 'rust', category: 'Programming', synonyms: ['rustlang'] },
  { name: 'swift', category: 'Programming', synonyms: ['ios swift'] },
  { name: 'kotlin', category: 'Programming', synonyms: ['android kotlin'] },
  { name: 'r', category: 'Programming', synonyms: ['r programming', 'r-project'] },
  { name: 'matlab', category: 'Programming', synonyms: ['simulink'] },
  { name: 'bash', category: 'Programming', synonyms: ['shell script', 'sh', 'zsh', 'terminal'] },
  { name: 'scala', category: 'Programming', synonyms: [] },
  { name: 'dart', category: 'Programming', synonyms: ['flutter dart'] },

  // Frameworks & Web Tools
  { name: 'react', category: 'Frameworks & Tools', synonyms: ['react.js', 'reactjs', 'react native'] },
  { name: 'angular', category: 'Frameworks & Tools', synonyms: ['angular.js', 'angularjs', 'angular 2+'] },
  { name: 'vue', category: 'Frameworks & Tools', synonyms: ['vue.js', 'vuejs', 'nuxt'] },
  { name: 'node.js', category: 'Frameworks & Tools', synonyms: ['node', 'nodejs', 'server-side javascript'] },
  { name: 'next.js', category: 'Frameworks & Tools', synonyms: ['nextjs', 'next'] },
  { name: 'express', category: 'Frameworks & Tools', synonyms: ['express.js', 'expressjs'] },
  { name: 'django', category: 'Frameworks & Tools', synonyms: ['django rest framework', 'drf'] },
  { name: 'flask', category: 'Frameworks & Tools', synonyms: ['python flask'] },
  { name: 'fastapi', category: 'Frameworks & Tools', synonyms: ['fast api'] },
  { name: 'spring', category: 'Frameworks & Tools', synonyms: ['spring boot', 'spring framework'] },
  { name: 'asp.net', category: 'Frameworks & Tools', synonyms: ['asp.net core', '.net core'] },
  { name: 'tailwind', category: 'Frameworks & Tools', synonyms: ['tailwind css', 'tailwindcss'] },
  { name: 'bootstrap', category: 'Frameworks & Tools', synonyms: ['twitter bootstrap'] },
  { name: 'redux', category: 'Frameworks & Tools', synonyms: ['redux toolkit', 'rtk', 'state management'] },
  { name: 'graphql', category: 'Frameworks & Tools', synonyms: ['apollo', 'graphql api'] },
  { name: 'rest api', category: 'Frameworks & Tools', synonyms: ['restful', 'rest', 'restful api', 'web api', 'apis'] },
  { name: 'microservices', category: 'Frameworks & Tools', synonyms: ['microservice', 'micro-services', 'distributed systems'] },
  { name: 'webpack', category: 'Frameworks & Tools', synonyms: ['bundler'] },
  { name: 'vite', category: 'Frameworks & Tools', synonyms: [] },
  { name: 'jest', category: 'Frameworks & Tools', synonyms: ['unit testing', 'test driven development', 'tdd'] },
  { name: 'cypress', category: 'Frameworks & Tools', synonyms: ['e2e testing', 'end to end'] },

  // Cloud & DevOps
  { name: 'aws', category: 'Frameworks & Tools', synonyms: ['amazon web services', 'aws cloud', 'ec2', 's3', 'lambda'] },
  { name: 'azure', category: 'Frameworks & Tools', synonyms: ['microsoft azure', 'azure cloud', 'azure devops'] },
  { name: 'gcp', category: 'Frameworks & Tools', synonyms: ['google cloud', 'google cloud platform'] },
  { name: 'docker', category: 'Frameworks & Tools', synonyms: ['container', 'containers', 'containerization', 'dockerfile'] },
  { name: 'kubernetes', category: 'Frameworks & Tools', synonyms: ['k8s', 'kubectl', 'helm'] },
  { name: 'ci/cd', category: 'Frameworks & Tools', synonyms: ['continuous integration', 'continuous deployment', 'cicd', 'pipeline', 'pipelines'] },
  { name: 'jenkins', category: 'Frameworks & Tools', synonyms: ['jenkins pipeline'] },
  { name: 'github actions', category: 'Frameworks & Tools', synonyms: ['gh actions', 'workflow'] },
  { name: 'terraform', category: 'Frameworks & Tools', synonyms: ['iac', 'infrastructure as code'] },
  { name: 'linux', category: 'Frameworks & Tools', synonyms: ['ubuntu', 'centos', 'debian', 'redhat', 'unix'] },
  { name: 'git', category: 'Frameworks & Tools', synonyms: ['version control', 'github', 'gitlab', 'bitbucket'] },

  // Databases & Analytics
  { name: 'postgresql', category: 'Data & Analytics', synonyms: ['postgres', 'psql'] },
  { name: 'mysql', category: 'Data & Analytics', synonyms: ['mariadb'] },
  { name: 'mongodb', category: 'Data & Analytics', synonyms: ['mongo', 'nosql'] },
  { name: 'redis', category: 'Data & Analytics', synonyms: ['in-memory cache', 'caching'] },
  { name: 'elasticsearch', category: 'Data & Analytics', synonyms: ['elastic search', 'elk', 'opensearch'] },
  { name: 'pandas', category: 'Data & Analytics', synonyms: ['python pandas', 'dataframe'] },
  { name: 'numpy', category: 'Data & Analytics', synonyms: ['numerical python'] },
  { name: 'excel', category: 'Data & Analytics', synonyms: ['ms excel', 'microsoft excel', 'spreadsheets', 'vlookup', 'pivot tables'] },
  { name: 'tableau', category: 'Data & Analytics', synonyms: ['tableau desktop', 'tableau server'] },
  { name: 'power bi', category: 'Data & Analytics', synonyms: ['powerbi', 'dax'] },
  { name: 'machine learning', category: 'Data & Analytics', synonyms: ['ml', 'artificial intelligence', 'ai', 'deep learning'] },
  { name: 'scikit-learn', category: 'Data & Analytics', synonyms: ['sklearn'] },
  { name: 'tensorflow', category: 'Data & Analytics', synonyms: ['tf', 'keras'] },
  { name: 'pytorch', category: 'Data & Analytics', synonyms: ['torch'] },
  { name: 'data analysis', category: 'Data & Analytics', synonyms: ['data analytics', 'data analyst', 'business intelligence', 'bi'] },
  { name: 'data visualization', category: 'Data & Analytics', synonyms: ['dataviz', 'dashboarding', 'dashboards'] },
  { name: 'big data', category: 'Data & Analytics', synonyms: ['spark', 'hadoop', 'pyspark', 'data engineering', 'etl'] },
  { name: 'statistics', category: 'Data & Analytics', synonyms: ['statistical analysis', 'probability', 'hypothesis testing'] },
  { name: 'kafka', category: 'Data & Analytics', synonyms: ['apache kafka', 'event streaming'] },
  { name: 'snowflake', category: 'Data & Analytics', synonyms: ['cloud data warehouse'] },

  // Soft Skills & Methodologies
  { name: 'communication', category: 'Soft Skills', synonyms: ['communication skills', 'communicated', 'written communication', 'verbal communication', 'presenting', 'interpersonal skills'] },
  { name: 'collaboration', category: 'Soft Skills', synonyms: ['collaborated', 'cross-functional', 'collaborative', 'partnering', 'working with teams'] },
  { name: 'teamwork', category: 'Soft Skills', synonyms: ['team player', 'team work', 'team member'] },
  { name: 'leadership', category: 'Soft Skills', synonyms: ['mentorship', 'mentoring', 'spearheaded', 'guided', 'led', 'team lead', 'managing teams'] },
  { name: 'problem solving', category: 'Soft Skills', synonyms: ['problem-solving', 'analytical thinking', 'troubleshooting', 'critical thinking', 'debugging'] },
  { name: 'project management', category: 'Soft Skills', synonyms: ['project coordination', 'program management', 'pm', 'coordinating projects', 'coordination'] },
  { name: 'time management', category: 'Soft Skills', synonyms: ['prioritization', 'multitasking', 'deadline-driven', 'organizational skills'] },
  { name: 'adaptability', category: 'Soft Skills', synonyms: ['flexible', 'fast learner', 'dynamic environment', 'agile mindset'] },
  { name: 'creativity', category: 'Soft Skills', synonyms: ['innovative', 'creative thinking', 'innovation'] },
  { name: 'conflict resolution', category: 'Soft Skills', synonyms: ['negotiation', 'mediation'] },
  { name: 'presentation skills', category: 'Soft Skills', synonyms: ['public speaking', 'demos', 'pitching'] },

  // Business & Project Management
  { name: 'agile', category: 'Business & Management', synonyms: ['scrum', 'kanban', 'sprints', 'sprint planning', 'standups'] },
  { name: 'scrum', category: 'Business & Management', synonyms: ['scrum master', 'daily standup'] },
  { name: 'product management', category: 'Business & Management', synonyms: ['product manager', 'roadmapping', 'user stories'] },
  { name: 'business analysis', category: 'Business & Management', synonyms: ['business analyst', 'requirements gathering'] },
  { name: 'stakeholder management', category: 'Business & Management', synonyms: ['stakeholders', 'client facing', 'client communication'] },
  { name: 'marketing', category: 'Business & Management', synonyms: ['digital marketing', 'growth marketing', 'campaigns'] },
  { name: 'sales', category: 'Business & Management', synonyms: ['b2b sales', 'business development', 'closing deals'] },
  { name: 'seo', category: 'Business & Management', synonyms: ['search engine optimization', 'sem', 'organic traffic'] },
  { name: 'content writing', category: 'Business & Management', synonyms: ['copywriting', 'content strategy'] },
  { name: 'customer service', category: 'Business & Management', synonyms: ['customer support', 'client support', 'client satisfaction'] },
  { name: 'microsoft office', category: 'Business & Management', synonyms: ['ms office', 'office suite', 'word', 'powerpoint', 'office 365'] },
];

/**
 * Common English and recruitment fluff/stopwords to discard from dynamic extraction
 */
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost', 'along', 'also',
  'am', 'an', 'and', 'any', 'applicant', 'applicants', 'application', 'apply', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'candidate', 'candidates',
  'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'employer', 'environment',
  'experience', 'experiences', 'experienced', 'fast-paced', 'for', 'from', 'further', 'had', 'has',
  'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'ideal',
  'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'job', 'join', 'just', 'knowledge', 'level',
  'looking', 'more', 'most', 'must', 'my', 'myself', 'need', 'needs', 'new', 'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'opportunity', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
  'out', 'over', 'own', 'position', 'plus', 'preferred', 'qualification', 'qualifications', 'relevant',
  'required', 'requirements', 'responsibility', 'responsibilities', 'role', 'same', 'should', 'skill',
  'skills', 'so', 'some', 'strong', 'such', 'team', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under',
  'until', 'up', 'us', 'use', 'using', 'very', 'was', 'we', 'well', 'were', 'what', 'when', 'where',
  'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'work', 'working', 'world', 'would', 'year',
  'years', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

/**
 * Lightweight rule-based morphological stemmer (Porter-inspired suffix normalizer).
 * Handles common variations:
 * - "coordinating" -> "coordinat", "coordinate" -> "coordinat", "coordination" -> "coordinat", "coordinator" -> "coordinat"
 * - "communicated" -> "communicat", "communicating" -> "communicat", "communication" -> "communicat"
 * - "management" -> "manag", "managing" -> "manag", "manager" -> "manag"
 * - "development" -> "develop", "developing" -> "develop", "developer" -> "develop"
 */
export function stemWord(rawWord: string): string {
  let word = rawWord.toLowerCase().trim();
  if (word.length <= 3) return word;

  // Preserve tech keywords with critical extensions or symbols
  if (['c++', 'c#', '.net', 'node.js', 'next.js', 'vue.js', 'ci/cd', 'r'].includes(word)) {
    return word;
  }

  // Remove common punctuation at boundaries
  word = word.replace(/^[^\w+#.]+|[^\w+#.]+$/g, '');

  // Suffix rules (applied sequentially from longest to shortest)
  const suffixes: [RegExp, string][] = [
    [/ational$/, 'ate'],
    [/ization$/, 'ize'],
    [/iveness$/, 'ive'],
    [/fulness$/, 'ful'],
    [/ousness$/, 'ous'],
    [/bilities$/, 'ble'],
    [/tional$/, 'tion'],
    [/alism$/, 'al'],
    [/ation$/, 'at'],
    [/ator$/, 'at'],
    [/ators$/, 'at'],
    [/ership$/, 'er'],
    [/ments$/, 'ment'],
    [/ment$/, ''],
    [/ities$/, 'ity'],
    [/ously$/, 'ous'],
    [/fully$/, 'ful'],
    [/ingly$/, ''],
    [/ating$/, 'at'],
    [/ates$/, 'at'],
    [/ated$/, 'at'],
    [/tions$/, 't'],
    [/tion$/, 't'],
    [/sion$/, 's'],
    [/ling$/, 'l'],
    [/ying$/, 'y'],
    [/ing$/, ''],
    [/ies$/, 'y'],
    [/ied$/, 'y'],
    [/ered$/, 'er'],
    [/ers$/, 'er'],
    [/or$/, ''],
    [/ors$/, ''],
    [/er$/, ''],
    [/ed$/, ''],
    [/es$/, ''],
    [/s$/, ''],
  ];

  for (const [pattern, replacement] of suffixes) {
    if (pattern.test(word) && word.length - 3 > replacement.length) {
      word = word.replace(pattern, replacement);
      break;
    }
  }

  // Common root consolidations
  if (word.startsWith('coordin')) return 'coordinat';
  if (word.startsWith('communic')) return 'communicat';
  if (word.startsWith('collabor')) return 'collaborat';
  if (word.startsWith('manag')) return 'manag';
  if (word.startsWith('develop')) return 'develop';
  if (word.startsWith('analy')) return 'analy';
  if (word.startsWith('lead')) return 'lead';

  return word;
}

/**
 * Normalizes a phrase by stemming individual tokens and joining them
 */
export function stemPhrase(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[^\w\s+#.-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(stemWord)
    .join(' ');
}

/**
 * Strips punctuation and extra whitespace for fuzzy comparison
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9+#.\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Parses resume text into discrete standard sections
 */
export function parseResumeSections(resumeText: string): Record<ResumeSection, string> {
  const sections: Record<ResumeSection, string> = {
    Summary: '',
    Skills: '',
    Experience: '',
    Education: '',
    Certifications: '',
    General: '',
  };

  const lines = resumeText.split(/\r?\n/);
  let currentSection: ResumeSection = 'General';

  const sectionHeaders: { section: ResumeSection; pattern: RegExp }[] = [
    {
      section: 'Summary',
      pattern: /^(summary|professional\s+summary|profile|about\s+me|career\s+objective|objective)\b/i,
    },
    {
      section: 'Skills',
      pattern: /^(technical\s+skills|core\s+competencies|technologies|skills\s*(?:&|and)?\s*tools|skills|key\s+skills|toolbox|areas\s+of\s+expertise)\b/i,
    },
    {
      section: 'Experience',
      pattern: /^(work\s+experience|professional\s+experience|experience|employment\s+history|work\s+history|projects|relevant\s+experience)\b/i,
    },
    {
      section: 'Education',
      pattern: /^(education|academic\s+background|academic\s+history|degrees|qualifications)\b/i,
    },
    {
      section: 'Certifications',
      pattern: /^(certifications|licenses|courses|credentials|awards|honors)\b/i,
    },
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const matchedHeader = sectionHeaders.find(h => h.pattern.test(trimmed));
    if (matchedHeader && trimmed.length < 50) {
      currentSection = matchedHeader.section;
      continue;
    }

    sections[currentSection] += (sections[currentSection] ? '\n' : '') + trimmed;
  }

  // If experience is empty, assign general text to experience & skills for safety
  if (!sections.Experience && !sections.Skills && sections.General) {
    sections.Experience = sections.General;
  }

  return sections;
}

/**
 * Segments Job Description into Required, Preferred, and Responsibilities
 */
export function parseJobDescriptionSections(jdText: string): Record<RequirementSection, string> {
  const sections: Record<RequirementSection, string> = {
    required: '',
    preferred: '',
    responsibilities: '',
    general: '',
  };

  const lines = jdText.split(/\r?\n/);
  let currentSection: RequirementSection = 'general';

  const headerPatterns: { section: RequirementSection; pattern: RegExp }[] = [
    {
      section: 'required',
      pattern: /^(required|requirements|minimum\s+qualifications|basic\s+qualifications|must\s+have|what\s+you\s+(?:need|bring)|qualifications|key\s+requirements)\b/i,
    },
    {
      section: 'preferred',
      pattern: /^(preferred|preferred\s+qualifications|nice\s+to\s+have|desired|bonus\s+points|bonus|plus|good\s+to\s+have|additional\s+qualifications|what\s+sets\s+you\s+apart)\b/i,
    },
    {
      section: 'responsibilities',
      pattern: /^(responsibilities|key\s+responsibilities|what\s+you(?:'ll|\s+will)\s+do|duties|the\s+role|role\s+responsibilities|core\s+tasks|what\s+you\s+will\s+be\s+doing)\b/i,
    },
  ];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const matched = headerPatterns.find(h => h.pattern.test(trimmed));
    if (matched && trimmed.length < 60) {
      currentSection = matched.section;
      continue;
    }

    sections[currentSection] += (sections[currentSection] ? '\n' : '') + trimmed;
  }

  // If no sections were identified, distribute content intelligently
  if (!sections.required && !sections.preferred && !sections.responsibilities) {
    // Treat the entire text as required qualifications
    sections.required = jdText;
  }

  return sections;
}

/**
 * Dynamic keyword extraction from text
 */
export function extractKeywordsFromText(
  text: string,
  sectionType: RequirementSection
): { name: string; category: KeywordCategory; synonyms?: string[] }[] {
  const extractedMap = new Map<string, { name: string; category: KeywordCategory; synonyms?: string[] }>();

  const lower = text.toLowerCase();

  // 1. Match against our comprehensive built-in skills dictionary
  for (const skill of COMPREHENSIVE_SKILLS) {
    const skillNameLower = skill.name.toLowerCase();
    
    // Check if skill or any of its synonyms are present in the text
    let foundInText = checkStringPresence(lower, skillNameLower);
    if (!foundInText && skill.synonyms) {
      for (const syn of skill.synonyms) {
        if (checkStringPresence(lower, syn.toLowerCase())) {
          foundInText = true;
          break;
        }
      }
    }

    if (foundInText) {
      extractedMap.set(skillNameLower, skill);
    }
  }

  // 2. Dynamic extraction using grammatical patterns (e.g. "experience with [X]", "proficiency in [X]")
  const patternExtracts = [
    /(?:experience\s+with|experience\s+in|proficient\s+in|proficiency\s+in|strong\s+knowledge\s+of|familiarity\s+with|expertise\s+in|skilled\s+in|hands-on\s+with|demonstrated\s+experience\s+in)\s+([^,.;\n()]+)/gi,
    /(?:ability\s+to|responsible\s+for)\s+([^,.;\n()]+)/gi,
  ];

  for (const regex of patternExtracts) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      const candidate = match[1]?.trim();
      if (!candidate) continue;

      // Split candidate on 'and', '&', '/', or commas
      const subItems = candidate.split(/,|\band\b|&|\//i);
      for (const sub of subItems) {
        const cleanSub = sub.trim().replace(/^[-•*–]\s*/, '').toLowerCase();
        if (isValidKeywordCandidate(cleanSub)) {
          if (!extractedMap.has(cleanSub)) {
            extractedMap.set(cleanSub, {
              name: cleanSub,
              category: determineCategory(cleanSub, sectionType),
            });
          }
        }
      }
    }
  }

  // 3. Extract technical capitalized patterns and acronyms (e.g. CI/CD, AWS, ETL, API, REST, etc.)
  const acronymRegex = /\b([A-Z]{2,6}(?:\/[A-Z]{2,6})?|[A-Z][a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)+)\b/g;
  let matchAcronym: RegExpExecArray | null;
  while ((matchAcronym = acronymRegex.exec(text)) !== null) {
    const acronym = matchAcronym[1]?.toLowerCase();
    if (acronym && isValidKeywordCandidate(acronym) && !extractedMap.has(acronym)) {
      extractedMap.set(acronym, {
        name: acronym,
        category: determineCategory(acronym, sectionType),
      });
    }
  }

  return Array.from(extractedMap.values());
}

/**
 * Validates if an extracted phrase is a genuine skill/keyword rather than fluff
 */
function isValidKeywordCandidate(word: string): boolean {
  if (!word || word.length < 2 || word.length > 35) return false;
  if (STOP_WORDS.has(word)) return false;
  if (/^\d+$/.test(word)) return false; // purely numbers
  if (/^\d+\+?\s*(?:years?|yrs?|months?)/i.test(word)) return false; // "5+ years"
  
  // Exclude common generic phrases
  const genericFluff = [
    'team player', 'hard worker', 'results driven', 'fast learner', 'self-starter',
    'passionate', 'detail oriented', 'motivated', 'excellent', 'proven', 'track record',
    'daily tasks', 'other duties', 'competitive salary', 'full time', 'part time'
  ];
  if (genericFluff.includes(word)) return false;

  return true;
}

/**
 * Checks discrete presence of word in normalized text
 */
function checkStringPresence(text: string, target: string): boolean {
  if (!target || !text) return false;
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(?:^|[^a-zA-Z0-9_+#.\\-])${escaped}(?:$|[^a-zA-Z0-9_+#.\\-])`, 'i');
  return regex.test(text);
}

/**
 * Intelligent categorization fallback
 */
function determineCategory(keyword: string, section: RequirementSection): KeywordCategory {
  const lower = keyword.toLowerCase();
  
  if (section === 'responsibilities') return 'Soft Skills';

  const known = COMPREHENSIVE_SKILLS.find(k => k.name.toLowerCase() === lower);
  if (known) return known.category;

  if (/(sql|db|data|analytics|pipeline|warehouse|bi|table|spark|pandas|excel)/i.test(lower)) {
    return 'Data & Analytics';
  }
  if (/(react|vue|angular|node|spring|cloud|aws|docker|k8s|kubernetes|api|service|tool)/i.test(lower)) {
    return 'Frameworks & Tools';
  }
  if (/(communicat|collaborat|leader|manage|problem|agile|scrum|team)/i.test(lower)) {
    return 'Soft Skills';
  }
  if (/(market|sale|business|product|financ|budget|stakeholder)/i.test(lower)) {
    return 'Business & Management';
  }

  return 'Frameworks & Tools';
}

/**
 * Fuzzy and synonym matching between target keyword and resume
 */
export function matchKeywordAgainstResume(
  keyword: string,
  _category?: KeywordCategory,
  resumeSections: Record<ResumeSection, string> = { Summary: '', Skills: '', Experience: '', Education: '', Certifications: '', General: '' },
  synonyms?: string[]
): {
  status: MatchStatus;
  matchedWith?: string;
  sectionFound?: ResumeSection;
  inExperience: boolean;
} {
  const lowerKeyword = keyword.toLowerCase();
  const stemmedKeyword = stemPhrase(keyword);

  // Compile list of variations to test
  const candidateTerms = new Set<string>();
  candidateTerms.add(lowerKeyword);

  // Look up known synonyms from dictionary if not provided
  const knownEntry = COMPREHENSIVE_SKILLS.find(
    k => k.name.toLowerCase() === lowerKeyword || (k.synonyms && k.synonyms.includes(lowerKeyword))
  );

  if (synonyms) {
    synonyms.forEach(s => candidateTerms.add(s.toLowerCase()));
  }
  if (knownEntry?.synonyms) {
    knownEntry.synonyms.forEach(s => candidateTerms.add(s.toLowerCase()));
  }

  // Section priority order: Experience (applied) -> Skills -> Summary -> Certifications -> Education -> General
  const sectionsToSearch: ResumeSection[] = [
    'Experience',
    'Skills',
    'Summary',
    'Certifications',
    'Education',
    'General',
  ];

  // Pass 1: Exact Match in each section
  for (const sec of sectionsToSearch) {
    const secText = resumeSections[sec];
    if (!secText) continue;
    const lowerSec = secText.toLowerCase();

    if (checkStringPresence(lowerSec, lowerKeyword)) {
      return {
        status: 'exact',
        matchedWith: keyword,
        sectionFound: sec,
        inExperience: sec === 'Experience',
      };
    }
  }

  // Pass 2: Synonym Match
  for (const sec of sectionsToSearch) {
    const secText = resumeSections[sec];
    if (!secText) continue;
    const lowerSec = secText.toLowerCase();

    for (const syn of candidateTerms) {
      if (syn === lowerKeyword) continue;
      if (checkStringPresence(lowerSec, syn)) {
        return {
          status: 'synonym',
          matchedWith: syn,
          sectionFound: sec,
          inExperience: sec === 'Experience',
        };
      }
    }
  }

  // Pass 3: Morphological / Stemmed Match (e.g. "coordinating" ↔ "coordinate" ↔ "coordination")
  for (const sec of sectionsToSearch) {
    const secText = resumeSections[sec];
    if (!secText) continue;
    const stemmedSec = stemPhrase(secText);

    if (stemmedSec.includes(stemmedKeyword)) {
      return {
        status: 'synonym',
        matchedWith: `${keyword} (stem variation)`,
        sectionFound: sec,
        inExperience: sec === 'Experience',
      };
    }
  }

  // Pass 4: Substring / Partial Token Overlap for multi-word skills (e.g. "Microsoft Office" ↔ "Office Suite" or "MS Office")
  const tokens = lowerKeyword.split(/[\s/-]+/).filter(t => !STOP_WORDS.has(t) && t.length > 2);
  if (tokens.length > 1) {
    for (const sec of sectionsToSearch) {
      const secText = resumeSections[sec];
      if (!secText) continue;
      const lowerSec = secText.toLowerCase();

      // Check if at least 2 key tokens or dominant root matches
      const matchedTokens = tokens.filter(tok => checkStringPresence(lowerSec, tok) || lowerSec.includes(tok));
      if (matchedTokens.length >= Math.ceil(tokens.length * 0.65)) {
        return {
          status: 'partial',
          matchedWith: matchedTokens.join(' '),
          sectionFound: sec,
          inExperience: sec === 'Experience',
        };
      }
    }
  }

  // No match found
  return {
    status: 'missing',
    inExperience: false,
  };
}

/**
 * Calculates ATS tier from numeric score
 */
export function getTierFromScore(score: number | null): MatchTier {
  if (score === null) return 'No Score';
  if (score >= 80) return 'Strong Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Moderate Match';
  if (score >= 20) return 'Weak Match';
  return 'Poor Match';
}

export interface AdvancedMatchResult {
  score: number | null;
  tier: MatchTier;
  matchedKeywords: string[];
  missingKeywords: string[];
  partialKeywords: string[];
  detailedMatches: KeywordMatchDetail[];
  breakdown: MatchBreakdown;
}

/**
 * Main ATS Matching Function
 */
export function analyzeMatch(resumeText: string, jdText: string): AdvancedMatchResult {
  const cleanResume = resumeText?.trim() || '';
  const cleanJD = jdText?.trim() || '';

  // Graceful empty data handling
  if (!cleanResume || !cleanJD) {
    return {
      score: null,
      tier: 'No Score',
      matchedKeywords: [],
      missingKeywords: [],
      partialKeywords: [],
      detailedMatches: [],
      breakdown: {
        requiredScore: 0,
        requiredMatched: 0,
        requiredTotal: 0,
        preferredScore: 0,
        preferredMatched: 0,
        preferredTotal: 0,
        softSkillsScore: 0,
        softSkillsMatched: 0,
        softSkillsTotal: 0,
        experienceBoostApplied: false,
      },
    };
  }

  // 1. Parse Resume into sections
  const resumeSections = parseResumeSections(cleanResume);

  // 2. Parse Job Description into sections
  const jdSections = parseJobDescriptionSections(cleanJD);

  // 3. Extract keywords from each JD section
  const reqKeywords = extractKeywordsFromText(jdSections.required, 'required');
  const prefKeywords = extractKeywordsFromText(jdSections.preferred, 'preferred');
  const respKeywords = extractKeywordsFromText(jdSections.responsibilities, 'responsibilities');

  // Fallback: if no keywords were extracted from separated sections, extract from the entire JD text
  if (reqKeywords.length === 0 && prefKeywords.length === 0 && respKeywords.length === 0) {
    const generalKeywords = extractKeywordsFromText(cleanJD, 'required');
    if (generalKeywords.length > 0) {
      reqKeywords.push(...generalKeywords);
    }
  }

  // If still no keywords found, return null
  const totalKeywordsFound = reqKeywords.length + prefKeywords.length + respKeywords.length;
  if (totalKeywordsFound === 0) {
    return {
      score: null,
      tier: 'No Score',
      matchedKeywords: [],
      missingKeywords: [],
      partialKeywords: [],
      detailedMatches: [],
      breakdown: {
        requiredScore: 0,
        requiredMatched: 0,
        requiredTotal: 0,
        preferredScore: 0,
        preferredMatched: 0,
        preferredTotal: 0,
        softSkillsScore: 0,
        softSkillsMatched: 0,
        softSkillsTotal: 0,
        experienceBoostApplied: false,
      },
    };
  }

  const detailedMatches: KeywordMatchDetail[] = [];
  const matchedList: string[] = [];
  const partialList: string[] = [];
  const missingList: string[] = [];

  let experienceMatchesCount = 0;

  // Helper to evaluate a list of keywords
  const evaluateSectionKeywords = (
    keywords: { name: string; category: KeywordCategory; synonyms?: string[] }[],
    sourceSection: RequirementSection
  ) => {
    let sectionScoreSum = 0;

    for (const kw of keywords) {
      const matchRes = matchKeywordAgainstResume(kw.name, kw.category, resumeSections, kw.synonyms);

      const detail: KeywordMatchDetail = {
        keyword: kw.name,
        category: kw.category,
        sourceSection,
        status: matchRes.status,
        matchedWith: matchRes.matchedWith,
        resumeSection: matchRes.sectionFound,
        inExperience: matchRes.inExperience,
      };
      detailedMatches.push(detail);

      if (matchRes.inExperience) {
        experienceMatchesCount++;
      }

      if (matchRes.status === 'exact') {
        matchedList.push(kw.name);
        sectionScoreSum += 1.0;
      } else if (matchRes.status === 'synonym') {
        matchedList.push(kw.name);
        sectionScoreSum += 0.95; // generous credit for synonym match
      } else if (matchRes.status === 'partial') {
        partialList.push(kw.name);
        sectionScoreSum += 0.70; // partial overlap credit
      } else {
        missingList.push(kw.name);
      }
    }

    return sectionScoreSum;
  };

  const reqScoreSum = evaluateSectionKeywords(reqKeywords, 'required');
  const prefScoreSum = evaluateSectionKeywords(prefKeywords, 'preferred');
  const respScoreSum = evaluateSectionKeywords(respKeywords, 'responsibilities');

  // Compute sub-scores (0 - 100%)
  const requiredSubScore = reqKeywords.length > 0 ? (reqScoreSum / reqKeywords.length) * 100 : 100;
  const preferredSubScore = prefKeywords.length > 0 ? (prefScoreSum / prefKeywords.length) * 100 : 100;
  const softSkillsSubScore = respKeywords.length > 0 ? (respScoreSum / respKeywords.length) * 100 : 100;

  // Weighted Scoring Formula:
  // Base target weights:
  // Required = 60%, Preferred = 25%, Responsibilities/Soft Skills = 15%
  let reqWeight = 0.60;
  let prefWeight = 0.25;
  let respWeight = 0.15;

  // Adaptive normalization if sections are missing
  if (prefKeywords.length === 0 && respKeywords.length === 0) {
    reqWeight = 1.0;
    prefWeight = 0.0;
    respWeight = 0.0;
  } else if (prefKeywords.length === 0) {
    // Reallocate preferred 25% proportionally: Required (80%), Responsibilities (20%)
    reqWeight = 0.80;
    prefWeight = 0.0;
    respWeight = 0.20;
  } else if (respKeywords.length === 0) {
    reqWeight = 0.70;
    prefWeight = 0.30;
    respWeight = 0.0;
  }

  let finalScoreRaw = 
    (requiredSubScore * reqWeight) +
    (preferredSubScore * prefWeight) +
    (softSkillsSubScore * respWeight);

  // Applied Experience Bonus: If applicant demonstrated skills directly inside Experience bullet points
  let experienceBoostApplied = false;
  if (experienceMatchesCount >= 3 && finalScoreRaw > 0 && finalScoreRaw < 100) {
    experienceBoostApplied = true;
    finalScoreRaw = Math.min(100, finalScoreRaw * 1.05); // 5% boost for demonstrated application
  }

  // Round final score
  const finalScore = Math.min(100, Math.max(0, Math.round(finalScoreRaw)));
  const tier = getTierFromScore(finalScore);

  // Count matched items for breakdown
  const reqMatchedCount = detailedMatches.filter(d => d.sourceSection === 'required' && d.status !== 'missing').length;
  const prefMatchedCount = detailedMatches.filter(d => d.sourceSection === 'preferred' && d.status !== 'missing').length;
  const respMatchedCount = detailedMatches.filter(d => d.sourceSection === 'responsibilities' && d.status !== 'missing').length;

  const breakdown: MatchBreakdown = {
    requiredScore: Math.round(requiredSubScore),
    requiredMatched: reqMatchedCount,
    requiredTotal: reqKeywords.length,
    preferredScore: Math.round(preferredSubScore),
    preferredMatched: prefMatchedCount,
    preferredTotal: prefKeywords.length,
    softSkillsScore: Math.round(softSkillsSubScore),
    softSkillsMatched: respMatchedCount,
    softSkillsTotal: respKeywords.length,
    experienceBoostApplied,
  };

  return {
    score: finalScore,
    tier,
    matchedKeywords: Array.from(new Set(matchedList)),
    missingKeywords: Array.from(new Set(missingList)),
    partialKeywords: Array.from(new Set(partialList)),
    detailedMatches,
    breakdown,
  };
}

/**
 * Category lookup helper
 */
export function getKeywordCategory(keywordName: string): KeywordCategory {
  const found = COMPREHENSIVE_SKILLS.find(k => k.name.toLowerCase() === keywordName.toLowerCase());
  return found ? found.category : 'Frameworks & Tools';
}
