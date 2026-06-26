import type { document } from "./documentState";
type FirebaseState = {
  unsyncedDocuments: document[];
  unsyncedUpdatedDocuments: document[];
  unsyncedDeletedDocuments: document[];
  getUnsyncedDocuments: () => void;
  getUnsyncedUpdatedDocuments: () => void;
  getUnsyncedDeletedDocuments: () => void;
};

export type { FirebaseState };
