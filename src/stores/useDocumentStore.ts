import { create } from "zustand";
import {
  addDocument,
  getDocuments,
  getPendingDocumentsCount,
  softDeleteDocument,
} from "../database/documentRepository";
import type { documentState } from "../types/documentState";

export const useDocumentStore = create<documentState>((set) => ({
  documents: [],
  unsyncedDocumentsCount: 0,

  loadDocuments: () => {
    const data = getDocuments();
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
  unsyncedDocuments: () => {
    const data = getPendingDocumentsCount();
    set({ unsyncedDocumentsCount: data });
  },
}));
