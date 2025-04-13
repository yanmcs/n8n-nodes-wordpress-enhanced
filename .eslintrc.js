module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	ignorePatterns: ['.eslintrc.js', 'gulpfile.js', 'dist/', 'node_modules/'],
	plugins: ['@typescript-eslint', 'eslint-plugin-n8n-nodes-base'],
	extends: ['eslint:recommended', 'plugin:n8n-nodes-base/community'],
	rules: {
		// Add any project-specific rule overrides here
	},
};
