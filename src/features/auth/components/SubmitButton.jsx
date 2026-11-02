/** Full-width teal button of the login forms. */
export default function SubmitButton({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="mb-4 w-full cursor-pointer rounded-ctl border-none bg-teal-bright hover:!bg-teal-hover transition-colors duration-200 p-3 text-[14px] font-semibold text-white">
      {children}
    </button>
  );
}
