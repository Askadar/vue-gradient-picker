import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), dts()],

	build: {
		minify: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'vue-gradient-picker',
			formats: ['umd', 'es'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
})
