/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/kamensec.github.io/",
    plugins: [react()],
    css: {
        modules: {
            localsConvention: "camelCase",
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/test-setup.js"],
        css: { modules: { classNameStrategy: "non-scoped" } },
    },
});
