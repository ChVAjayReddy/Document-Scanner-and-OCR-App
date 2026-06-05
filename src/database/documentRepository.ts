import { db } from "./database";

export function addDocument(title: string, description: string) {
  db.runSync(
    `
    INSERT INTO documents
    (title, description, createdAt)
    VALUES (?, ?, ?)
    `,
    [title, description, new Date().toISOString()],
  );
}

export function getDocuments() {
  return db.getAllSync(
    `
    SELECT *
    FROM documents
    ORDER BY id DESC
    `,
  );
}
