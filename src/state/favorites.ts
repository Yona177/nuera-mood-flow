export type Favorite = { 
  kind: "meditation" | "reel" | "tool"; 
  id: string; 
  title?: string; 
  durationSec?: number; 
  ts?: number;
};

const KEY = "nuera:favorites";

export function loadFavorites(): Favorite[] {
  try { 
    return JSON.parse(localStorage.getItem(KEY) || "[]"); 
  } catch { 
    return []; 
  }
}

export function saveFavorite(f: Favorite) {
  const list = loadFavorites();
  const exists = list.some(x => x.kind === f.kind && x.id === f.id);
  if (!exists) {
    const next = [...list, { ...f, ts: Date.now() }];
    localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export function removeFavorite(kind: string, id: string) {
  const list = loadFavorites();
  const filtered = list.filter(x => !(x.kind === kind && x.id === id));
  localStorage.setItem(KEY, JSON.stringify(filtered));
}

export function isFavorited(kind: string, id: string): boolean {
  const list = loadFavorites();
  return list.some(x => x.kind === kind && x.id === id);
}