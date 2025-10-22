// Fix for line 1: Removed triple-slash directive causing "Cannot find type definition file for 'node'".
// The import below provides the necessary types.
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Fix for line 10: Explicitly import `process` to fix "Property 'cwd' does not exist on type 'Process'".
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    define: {
      // Vite replaces these with the actual values at build time
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID)
    }
  }
})
