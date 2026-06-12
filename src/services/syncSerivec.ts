import {
  getPendingDocuments,
  markDocumentAsSynced,
} from "../database/documentRepository";

import documentService from "./documentServie";

const syncService = {
  syncDocuments: async () => {
    const pendingDocs = getPendingDocuments();

    if (pendingDocs.length === 0) {
      return;
    }

    const response = await documentService.uploadDocuments(pendingDocs);

    if (response.success) {
      pendingDocs.forEach((doc: any) => {
        markDocumentAsSynced(doc.id);
      });
    }
  },
};

export default syncService;
