import globals from "globals";
import pluginJs from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-plugin-prettier";

export default [
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                // 없으면 babelParser 동작 안함
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: ["@babel/preset-env"],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            ...pluginJs.configs.recommended,
            "@stylistic": stylistic,
            ...prettier,
        },
        rules: {
            indent: ["error", 4, { SwitchCase: 1 }], // https://eslint.org/docs/latest/rules/indent
            semi: "error", // https://eslint.org/docs/latest/rules/semi
            camelcase: ["error", { properties: "always" }], // https://eslint.org/docs/latest/rules/camelcase
            "no-var": "error", // https://eslint.org/docs/latest/rules/no-var
            "prefer-arrow-callback": "error", // https://eslint.org/docs/latest/rules/prefer-arrow-callback
            "no-object-constructor": "error", // https://eslint.org/docs/latest/rules/no-object-constructor
            "no-array-constructor": "error", // https://eslint.org/docs/latest/rules/no-array-constructor
            "no-new-wrappers": "error", // https://eslint.org/docs/latest/rules/no-new-wrappers
            "no-new-func": "error", // https://eslint.org/docs/latest/rules/no-new-func
            "object-shorthand": "error", // https://eslint.org/docs/latest/rules/object-shorthand
            eqeqeq: ["error", "always"], // https://eslint.org/docs/latest/rules/eqeqeq
            "prefer-template": "error", // https://eslint.org/docs/latest/rules/prefer-template
            "@stylistic/array-bracket-newline": ["error", { multiline: true }], // https://eslint.style/rules/js/array-bracket-newline#multiline
            "@stylistic/function-call-spacing": ["error", "never"], // https://eslint.style/rules/default/function-call-spacing
            "@stylistic/space-before-function-paren": ["error", "never"], // https://eslint.style/rules/default/space-before-function-paren
            "@stylistic/arrow-parens": ["error", "always"], // https://eslint.style/rules/default/arrow-parens
            "@stylistic/arrow-spacing": "error", // https://eslint.style/rules/default/arrow-spacing
            "@stylistic/no-confusing-arrow": "error", // https://eslint.style/rules/default/no-confusing-arrow
            "@stylistic/implicit-arrow-linebreak": ["error", "beside"], // https://eslint.style/rules/js/implicit-arrow-linebreak
            "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }], // https://eslint.style/rules/js/brace-style
            "@stylistic/keyword-spacing": "error", // https://eslint.style/rules/js/keyword-spacing
            "@stylistic/space-before-function-paren": [
                "error",
                {
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "always",
                },
            ],
        },
    },
];
