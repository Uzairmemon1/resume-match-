import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker for browser environment
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '6.3.289'}/build/pdf.worker.min.mjs`;
}

/**
 * Extracts raw text from a PDF file in the browser
 */
export async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
  });

  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageItems = textContent.items as Array<{ str?: string }>;
    const pageString = pageItems
      .filter((item) => typeof item.str === 'string')
      .map((item) => item.str)
      .join(' ');

    fullText += pageString + '\n';
  }

  return fullText.trim();
}

/**
 * Extracts raw text from a Word (.docx) document
 */
export async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

/**
 * Extracts raw text from a plain text (.txt) file
 */
export async function extractTxtText(file: File): Promise<string> {
  return await file.text();
}

/**
 * Extracts text based on uploaded file extension (.pdf, .docx, .doc, .txt)
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    const text = await extractPdfText(file);
    if (!text || text.trim().length === 0) {
      throw new Error(
        'Could not extract text from this PDF. It may contain scanned images rather than selectable text. You can still paste your resume text manually.'
      );
    }
    return text;
  }

  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    try {
      const text = await extractDocxText(file);
      if (!text || text.trim().length === 0) {
        throw new Error('Word document appears to be empty or could not be read.');
      }
      return text;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown Word parsing error';
      throw new Error(`Failed to parse Word document: ${errorMsg}`);
    }
  }

  if (fileName.endsWith('.txt')) {
    const text = await extractTxtText(file);
    return text.trim();
  }

  throw new Error('Unsupported format. Please upload a PDF (.pdf), Word (.docx), or Text (.txt) file.');
}
