import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	root: 'frontend',
	base: '/',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		assetsDir: 'assets',
	},
});
