import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {
  addDocument,
  getDocuments,
  getPendingDocumentsCount,
  getPendingOCRDocuments,
  softDeleteDocument,
} from "../database/documentRepository";
import type { document, documentState } from "../types/documentState";

export const useDocumentStore = create<documentState>()(
  subscribeWithSelector((set, get) => ({
    documents: [],
    unsyncedDocumentsCount: 0,
    modalVisible: false,
    modalDocument: [],
    OCRQueue: [],
    loadDocuments: async () => {
      const data = await getDocuments();
      set({ documents: data });
    },
    addingDocument: (title, description, imagePath) => {
      addDocument(title, description, imagePath);
      const data = getDocuments();
      set({ documents: data });
    },
    deletingDocument: (id: number) => {
      softDeleteDocument(id);
      const data = getDocuments();
      const count = getPendingDocumentsCount();
      set({ documents: data, unsyncedDocumentsCount: count });
    },
    setModalDocument: (id: number) => {
      const temp = useDocumentStore
        .getState()
        .documents.filter((doc) => doc.id === id);
      set({ modalVisible: true, modalDocument: temp });
    },

    pendingOCRDocuments: () => {
      const temp: document[] = getPendingOCRDocuments();
      set({ OCRQueue: temp });
    },
  })),
);
