/**
 * Inline section that slides open and shut (grid-rows fold) — used instead of a second popup on top of a popup.
 * Closed content is inert so it cannot be tabbed into.
 */
export default function Fold({ open, className = '', children }) {
  return (
    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} ${className}`}>
      <div className="min-h-0 overflow-hidden" inert={open ? undefined : ''}>{children}</div>
    </div>
  );
}
