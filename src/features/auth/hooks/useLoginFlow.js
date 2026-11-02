import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PATHS } from '@/routes/paths';
import { COMPANY_MAIL, ERR, MIN_PASSWORD, RESET_ERR, RESET_NOTICE } from '../data';
import { clearRemember, loadRemember, saveRemember } from './useRemember';

/**
 * Sign-in page state machine: 'login' → 'forgot' (→ sent) → 'reset' → back to 'login'.
 */
export default function useLoginFlow() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state: from } = useLocation(); // set by RequireLogin: { from, msg }
  const [view, setView] = useState('login');
  const [form, setForm] = useState(loadRemember);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(from?.msg ?? null);
  const [demoErr, setDemoErr] = useState('none');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState(null);
  const [resetSent, setResetSent] = useState(false);
  const [focusPw, setFocusPw] = useState(0);
  const pwRef = useRef(null);

  useEffect(() => {
    if (!focusPw) return undefined;
    const t = setTimeout(() => pwRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [focusPw]);

  const submit = useCallback(() => {
    const e = form.e.trim();
    const p = form.p.trim();
    setNotice(null);
    if (!e || !p) return setError('empty');
    if (!COMPANY_MAIL.test(e)) return setError('domain');
    if (demoErr !== 'none') return setError(demoErr);
    setError(null);
    saveRemember(form.on, e, p);
    login();
    navigate(from?.from || PATHS.home, { replace: true });
    return undefined;
  }, [form, demoErr, login, navigate, from]);

  const goForgot = useCallback(() => {
    const e = form.e.trim();
    setResetEmail(COMPANY_MAIL.test(e) ? e : '');
    setView('forgot'); setError(null); setResetError(null); setResetSent(false); setNotice(null);
  }, [form.e]);

  const backToLogin = useCallback(() => { setView('login'); setError(null); setResetError(null); setResetSent(false); }, []);

  const sendReset = useCallback((raw) => {
    const v = (raw || '').trim();
    setResetEmail(v);
    if (!v) return setResetError(RESET_ERR.empty);
    if (!COMPANY_MAIL.test(v)) return setResetError(ERR.domain);
    setResetError(null); setResetSent(true);
    return undefined;
  }, []);

  const openResetLink = useCallback(() => { setView('reset'); setResetError(null); }, []);

  const saveNewPassword = useCallback((a, b) => {
    if (a.length < MIN_PASSWORD) return setResetError(RESET_ERR.short);
    if (a !== b) return setResetError(RESET_ERR.mismatch);
    clearRemember();
    setForm({ on: false, e: resetEmail, p: '' });
    setResetError(null); setResetSent(false); setView('login'); setError(null);
    setNotice(RESET_NOTICE);
    setFocusPw(Date.now());
    return undefined;
  }, [resetEmail]);

  const chooseDemoErr = useCallback((k) => setDemoErr(k), []);

  return {
    view, form, setForm, error, notice, demoErr, chooseDemoErr, submit, goForgot, backToLogin, pwRef,
    resetEmail, resetError, resetSent, setResetSent, sendReset, openResetLink, saveNewPassword,
  };
}
