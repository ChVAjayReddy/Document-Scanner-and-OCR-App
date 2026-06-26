import type { document } from "../types/documentState";
import { db } from "./database";

export function addDocument(
  title: string,
  description: string,
  imagePath: string,
) {
  db.runSync(
    `
    INSERT INTO documents
    (title, description, createdAt,imagePath)
    VALUES (?, ?, ?, ?)
    `,
    [title, description, new Date().toISOString(), imagePath],
  );
}
export function updateOCRResult(imagePath: string, ocrText: string) {
  db.runSync(
    `
    UPDATE documents
    SET ocrText = ?,
        ocrStatus = ?,
        syncStatus = 'pending'
    WHERE imagePath = ?
    `,
    [ocrText, "OCR Completed", imagePath],
  );
}

export function getDocuments(): document[] {
  return db.getAllSync(
    `
   SELECT *
FROM documents
WHERE isDeleted = 0
ORDER BY id DESC
    `,
  ) as document[];
}
export async function markDocumentAsSynced(id: number) {
  db.runSync(
    `
    UPDATE documents
    SET syncStatus = 'synced'
    WHERE id = ?
    `,
    [id],
  );
}
export function getPendingSyncDocuments(): document[] {
  return db.getAllSync(`
    SELECT *
    FROM documents
    WHERE syncStatus = 'pending'
  `) as document[];
}
export function getPendingDocumentsCount() {
  return db.getAllSync(`
    SELECT *
    FROM documents
    WHERE syncStatus = 'pending'
  `).length;
}
export function softDeleteDocument(id: number) {
  db.runSync(
    `
    UPDATE documents
    SET isDeleted = 1,
        syncStatus = 'pending'
    WHERE id = ?
    `,
    [id],
  );
}
export function getPendingOCRDocuments(): document[] {
  return db.getAllSync(`
    SELECT *
    FROM documents
    WHERE ocrStatus = 'pending'
  `);
}
export function getDocumentbyURI(uri: string): document[] {
  return db.getAllSync(
    `
    SELECT *
    FROM documents
    WHERE imagePath = ?
  `,
    [uri],
  ) as document[];
}
