import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getPendingSyncDocuments } from "../database/documentRepository";
import type { document } from "../types/documentState";
import type { FirebaseState } from "../types/firebaseState";
export const useFirebaseStore = create<FirebaseState>()(
  subscribeWithSelector((set, get) => ({
    unsyncedDocuments: [],
    unsyncedUpdatedDocuments: [],
    unsyncedDeletedDocuments: [],
    getUnsyncedDocuments: () => {
      const documents: document[] = getPendingSyncDocuments();
      set({ unsyncedDocuments: documents });
    },
    getUnsyncedDeletedDocuments: () => {},
    getUnsyncedUpdatedDocuments: () => {},
  })),
);
