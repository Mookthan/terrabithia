import { Search } from 'lucide-react';
import FolderTabs from '@/components/ui/FolderTabs';
import EmptyState from '@/components/ui/EmptyState';
import { TABS } from '../data';
import { selParts } from '../depts';
import PostFilter from './PostFilter';
import PostCard from './PostCard';

function isVisible(p, { tab, deptSel, query }) {
  if (tab === 'all' && p.status !== 'approved') return false;
  if (tab === 'mine' && !p.mine) return false;
  if (tab === 'pending' && !(p.mine && p.status === 'pending')) return false;
  if (deptSel.length && !p.depts.some((d) => deptSel.includes(d))) return false;
  if (query) {
    const t = `${p.author} ${p.subject || ''} ${p.html.replace(/<[^>]+>/g, ' ')} ${p.link || ''}`.toLowerCase();
    if (!t.includes(query.toLowerCase())) return false;
  }
  return true;
}

/**
 * Right column: tabs, keyword search, department filter, the chosen filters and the post list.
 * On desktop it takes the composer's height (absolute fill), so the composer stays put and
 * everything from "ผลการค้นหา" down scrolls inside the panel.
 */
export default function PostsPanel({
  posts, tab, onTab, query, onQuery, deptSel, onDeptSel, filterOpen, onFilterOpen,
}) {
  const items = posts.filter((p) => isVisible(p, { tab, deptSel, query }));
  const chosen = selParts(deptSel);
  // Only "รออนุมัติ" gets a count: it is the one list that changes on its own and empties when approved.
  const pending = posts.filter((p) => p.mine && p.status === 'pending').length;
  // Desktop: at least the open composer's height with the list scrolling inside, so it doesn't shrink with the folded composer.
  return (
    <div className="min-[861px]:relative min-[861px]:min-h-[626px]">
      <div className="flex flex-col min-[861px]:absolute min-[861px]:inset-0">
        <FolderTabs
          className="min-h-0 flex-1"
          boxClassName="flex min-h-0 flex-1 flex-col px-[22px] pb-[22px] pt-5"
          label="โพสต์"
          items={TABS.map(([k, label]) => ({ k, label, badge: k === 'pending' ? pending : 0 }))}
          value={tab}
          onChange={onTab}
        >
          <div className="flex shrink-0 items-center gap-3.5 max-[640px]:gap-2.5">
            <div className="flex flex-1 items-center gap-2.5 rounded-ctl border border-[#d8d8d0] px-3.5 text-muted max-[640px]:min-w-0">
              <Search className="lc" />
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="ค้นหา Keyword"
                className="min-w-0 flex-1 border-none bg-white py-[11px] text-[14px] text-ink outline-none placeholder:text-faint"
              />
            </div>
            <PostFilter sel={deptSel} onChange={onDeptSel} open={filterOpen} onOpenChange={onFilterOpen} />
          </div>
          <div className="-mx-3 -mb-3 mt-3.5 min-h-0 flex-1 overflow-y-auto px-3 pb-3">
            <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[12.5px]">
              <span className="mr-1 text-ink">ผลการค้นหา:</span>
              {/* Read-only tags: what is ticked in the filter, not buttons. */}
              {chosen.length
                ? chosen.map((label) => <span key={label} className="rounded-ctl bg-[#EFEFEF] px-3.5 py-2 text-ink">{label}</span>)
                : <span className="text-muted">ทั้งหมด</span>}
            </div>
            <div className="mt-3 flex flex-col gap-4 border-t border-[#eee] pt-4">
              {items.length
                ? items.map((p) => <PostCard key={p.id} post={p} />)
                : <EmptyState>ไม่พบโพสต์</EmptyState>}
            </div>
          </div>
        </FolderTabs>
      </div>
    </div>
  );
}
