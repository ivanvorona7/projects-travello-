import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import { resolve } from 'path';

export default defineConfig({
  base: '/projects-travello-/', 

  plugins: [
    injectHTML(),
  ],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        directions: resolve(__dirname, 'directions.html'),
        hotels: resolve(__dirname, 'hotels.html'),
        reservation: resolve(__dirname, 'reservation.html'),
        flights: resolve(__dirname, 'flights.html'),
      }
    },
  },
});