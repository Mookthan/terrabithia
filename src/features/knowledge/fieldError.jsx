// Required-field hint for the composer: a short red message below the field (no outline).

export function FieldHint({ text }) {
  if (!text) return null;
  return <div role="alert" className="mx-0.5 mt-1 text-[12px] text-[#D93A44]">{text}</div>;
}
