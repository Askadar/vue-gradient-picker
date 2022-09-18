import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), dts()],

	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'vue-gradient-picker',
			fileName: (format) => `vue-gradient-picker.${format}.js`,
		},
		rollupOptions: {
			external: ['vue', '@ckpack/vue-color'],
			output: {
				globals: {
					vue: 'Vue',
					'@ckpack/vue-color': '@ckpack/vue-color',
				},
			},
		},
	},
})
