import "server-only";
import { extractText } from "unpdf";

export async function extractPdfText(buffer: Buffer): Promise<string> {
  const uint8Array = new Uint8Array(buffer);

  const result = await extractText(uint8Array, {
    mergePages: true,
  });

  const text = result.text.trim();

  if (!text) {
    throw new Error(
      "No readable text was found in this PDF. It may be a scanned document."
    );
  }

  return text;
}