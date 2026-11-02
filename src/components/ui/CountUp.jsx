import useCountUp from '@/hooks/useCountUp';

/**
 * A number that counts up when it scrolls into view (see useCountUp). `format` turns the number into
 * the full text, unit included (e.g. n => `${fmtCoins(n)} เหรียญ`), so the i18n engine still sees one string.
 */
export default function CountUp({ value, format = String, duration, as: Tag = 'span', className }) {
  const [ref, v] = useCountUp(value, duration);
  return <Tag ref={ref} className={`tabular-nums ${className || ''}`}>{format(v)}</Tag>;
}
