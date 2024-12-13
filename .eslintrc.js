module.exports = {
  extends: [
    "expo",
    "prettier",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
