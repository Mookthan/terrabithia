import '../home.css';

/**
 * One card of the signed-in home "bento" dashboard. It flies in from (dx, dy, rot)
 * with a stagger of `i`, and on phones it is revealed on scroll (see useMobileReveal).
 * `className` carries the card's own background/padding and its phone `order-*`.
 */
export default function DashCard({ i, dx, dy, rot, className = '', style, children, ...rest }) {
  return (
    <div
      data-home-card=""
      className={`home-card overflow-hidden rounded-box shadow-card ${className}`}
      style={{ '--i': i, '--dx': dx, '--dy': dy, '--rot': rot, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
