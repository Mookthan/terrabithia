/**
 * Icon-only buttons: a teal-veil circle (#12986F at 12%) appears on hover, so it shows on any background.
 * The icon pops a little on hover (.icon-pop in index.css). Add a size (h-8 w-8 …) and the icon colour where it is used.
 */
export const ICON_HOVER = 'icon-pop rounded-full transition-colors duration-200 hover:bg-teal-veil';
export const ICON_BTN = `inline-grid flex-none cursor-pointer place-items-center border-0 bg-transparent p-0 ${ICON_HOVER}`;
