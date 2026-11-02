// Session-wide showcase albums (module level, like newsStore). Viewer is always ME in the prototype.
import { useSyncExternalStore } from 'react';
import { ORGDATA } from '@/data/org';
import { ME } from '@/data/me';
import { MAX_BYTES, SEED_ALBUMS } from './data';

let state = { albums: SEED_ALBUMS };
const listeners = new Set();
const set = (albums) => { state = { albums }; listeners.forEach((l) => l()); };
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export const useAlbums = () => useSyncExternalStore(subscribe, () => state).albums;

const EMPTY = { vis: { k: 'company', ids: [] }, photos: [] };
export const albumOf = (albums, id) => albums[id] || EMPTY;
export const usedBytes = (album) => album.photos.reduce((s, p) => s + p.size, 0);
const update = (id, fn) => set({ ...state.albums, [id]: fn(albumOf(state.albums, id)) });

/** Picked files → photos (preview URL) that fit the storage left, plus the names left out. */
export function draftPhotos(files, id = ME.id) {
  let used = usedBytes(albumOf(state.albums, id));
  const drafts = [];
  const skipped = [];
  files.forEach((f, i) => {
    if (!f.type.startsWith('image/') || used + f.size > MAX_BYTES) { skipped.push(f.name); return; }
    used += f.size;
    drafts.push({ id: `u${Date.now()}-${i}`, src: URL.createObjectURL(f), cap: '', size: f.size });
  });
  return { drafts, skipped };
}

/** Adds photos to the album (newest first); every photo shows on the org-chart card. */
export const addPhotos = (drafts, id = ME.id) => update(id, (a) => ({ ...a, photos: [...drafts, ...a.photos] }));

export function removePhoto(photoId, id = ME.id) {
  update(id, (a) => {
    const p = a.photos.find((x) => x.id === photoId);
    if (p?.src?.startsWith('blob:')) URL.revokeObjectURL(p.src);
    return { ...a, photos: a.photos.filter((x) => x.id !== photoId) };
  });
}

export const setVisibility = (vis, id = ME.id) => update(id, (a) => ({ ...a, vis }));

/* ---- who can see whose album ---- */
const parentOf = (id) => ORGDATA.find((n) => n.id === id)?.parentId;
/** Team (department node) and division (branch) of a person in the org tree; chiefs are their own division. */
export function placeOf(id) {
  const dept = parentOf(id);
  const branch = dept && /-\d+$/.test(dept) ? parentOf(dept) : id;
  return { dept, branch };
}

/** Can `viewer` see `owner`'s album with these settings? */
export function canSee(owner, vis, viewer = ME.id) {
  if (owner === viewer) return true;
  const o = placeOf(owner);
  const v = placeOf(viewer);
  switch (vis.k) {
    case 'company': return true;
    case 'dept': return !!o.dept && o.dept === v.dept;
    case 'branch': return o.branch === v.branch;
    case 'custom': return vis.ids.includes(v.dept) || vis.ids.includes(v.branch);
    default: return false;
  }
}
