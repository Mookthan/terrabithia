import { ArrowUpRight } from 'lucide-react';
import { TEXT_LINK } from '@/components/ui/TextButton';
import { socialHref, socialLabel } from '../social';
import SocialIcon from './SocialIcon';

/** A person's social accounts: brand badge + link (green, opens a new tab), or plain text when there is no link (LINE ID). */
export default function SocialLinks({ list }) {
  return (
    <ul className="m-0 flex min-w-0 flex-1 list-none flex-col gap-1.5 p-0">
      {list.map(([k, v]) => {
        const href = socialHref(k, v);
        const label = socialLabel(k, v);
        return (
          <li key={k + v} className="flex min-w-0 items-center gap-2" data-nt>
            <SocialIcon k={k} />
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={`${TEXT_LINK} min-w-0 font-semibold`}>
                <span className="truncate">{label}</span>
                <ArrowUpRight className="lc !h-3.5 !w-3.5 flex-none" aria-hidden="true" />
              </a>
            ) : (
              <span className="min-w-0 truncate text-ink">{`LINE ID: ${label}`}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
