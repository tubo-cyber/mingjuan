import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StyleId } from "./art-styles";

const DB = "mingjuan-v1";
const STORE = "img";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveImage(key: string, dataUrl: string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(dataUrl, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadImage(key: string): Promise<string | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const q = tx.objectStore(STORE).get(key);
    q.onsuccess = () => resolve((q.result as string) ?? null);
    q.onerror = () => reject(q.error);
  });
}

export async function deleteImage(key: string) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export type Person = {
  id: string;
  bookId: string;
  name: string;
  aliases: string[];
  role: string;
  chapters: number[];
  importance: string;
  bibleLook: string;
  portraitBrief: string;
  styleId: StyleId;
  confirmed: boolean;
};

type CastState = {
  people: Person[];
  styleByBook: Record<string, StyleId>;
  upsertPeople: (bookId: string, incoming: Omit<Person, "bookId" | "styleId" | "confirmed">[]) => void;
  setStyle: (bookId: string, style: StyleId) => void;
  confirm: (bookId: string, id: string) => void;
  forget: (bookId: string, id: string) => void;
  peopleOf: (bookId: string) => Person[];
};

export const useCast = create<CastState>()(
  persist(
    (set, get) => ({
      people: [],
      styleByBook: {},
      upsertPeople: (bookId, incoming) =>
        set((s) => {
          const style = (s.styleByBook[bookId] ?? "oil") as StyleId;
          const kept = s.people.filter((p) => p.bookId !== bookId || p.confirmed);
          const next = [...kept];
          for (const row of incoming) {
            const exists = next.find((p) => p.bookId === bookId && p.id === row.id);
            if (exists) {
              Object.assign(exists, {
                name: row.name,
                aliases: row.aliases,
                role: row.role,
                chapters: row.chapters,
                importance: row.importance,
                bibleLook: row.bibleLook,
                portraitBrief: row.portraitBrief,
              });
            } else {
              next.push({ ...row, bookId, styleId: style, confirmed: false });
            }
          }
          return { people: next };
        }),
      setStyle: (bookId, style) =>
        set((s) => ({
          styleByBook: { ...s.styleByBook, [bookId]: style },
          people: s.people.map((p) => (p.bookId === bookId && !p.confirmed ? { ...p, styleId: style } : p)),
        })),
      confirm: (bookId, id) =>
        set((s) => ({
          people: s.people.map((p) => (p.bookId === bookId && p.id === id ? { ...p, confirmed: true } : p)),
        })),
      forget: (bookId, id) =>
        set((s) => ({
          people: s.people.filter((p) => !(p.bookId === bookId && p.id === id)),
        })),
      peopleOf: (bookId) => get().people.filter((p) => p.bookId === bookId),
    }),
    { name: "mingjuan-cast" },
  ),
);

export function imgKey(bookId: string, id: string) {
  return `${bookId}:${id}`;
}

export function mentioned(people: Person[], text: string): Person[] {
  return people.filter((p) => {
    const names = [p.name, ...p.aliases].filter((n) => n.length >= 2);
    return names.some((n) => text.includes(n));
  });
}
