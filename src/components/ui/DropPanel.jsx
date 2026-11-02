/**
 * Frosted-glass dropdown card that stretches open and shut (height fold, see `.dd-fold` in index.css).
 * The plain middle div is what folds to 0 (padding lives one level deeper so nothing is left showing).
 * `className` places the card (absolute / top / width / z), `innerClassName` pads and lays out the content.
 */
export default function DropPanel({ open, className = '', innerClassName = '', children }) {
  return (
    <div className={`dd-glass dd-fold ${open ? 'is-open' : ''} ${className}`} aria-hidden={!open}>
      <div>
        <div className={innerClassName}>{children}</div>
      </div>
    </div>
  );
}
