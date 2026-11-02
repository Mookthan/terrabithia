import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import LoginBar from './components/LoginBar';
import LoginCard from './components/LoginCard';
import LoginForm from './components/LoginForm';
import { ForgotView, NewPasswordView, ResetSentView } from './components/ResetViews';
import useLoginFlow from './hooks/useLoginFlow';

/** Sign-in page (header hidden), including the forgot / reset password flow. */
export default function LoginPage() {
  const navigate = useNavigate();
  const f = useLoginFlow();

  let content;
  if (f.view === 'reset') {
    content = <NewPasswordView email={f.resetEmail} error={f.resetError} onBack={f.backToLogin} onSave={f.saveNewPassword} />;
  } else if (f.view === 'forgot' && f.resetSent) {
    content = <ResetSentView email={f.resetEmail} onBack={f.backToLogin} onOpenLink={f.openResetLink} onResend={() => f.setResetSent(false)} />;
  } else if (f.view === 'forgot') {
    content = <ForgotView email={f.resetEmail} error={f.resetError} onBack={f.backToLogin} onSend={f.sendReset} />;
  }

  return (
    <div data-pt="fade" className="text-[14px] flex min-h-[76vh] items-center justify-center max-[640px]:items-start max-[640px]:pt-11">
      <div className="w-[380px] max-w-full">
        <LoginBar onBack={f.view === 'login' ? () => navigate(PATHS.home) : null} />
        <LoginCard>
          {content ? <div className="text-left">{content}</div> : (
            <LoginForm
              form={f.form}
              setForm={f.setForm}
              error={f.error}
              notice={f.notice}
              demoErr={f.demoErr}
              onDemoErr={f.chooseDemoErr}
              onSubmit={f.submit}
              onForgot={f.goForgot}
              pwRef={f.pwRef}
            />
          )}
        </LoginCard>
      </div>
    </div>
  );
}
