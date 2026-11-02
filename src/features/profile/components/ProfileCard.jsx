/** White rounded card (the prototype's `.card`). */
export default function ProfileCard({ children }) {
  return (
    <div data-reveal className="mb-4 rounded-box bg-white px-6 py-[22px] shadow-card">
      {children}
    </div>
  );
}
