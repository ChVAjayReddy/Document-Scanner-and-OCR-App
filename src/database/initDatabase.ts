import { db } from "./database";

export function initDatabase() {
  db.execSync(`
  DROP TABLE IF EXISTS documents;
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      imagePath TEXT,
      ocrText TEXT,
      ocrStatus TEXT DEFAULT 'pending',
      syncStatus TEXT DEFAULT 'pending',
      isDeleted INTEGER DEFAULT 0,
      createdAt TEXT
    );
  `);
}
