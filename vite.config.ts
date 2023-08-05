import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({ 
    registerType: 'autoUpdate', devOptions: {
    enabled: true
    },
    includeAssets: [],
    manifest: {
      name: 'TriviaDart',
      short_name: 'Trivia🎯',
      description: 'Simple Trivia Application',
      icons: [
        {
          src: 'src/assets/dart.webp',
          sizes: '192x192',
          type: 'image/webp'
        },
        {
          src: 'src/assets/dart.webp',
          sizes: '512x512',
          type: 'image/webp'
        }
      ],
      background_color: '#000000',
    } 
  })],
})
