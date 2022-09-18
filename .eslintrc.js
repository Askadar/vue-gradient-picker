module.exports = {
	root: true,
	env: {
		es2022: true,
		node: false,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-strongly-recommended',
		'eslint:recommended',
	],
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	rules: {
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: {
					max: 3,
				},
				multiline: {
					max: 1,
				},
			},
		],
	},
}
