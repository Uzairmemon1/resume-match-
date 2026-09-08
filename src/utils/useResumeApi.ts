export interface UseResumeEmployment {
  title: string;
  company: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  present?: boolean;
  description?: string;
}

export interface UseResumeEducation {
  institution: string;
  degree: string;
  location?: string;
  start_date?: string;
  end_date?: string;
}

export interface UseResumeLink {
  name: string;
  url: string;
}

export interface UseResumeContent {
  name: string;
  role: string;
  email: string;
  phone?: string;
  address?: string;
  summary?: string;
  skills?: string[];
  links?: UseResumeLink[];
  employment?: UseResumeEmployment[];
  education?: UseResumeEducation[];
}

export interface UseResumeStyle {
  template: string; // e.g. 'clean', 'modern pro', 'executive', 'harvard', 'apex', 'cascade', 'zenith', 'summit'
  template_color?: string; // 'blue', 'emerald', 'black', 'navy', 'purple'
  font?: string; // 'geist', 'inter'
  page_format?: 'a4' | 'letter';
}

export interface GenerateResumeResponse {
  success: boolean;
  fileUrl?: string;
  fileSizeBytes?: number;
  creditsRemaining?: number;
  error?: string;
}

// User-provided API Key
export const DEFAULT_USERESUME_API_KEY = 'ur_live_H21TvF6WMcWFPdhzgTZQXcAZCzNzndhg';
export const USERESUME_CREATE_ENDPOINT = 'https://useresume.ai/api/v3/resume/create';

/**
 * Calls the useResume.ai API to generate a professionally formatted ATS PDF resume.
 */
export async function generatePdfResume(
  content: UseResumeContent,
  style: UseResumeStyle = { template: 'clean', template_color: 'blue', page_format: 'a4' },
  customApiKey?: string
): Promise<GenerateResumeResponse> {
  const apiKey = customApiKey?.trim() || DEFAULT_USERESUME_API_KEY;

  try {
    const payload = {
      style: {
        template: style.template || 'clean',
        template_color: style.template_color || 'blue',
        font: style.font || 'geist',
        page_format: style.page_format || 'a4',
      },
      content: {
        name: content.name,
        role: content.role,
        email: content.email,
        phone: content.phone || '+1 (555) 019-2834',
        address: content.address || 'San Francisco, CA',
        summary: content.summary || '',
        skills: content.skills || [],
        links: content.links || [
          { name: 'Portfolio', url: `https://github.com/${content.name.toLowerCase().replace(/\s+/g, '')}` },
        ],
        employment: content.employment && content.employment.length > 0 ? content.employment : [
          {
            title: content.role,
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            start_date: '2022-01',
            present: true,
            description: `Led product features, scaled architectures, and collaborated with cross-functional teams utilizing ${
              content.skills ? content.skills.slice(0, 4).join(', ') : 'modern tools'
            }.`,
          },
          {
            title: 'Associate Engineer',
            company: 'Venture Labs',
            location: 'Remote',
            start_date: '2020-03',
            end_date: '2021-12',
            present: false,
            description: 'Maintained API microservices, performed test automation, and optimized database queries.',
          }
        ],
        education: content.education && content.education.length > 0 ? content.education : [
          {
            institution: 'State University',
            degree: 'B.S. in Computer Science & Information Systems',
            location: 'CA',
            start_date: '2016-09',
            end_date: '2020-05',
          }
        ],
      },
    };

    const res = await fetch(USERESUME_CREATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errMsg = `API error status ${res.status}`;
      try {
        const errorJson = await res.json();
        errMsg = errorJson.message || errorJson.error || errMsg;
      } catch {
        // use default error message
      }
      return { success: false, error: errMsg };
    }

    const data = await res.json();

    if (data.success && data.data?.file_url) {
      return {
        success: true,
        fileUrl: data.data.file_url,
        fileSizeBytes: data.data.file_size_bytes,
        creditsRemaining: data.meta?.credits_remaining,
      };
    }

    return {
      success: false,
      error: data.message || 'API did not return a valid file URL.',
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error connecting to useResume.ai';
    return {
      success: false,
      error: message,
    };
  }
}
