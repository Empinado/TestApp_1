module.exports = {
  root: true,
  env: {
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": "off", // или 'warn'
    "vue/no-unused-vars": "warn",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
      },
    },
  ],
};
