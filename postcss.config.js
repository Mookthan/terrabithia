import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import desktopZoom from './build/postcss-desktop-zoom.js';

export default {
  plugins: [tailwindcss, autoprefixer, desktopZoom()],
}
