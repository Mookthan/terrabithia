/** The small on/off pill used by the privacy settings. */
export default function Switch({ on }) {
  return (
    <i
      className={`relative h-6 w-10 flex-none rounded-full transition-[background] duration-200 after:absolute after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:shadow-card after:transition-[left] after:duration-200 after:content-[''] ${
        on ? 'bg-teal-bright after:left-[19px]' : 'bg-[#D5D2C6] after:left-[3px]'
      }`}
    />
  );
}
