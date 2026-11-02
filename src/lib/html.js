export const escapeHTML = (t) =>
  String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Strip scripts, embeds and inline handlers from user-authored rich text. */
export function sanitizeHTML(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  d.querySelectorAll('script,style,iframe,object,embed,link').forEach((n) => n.remove());
  d.querySelectorAll('*').forEach((n) => {
    [...n.attributes].forEach((a) => {
      if (/^on/i.test(a.name) || /javascript:/i.test(a.value)) n.removeAttribute(a.name);
    });
  });
  return d.innerHTML;
}
