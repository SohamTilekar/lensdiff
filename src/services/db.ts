import { openDB } from 'idb';
import type { DBSchema, IDBPDatabase } from 'idb';
import type { HistoryItem } from '../types';

interface DiffLensDB extends DBSchema {
  history: {
    key: string;
    value: HistoryItem;
    indexes: { 'by-timestamp': number };
  };
}

const DB_NAME = 'difflens_db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<DiffLensDB>> | null = null;

function getDB() {
  if (!dbPromise && typeof window !== 'undefined') {
    dbPromise = openDB<DiffLensDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore('history', { keyPath: 'id' });
        store.createIndex('by-timestamp', 'timestamp');
      },
    });
  }
  return dbPromise;
}

export async function saveHistoryItem(item: HistoryItem): Promise<void> {
  const db = await getDB();
  if (db) {
    await db.put('history', item);
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  const db = await getDB();
  if (!db) return [];
  const items = await db.getAllFromIndex('history', 'by-timestamp');
  return items.reverse(); // Most recent first
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const db = await getDB();
  if (db) {
    await db.delete('history', id);
  }
}

export async function clearHistory(): Promise<void> {
  const db = await getDB();
  if (db) {
    await db.clear('history');
  }
}
