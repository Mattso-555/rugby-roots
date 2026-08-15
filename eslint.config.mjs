import react from "eslint-plugin-react";
export default [
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window:"readonly", document:"readonly", localStorage:"readonly",
        navigator:"readonly", console:"readonly", setTimeout:"readonly",
        clearTimeout:"readonly", Blob:"readonly", URL:"readonly",
        FileReader:"readonly", alert:"readonly", confirm:"readonly",
        Date:"readonly", JSON:"readonly", Object:"readonly", Array:"readonly",
        Math:"readonly", String:"readonly", Number:"readonly", Boolean:"readonly",
        Promise:"readonly", Error:"readonly", Set:"readonly", Map:"readonly",
        isNaN:"readonly", parseInt:"readonly", parseFloat:"readonly",
        URLSearchParams:"readonly", history:"readonly",
        setInterval:"readonly", clearInterval:"readonly"
      },
    },
    rules: {
      "no-undef": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^React$" }],
    },
  },
];
