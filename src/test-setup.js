import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
});

// jsdom doesn't implement matchMedia — provide a tiny stub used by Hero animation,
// Navbar IntersectionObserver code, and the reduced-motion checks.
if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
    });
}

// jsdom doesn't implement IntersectionObserver — Navbar uses it for active-section
// detection. A minimal stub is enough since tests don't exercise scroll behavior.
if (!window.IntersectionObserver) {
    class IO {
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    }
    window.IntersectionObserver = IO;
}
