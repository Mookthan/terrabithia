import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Toast from '@/components/ui/Toast';
import VideoModal from '@/components/ui/VideoModal';
import { track } from '@/lib/activityLog';

const UIContext = createContext(null);

/** App-wide overlays: a toast line and a video player modal. */
export function UIProvider({ children }) {
  const [toastMsg, setToastMsg] = useState({ text: '', show: false });
  const [video, setVideo] = useState(null);
  const timer = useRef(0);

  const toast = useCallback((text) => {
    setToastMsg({ text, show: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg((t) => ({ ...t, show: false })), 2400);
  }, []);

  const openVideo = useCallback((title, src) => { track('video', title); setVideo({ title, src }); }, []);
  const closeVideo = useCallback(() => setVideo(null), []);

  const value = useMemo(() => ({ toast, openVideo, closeVideo }), [toast, openVideo, closeVideo]);
  return (
    <UIContext.Provider value={value}>
      {children}
      <Toast text={toastMsg.text} show={toastMsg.show} />
      <VideoModal video={video} onClose={closeVideo} />
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
