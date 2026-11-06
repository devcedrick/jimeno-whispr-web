import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Existing code predates these rules. Keep them visible as warnings so
      // CI can gate type and lint errors without failing on legacy debt.
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Turn off ESLint rules that conflict with Prettier. Keep this last so it
  // can override formatting-related rules from the Next.js configs.
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated output and local-only files:
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
    "playwright/.cache/**",
    ".opencode/**",
    ".specify/**",
    "specs/**",
  ]),
]);

export default eslintConfig;
