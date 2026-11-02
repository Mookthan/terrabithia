import EmptyState from '@/components/ui/EmptyState';

export default function Empty({ children, className = '' }) {
  return <EmptyState className={`py-[30px] text-[13px] ${className}`}>{children}</EmptyState>;
}
