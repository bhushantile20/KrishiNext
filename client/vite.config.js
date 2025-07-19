// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {https: true},
//   plugins: [react()],
// })


// import { defineConfig } from "vite";
// import mkcert from "vite-plugin-mkcert";

// export default defineConfig({
//   server: { https: true },
//   plugins: [mkcert()],
// });

import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [mkcert()],
  build: {
    outDir: 'dist', // <-- This is required for the publish directory
  },
  server: {
    https: true, // for local only
  },
});

