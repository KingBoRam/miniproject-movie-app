module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {ecmaVersion: "latest", sourceType: "module"},
  settings: {react: {version: "18.2"}},
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    // "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      {allowConstantExport: true},
    ],
  },
};

// React eslint error missing in props validation 해결방법 :  https://velog.io/@fenjo/React-eslint-error-missing-in-props-validation-%ED%95%B4%EA%B2%B0%EB%B0%A9%EB%B2%95
