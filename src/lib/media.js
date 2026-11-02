// Resolves a file in /public/media regardless of the deploy base path.
export const media = (file) => `${import.meta.env.BASE_URL}media/${file}`;
