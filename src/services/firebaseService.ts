import { doc as firestoreDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { markDocumentAsSynced } from "../database/documentRepository";
import { useDocumentStore } from "../stores/useDocumentStore";
import { useFirebaseStore } from "../stores/useFirebaseStore";

export const uploadDocuments = async () => {
  while (useFirebaseStore.getState().unsyncedDocuments.length > 0) {
    const doc = useFirebaseStore.getState().unsyncedDocuments[0];

    try {
      await setDoc(
        firestoreDoc(db, "documents", String(doc.id)),
        {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          imagePath: doc.imagePath,
          ocrText: doc.ocrText,
          ocrStatus: doc.ocrStatus,
          syncStatus: doc.syncStatus,
          isDeleted: doc.isDeleted,
          createdAt: doc.createdAt,
        },
        { merge: true },
      );

      markDocumentAsSynced(doc.id);

      useDocumentStore.getState().loadDocuments();
      useFirebaseStore.setState((state) => ({
        unsyncedDocuments: state.unsyncedDocuments.filter(
          (doc, index) => index !== 0,
        ),
      }));
    } catch (error) {
      console.log("Error in saving doc:", error, doc.id);
    }
  }
};

export const updateDocuments = async () => {
  while (useFirebaseStore.getState().unsyncedUpdatedDocuments.length > 0) {
    const doc = useFirebaseStore.getState().unsyncedUpdatedDocuments[0];

    try {
      await setDoc(
        firestoreDoc(db, "documents", String(doc.id)),
        {
          ocrText: doc.ocrText,
        },
        { merge: true },
      );
      useFirebaseStore.setState((state) => ({
        unsyncedUpdatedDocuments: state.unsyncedUpdatedDocuments.filter(
          (doc, index) => index !== 0,
        ),
      }));
      markDocumentAsSynced(doc.id);
      useDocumentStore.getState().loadDocuments();
    } catch (error) {
      console.log("Error in saving doc:", error, doc.id);
    }
  }
};
