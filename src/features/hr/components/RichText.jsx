import { Fragment } from 'react';

const TAG_RE = /<(\/?)(br|b|a|em)\b([^>]*)>/gi;

/** Turn a trusted static string with <br>, <b>, <em> and <a href> into React nodes. */
function parse(src) {
  const root = { children: [] };
  const stack = [root];
  let last = 0;
  let m;
  TAG_RE.lastIndex = 0;
  while ((m = TAG_RE.exec(src))) {
    const top = stack[stack.length - 1];
    if (m.index > last) top.children.push(src.slice(last, m.index));
    last = TAG_RE.lastIndex;
    const [, close, tag, attrs] = m;
    const name = tag.toLowerCase();
    if (name === 'br') top.children.push({ tag: 'br', children: [] });
    else if (close) { if (stack.length > 1) stack.pop(); }
    else {
      const node = { tag: name, children: [], href: (attrs.match(/href="([^"]*)"/) || [])[1] };
      top.children.push(node);
      stack.push(node);
    }
  }
  if (last < src.length) stack[stack.length - 1].children.push(src.slice(last));
  return root.children;
}

function render(nodes) {
  return nodes.map((n, i) => {
    if (typeof n === 'string') return <Fragment key={i}>{n}</Fragment>;
    if (n.tag === 'br') return <br key={i} />;
    if (n.tag === 'a') return <a key={i} href={n.href} target="_blank" rel="noopener noreferrer" className="underline text-teal-bright transition-colors duration-200 hover:!text-teal-hover">{render(n.children)}</a>;
    const Tag = n.tag;
    return <Tag key={i}>{render(n.children)}</Tag>;
  });
}

export default function RichText({ html }) {
  return <>{render(parse(html))}</>;
}
