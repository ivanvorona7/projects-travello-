import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  // Настройка сервера для удобства
  server: {
    open: true, // Автоматически открывать браузер при запуске
  },
  plugins: [injectHTML()],
});