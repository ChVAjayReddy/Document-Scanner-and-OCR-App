type document = {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  ocrText: string;
  ocrStatus: string;
  syncStatus: string;
  isDeleted: number;
  createdAt: string;
};

type documentState = {
  documents: document[];
  unsyncedDocumentsCount: number;
  modalVisible: boolean;
  modalDocument: document[];
  loadDocuments: () => void;
  addingDocument: (
    title: string,
    description: string,
    imagePath: string,
  ) => void;
  deletingDocument: (id: number) => void;
  setModalDocument: (id: number) => void;

  OCRQueue: document[];
  pendingOCRDocuments: () => void;
};

export type { document, documentState };
