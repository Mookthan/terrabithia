// Attachment rules for knowledge posts: files from the computer plus at most one link.

export const MAX_FILE_MB = 20;
export const FILE_ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*';

const YOUTUBE = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i;

/** Post type for the filter chips: 'video' for a YouTube link, 'link' for any other link, '' for none. */
export const linkType = (url) => (!url ? '' : YOUTUBE.test(url) ? 'video' : 'link');

/** "https://…" only; returns the trimmed URL or null. */
export function cleanUrl(text) {
  const t = text.trim();
  try {
    const u = new URL(t);
    return u.protocol === 'http:' || u.protocol === 'https:' ? t : null;
  } catch {
    return null;
  }
}

export function fileSize(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Browser File → attachment the post can show. Images keep an object URL for the thumbnail. */
export const toAttachment = (f) => ({
  id: `${f.name}-${f.size}-${f.lastModified}`,
  name: f.name,
  size: f.size,
  url: URL.createObjectURL(f),
  image: f.type.startsWith('image/'),
});
