/**
 * Desktop zoom: on screens from MIN_WIDTH up the whole page is drawn at ZOOM (set on <html>),
 * so text, spacing and cards shrink together. CSS `zoom` also shrinks vw / vh lengths, which
 * would leave full-bleed bands short of the screen edge. This plugin copies every declaration
 * that uses a viewport unit into a desktop media rule with the length divided by ZOOM.
 */
export const ZOOM = 0.85;
export const MIN_WIDTH = 1280;

const UNIT = /(-?\d*\.?\d+)(dvh|svh|lvh|vw|vh)\b/g;
const DESKTOP = `(min-width: ${MIN_WIDTH}px)`;

/** A media query that can never match from MIN_WIDTH up (max-width below it). */
const phoneOnly = (params) => {
  const m = /max-width:\s*([\d.]+)px/.exec(params);
  return m && +m[1] < MIN_WIDTH;
};

export default function desktopZoom() {
  return {
    postcssPlugin: 'desktop-zoom',
    OnceExit(root, { AtRule }) {
      const out = new Map();
      root.walkRules((rule) => {
        if (rule.parent.type === 'atrule' && rule.parent.name !== 'media') return; // keyframes etc.
        const media = rule.parent.type === 'atrule' ? rule.parent.params : '';
        if (media && phoneOnly(media)) return;
        const decls = [];
        rule.each((d) => {
          if (d.type === 'decl' && UNIT.test(d.value)) {
            decls.push(d.clone({ value: d.value.replace(UNIT, (_, n, u) => `calc(${n}${u} / ${ZOOM})`) }));
          }
          UNIT.lastIndex = 0;
        });
        if (!decls.length) return;
        const key = media ? `${media} and ${DESKTOP}` : DESKTOP;
        if (!out.has(key)) out.set(key, new AtRule({ name: 'media', params: key }));
        out.get(key).append(rule.clone({ nodes: decls }));
      });
      out.forEach((at) => root.append(at));
    },
  };
}
desktopZoom.postcss = true;
