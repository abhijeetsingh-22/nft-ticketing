var tsConfigs = ["./tsconfig.json"];
var tsConfigEmail = ["./tsconfig-emails.json"];

var srcRuleOverrides = {
	"prettier/prettier": 1,
	"@typescript-eslint/no-unused-vars": 1,
	"@typescript-eslint/no-non-null-assertion": "error",
	"no-restricted-imports": [
		"error",
		{
			paths: [
				{
					name: "lucide-react/dist/esm/icons",
					message:
						'Please import from "lucide-react" instead of "lucide-react/dist/esm/icons".',
				},
			],
			patterns: ["!lucide-react"],
		},
	],
};

module.exports = {
	overrides: [
		{
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"prettier",
				"plugin:@next/next/recommended",
			],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: tsConfigs,
			},
			plugins: ["@typescript-eslint", "prettier"],
			rules: srcRuleOverrides,
			files: ["src/**/*.ts", "src/**/*.tsx"],
		},
		{
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"prettier",
				"plugin:@next/next/recommended",
			],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: tsConfigEmail,
			},
			plugins: ["@typescript-eslint", "prettier"],
			rules: srcRuleOverrides,
			files: ["emails/**/*.ts", "emails/**/*.tsx"],
		},
		{
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"prettier",
			],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: tsConfigs,
			},
			plugins: [
				"@typescript-eslint",
				"plugin:playwright/playwright-test",
				"prettier",
			],
			rules: srcRuleOverrides,
			files: ["e2e/**/*.ts"],
		},

		{
			extends: ["eslint:recommended", "prettier"],
			files: "*.mjs",
		},
		// make nextconfig.mjs node environment
		{
			extends: [
				"eslint:recommended",
				"prettier",
				"plugin:@next/next/recommended",
			],
			files: "next.config.mjs",
		},
	],
	extends: ["plugin:@next/next/recommended"],
	root: true,
};
