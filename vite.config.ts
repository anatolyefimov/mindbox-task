/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@/': path.join(__dirname, 'src/'),
		},
	},
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		globals: true,
	},
})
