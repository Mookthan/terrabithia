/** On/off switch (role="switch"). Teal when on; `disabled` for settings that are always on. */
export default function Switch({ on, onChange, label, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`relative h-[22px] w-[38px] flex-none cursor-pointer rounded-full border-0 p-0 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-55 ${on ? 'bg-teal-bright' : 'bg-faint'}`}
    >
      <span className={`absolute left-[3px] top-[3px] h-4 w-4 rounded-full bg-white shadow-card transition-transform duration-200 motion-reduce:transition-none ${on ? 'translate-x-4' : ''}`} />
    </button>
  );
}
