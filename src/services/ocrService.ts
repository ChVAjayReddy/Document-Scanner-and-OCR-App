import MlkitOcr from "rn-mlkit-ocr";
import { updateOCRResult } from "../database/documentRepository";
import { useDocumentStore } from "../stores/useDocumentStore";
export async function performOCR(imageUri: string) {
  try {
    const ocrText = await MlkitOcr.recognizeText(imageUri);
    updateOCRResult(imageUri, ocrText.text);
    setTimeout(() => {
      useDocumentStore.getState().loadDocuments();
    }, 5000);
  } catch (error) {
    console.error("OCR Error:", error);
    return;
  }
}
