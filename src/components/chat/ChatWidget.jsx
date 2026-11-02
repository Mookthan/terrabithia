import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Maximize2, Minimize2, Trash2, X, Send } from 'lucide-react';
import { TERBY_SRC } from '@/data/me';
import { useAuth } from '@/context/AuthContext';
import { greeting, quickChips, reply } from './chatBrain';
import { TERBY_OPEN } from './terby';
import { ICON_BTN } from '@/components/ui/iconButton';
import useSingleOverlay from '@/hooks/useSingleOverlay';
import CloseButton from '@/components/ui/CloseButton';

const nowHHMM = () => {
  const n = new Date();
  return `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
};

let nextId = 0;
const message = (text, out = false, links = []) => ({ id: nextId++, text, out, links, time: nowHHMM() });

/** One message; the time sits outside the bubble at its bottom corner, on the side away from the sender (LINE style, mook 2026-10-30). */
function Bubble({ msg, onLink }) {
  return (
    <div className={`flex max-w-[90%] animate-chat-pop items-end gap-1.5 ${msg.out ? 'flex-row-reverse self-end' : 'self-start'}`}>
    <div
      className={`flex min-w-0 flex-col px-3 py-[9px] text-[12.5px] leading-[1.6] ${
        msg.out ? 'rounded-[13px_13px_3px_13px] bg-teal-bright text-white' : 'rounded-[13px_13px_13px_3px] text-ink'
      }`}
    >
      <span className="whitespace-pre-line">{msg.text}</span>
      {msg.links.length > 0 && (
        <div className="mt-2 flex flex-col gap-1.5">
          {msg.links.map((l) => (
            <button
              key={l.label}
              onClick={() => onLink(l.to)}
              className="rounded-ctl border-[1.5px] border-teal-bright bg-white px-3 py-[7px] text-left text-[11.5px] font-bold text-teal-bright transition-colors hover:bg-teal-bright hover:text-white"
            >
              {l.label} ›
            </button>
          ))}
        </div>
      )}
    </div>
      <time data-nt className="mb-0.5 flex-none text-[10px] leading-none tabular-nums text-muted">{msg.time}</time>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="inline-flex gap-[3px] self-start rounded-[13px_13px_13px_3px] px-3 py-2.5">
      {[0, 150, 300].map((d) => (
        <i key={d} className="h-[5px] w-[5px] animate-chat-dot rounded-full bg-faint" style={{ animationDelay: `${d}ms` }} />
      ))}
    </div>
  );
}

/**
 * Keeps the open chat inside what the phone actually shows: when the on-screen keyboard is up
 * (visualViewport shrinks) the panel sits right on top of it and shrinks to fit, so the question
 * field never slides under the keyboard. Returns null when there is nothing to adjust (desktop).
 */
function useKeyboardFit(open) {
  const [fit, setFit] = useState(null);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!open || !vv) return undefined;
    const update = () => {
      const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      setFit(kb > 80 || vv.height < 560 ? { kb, height: vv.height } : null);
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); };
  }, [open]);
  return fit;
}

/** Terby: floating assistant with rule-based answers and quick links. */
export default function ChatWidget() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const threadRef = useRef(null);
  const authRef = useRef(loggedIn);
  const fit = useKeyboardFit(open);
  const typingKb = fit && fit.kb > 80; // keyboard up: panel docks on it and the round button hides
  useSingleOverlay('chat', open, () => setOpen(false));

  // Start a fresh conversation whenever the user signs in or out.
  useEffect(() => {
    if (authRef.current === loggedIn) return;
    authRef.current = loggedIn;
    setMessages(open ? [message(greeting(loggedIn, false))] : []);
  }, [loggedIn, open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [messages, typing]);

  // "ช่วยเหลือ" in the profile menu opens the chat (and greets if it is empty).
  useEffect(() => {
    const show = () => {
      setOpen(true);
      setMessages((m) => (m.length ? m : [message(greeting(authRef.current, false))]));
    };
    window.addEventListener(TERBY_OPEN, show);
    return () => window.removeEventListener(TERBY_OPEN, show);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && messages.length === 0) setMessages([message(greeting(loggedIn, false))]);
  };

  const ask = (text) => {
    setMessages((m) => [...m, message(text, true)]);
    setTyping(true);
    setTimeout(() => {
      const r = reply(text, loggedIn);
      setTyping(false);
      setMessages((m) => [...m, message(r.text, false, r.links)]);
    }, 900);
  };

  const send = () => {
    const v = input.trim();
    if (!v) return;
    setInput('');
    ask(v);
  };

  const clear = () => setMessages([message(greeting(loggedIn, true))]);

  const followLink = (to) => {
    navigate(to);
    if (window.innerWidth <= 640) setOpen(false);
  };

  // Desktop: the panel can grow to a larger reading size (mook 2026-10-30); phones keep the normal panel.
  const [big, setBig] = useState(false);

  return (
    <div data-fade-on-lang>
      <button
        onClick={toggle}
        aria-label="Terby"
        className={`${typingKb ? 'invisible ' : ''}fixed bottom-4 right-4 z-[80] flex h-[58px] w-[58px] items-center justify-center rounded-full text-2xl text-white shadow-pop transition-transform duration-[250ms] ease-spring hover:-translate-y-[3px] hover:scale-105 min-[481px]:bottom-[22px] min-[481px]:right-[22px] ${
          open ? 'bg-teal-bright' : 'border-2 border-mint bg-white'
        }`}
      >
        {!open && <span className="absolute -inset-1.5 animate-chat-ping rounded-full border-2 border-teal-bright/50" />}
        {open
          ? <X className="lc !h-[26px] !w-[26px]" />
          : <img src={TERBY_SRC} alt="Terby" width="44" height="44" className="block h-[46px] w-[46px] rounded-full bg-white object-contain p-px" />}
      </button>

      <div
        style={fit ? { bottom: typingKb ? fit.kb + 8 : undefined, maxHeight: Math.min(480, fit.height - (typingKb ? 16 : 100)) } : undefined}
        className={`fixed bottom-[84px] right-4 z-[81] flex max-h-[min(72dvh,480px)] w-[330px] max-w-[calc(100vw-32px)] ${big ? 'min-[1024px]:h-[min(86dvh,820px)] min-[1024px]:max-h-[min(86dvh,820px)] min-[1024px]:w-[600px]' : 'min-[1024px]:h-[min(78dvh,620px)] min-[1024px]:max-h-[min(78dvh,620px)] min-[1024px]:w-[400px]'} transition-[opacity,transform,width,height] origin-bottom-right flex-col overflow-hidden rounded-box bg-white shadow-pop duration-[250ms] ease-spring max-[480px]:w-[calc(100vw-32px)] min-[481px]:bottom-[92px] min-[481px]:right-[22px] ${
          open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2.5 scale-[.92] opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b border-line bg-gradient-to-b from-mint to-white p-3.5">
          <div className="relative flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-mint bg-white">
            <img src={TERBY_SRC} alt="Terby" width="38" height="38" className="block h-full w-full rounded-full object-contain" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <b className="text-[13px] text-ink">Terby ผู้ช่วย AI</b>
            <small className="text-[10.5px] text-muted">
              {loggedIn ? 'พร้อมตอบคำถามเกี่ยวกับบัญชีของคุณ' : 'พร้อมช่วยตอบคำถามทั่วไปเกี่ยวกับ Terrabit'}
            </small>
          </div>
          <button onClick={() => setBig((v) => !v)} title={big ? 'ย่อกล่องแชท' : 'ขยายกล่องแชท'} aria-label={big ? 'ย่อกล่องแชท' : 'ขยายกล่องแชท'} aria-pressed={big} className={`${ICON_BTN} h-7 w-7 text-muted max-[1023px]:hidden`}>
            {big ? <Minimize2 className="lc !h-[15px] !w-[15px]" /> : <Maximize2 className="lc !h-[15px] !w-[15px]" />}
          </button>
          <button onClick={clear} title="ล้างการสนทนา" aria-label="ล้างการสนทนา" className={`${ICON_BTN} h-7 w-7 text-muted`}>
            <Trash2 className="lc !h-[15px] !w-[15px]" />
          </button>
          <CloseButton onClick={toggle} className="!h-8 !w-8" />
        </div>

        <div ref={threadRef} className="flex min-h-[72px] flex-1 flex-col gap-2 overflow-y-auto p-3.5">
          {messages.length > 0 && (
            <div className="self-center rounded-full px-2.5 py-0.5 text-[10px] text-ink opacity-80">วันนี้</div>
          )}
          {messages.map((m) => <Bubble key={m.id} msg={m} onLink={followLink} />)}
          {typing && <TypingDots />}
        </div>

        <div className={`flex flex-wrap gap-1.5 px-3.5 pb-2.5 ${typingKb ? 'hidden' : ''}`}>
          {quickChips(loggedIn).map(([q, label]) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="rounded-ctl border border-line bg-white px-3 py-1.5 text-[11px] text-ink hover:border-teal-bright hover:bg-mint hover:text-teal-bright"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 border-t border-line px-3 pb-3 pt-2.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="พิมพ์คำถาม..."
            className="min-w-0 flex-1 rounded-ctl border border-line bg-white px-3.5 py-[9px] text-[16px] text-ink outline-none placeholder:text-faint focus:border-teal-bright min-[641px]:text-[12.5px]"
          />
          <button onClick={send} aria-label="ส่ง" className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-teal-bright text-sm text-white">
            <Send className="lc !h-[17px] !w-[17px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
