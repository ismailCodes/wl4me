module.exports = {
	extends: ['airbnb', 'airbnb-typescript', 'prettier', 'plugin:react-hooks/recommended'],
	parserOptions: {
		project: ['./tsconfig.json'],
	},
	rules: {
		'react/no-unescaped-entities': 'off',
		'@next/next/no-page-custom-font': 'off',
		'react/jsx-no-target-blank': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'jsx-a11y/alt-text': 'off',
	},
};
