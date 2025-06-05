import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat"
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  eslintConfigPrettier,
]);
