import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const url = new URL('./src', import.meta.url);

export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "${url}/assets/scss/partials/_vars.scss";
          @import "${url}/assets/scss/partials/_mixins.scss";
          @import "${url}/assets/scss/partials/_media.scss";`
      }
    }
  },
  server: {
    port: 5991,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(url)
    }
  }
});