import { createPortal } from 'react-dom';
import useBodyLock from '@/hooks/useBodyLock';
import useEscape from '@/hooks/useEscape';
import { portalTarget } from '@/lib/portalTarget';
import CloseButton from '@/components/ui/CloseButton';

/** White popup used by the work-card details (JD, KPI, evaluation history); sits one step above the org-chart person card. */
export default function ModalShell({ label, width = 'w-[520px]', onClose, children }) {
  useEscape(onClose, true);
  useBodyLock(true);
  return createPortal(
    <div
      className="fixed inset-0 z-[2110] flex items-center justify-center bg-[rgba(10,20,18,.45)] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div role="dialog" aria-label={label} className={`relative max-h-[90vh] ${width} max-w-full overflow-y-auto rounded-box bg-white px-6 py-6 shadow-pop`}>
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        {children}
      </div>
    </div>,
    portalTarget(), // inside the fullscreen org chart when it is fullscreen
  );
}
