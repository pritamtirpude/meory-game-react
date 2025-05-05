import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskable_icon_x192.png',
        'maskable_icon_x512.png',
      ],
      manifest: {
        name: 'Memory',
        short_name: 'Memory',
        start_url: '/',
        theme_color: '#152937',
        background_color: '#fda517',
        scope: '/',
        display: 'standalone',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable_icon_x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/maskable_icon_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        description:
          'Modern memory game where players take turns matching icons in a fun and minimal interface.',
        screenshots: [
          {
            src: '/wide-one.png',
            sizes: '2549x1704',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/wide-two.png',
            sizes: '2549x1704',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/wide-three.png',
            sizes: '2549x1704',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/narrow-one.png',
            sizes: '540x361',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/narrow-two.png',
            sizes: '540x361',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/narrow-three.png',
            sizes: '540x361',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,woff2,ttf}'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/, // Cache image files
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50, // Limit the number of images cached
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/, // Cache JS and CSS files
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources-cache',
              expiration: {
                maxEntries: 50, // Limit the number of files cached
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:html)$/, // Cache HTML files
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10, // Limit the number of HTML files cached
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
});
