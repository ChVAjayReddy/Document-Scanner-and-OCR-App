import { doc as firestoreDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import {
  getPendingSyncDocuments,
  markDocumentAsSynced,
} from "../database/documentRepository";
import { useDocumentStore } from "../stores/useDocumentStore";
import { useFirebaseStore } from "../stores/useFirebaseStore";

// let isSyncProcessing = false;

// export function initializeSyncWorker() {
//   useFirebaseStore.subscribe(
//     (state) => state.unsyncedDocuments,
//     (documents) => {
//       console.log("Queue changed:", documents.length);
//       if (documents.length > 0 && !isSyncProcessing) {
//         console.log("Starting Sync Worker");
//         processSyncQueue();
//       }
//     },
//   );
// }

// async function processSyncQueue() {
//   console.log("Worker Started");
//   isSyncProcessing = true;
//   while (useFirebaseStore.getState().unsyncedDocuments.length > 0) {
//     const doc = useFirebaseStore.getState().unsyncedDocuments[0];
//     console.log("Uploading:", doc);
//     try {
//       await setDoc(
//         firestoreDoc(db, "documents", String(doc.id)),
//         {
//           id: doc.id,
//           title: doc.title,
//           description: doc.description,
//           imagePath: doc.imagePath,
//           ocrText: doc.ocrText,
//           ocrStatus: doc.ocrStatus,
//           syncStatus: doc.syncStatus,
//           isDeleted: doc.isDeleted,
//           createdAt: doc.createdAt,
//         },
//         { merge: true },
//       );
//       console.log("Uploaded:", doc.id);
//       await markDocumentAsSynced(doc.id);
//       useFirebaseStore.setState((state) => ({
//         unsyncedDocuments: state.unsyncedDocuments.slice(1),
//       }));
//     } catch (error) {
//       console.error(error);
//       break;
//     }
//   }
//   useDocumentStore.getState().loadDocuments();
//   isSyncProcessing = false;
//   console.log("Worker Finished");
// }
export async function processSyncQueue() {
  while (true) {
    const pending = getPendingSyncDocuments();
    let doc = pending[0];

    if (pending.length === 0) {
      break;
    }

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
      console.log("Uploaded:", doc.id);
      await markDocumentAsSynced(doc.id);
      useFirebaseStore.setState((state) => ({
        unsyncedDocuments: state.unsyncedDocuments.slice(1),
      }));
    } catch (error) {
      console.error(error);
      break;
    }
    markDocumentAsSynced(pending[0].id);
  }

  useDocumentStore.getState().loadDocuments();
}
