type document = {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  ocrText: string;
  syncStatus: string;
  isDeleted: number;
  createdAt: string;
};

type documentState = {
  documents: document[];
  unsyncedDocumentsCount: number;
  loadDocuments: () => void;
  addingDocument: (
    title: string,
    description: string,
    imagePath: string,
  ) => void;
  deletingDocument: (id: number) => void;
  unsyncedDocuments: () => void;
};

export type { document, documentState };
