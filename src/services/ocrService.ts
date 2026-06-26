import MlkitOcr from "rn-mlkit-ocr";
import { updateOCRResult } from "../database/documentRepository";
import { useDocumentStore } from "../stores/useDocumentStore";
import { processSyncQueue } from "./syncSerivec";

let processing = false;

export function initializeOCRWorker() {
  useDocumentStore.subscribe(
    (state) => state.OCRQueue,
    (Queue) => {
      if (Queue.length > 0 && !processing) {
        processOCRQueue();
      }
    },
  );
}

export async function processOCRQueue() {
  processing = true;

  while (useDocumentStore.getState().OCRQueue.length > 0) {
    let current = useDocumentStore.getState().OCRQueue[0];

    try {
      const ocrText = await MlkitOcr.recognizeText(current.imagePath);

      await updateOCRResult(current.imagePath, ocrText.text);
      // const updatedDoc = getDocumentbyURI(current.imagePath)[0];

      // useFirebaseStore.setState((state) => ({
      //   unsyncedDocuments: [...state.unsyncedDocuments, updatedDoc],
      // }));
      await processSyncQueue();
      useDocumentStore.setState((state) => ({
        OCRQueue: state.OCRQueue.slice(1),
      }));
    } catch (error) {
      console.error(error);
      break;
    }
  }
  useDocumentStore.getState().loadDocuments();
  processing = false;
}
