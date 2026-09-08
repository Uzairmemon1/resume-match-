declare module 'mammoth' {
  export interface ExtractRawTextOptions {
    arrayBuffer: ArrayBuffer;
  }
  export interface ExtractResult {
    value: string;
    messages: unknown[];
  }
  export function extractRawText(options: ExtractRawTextOptions): Promise<ExtractResult>;
  const mammoth: {
    extractRawText: typeof extractRawText;
  };
  export default mammoth;
}
