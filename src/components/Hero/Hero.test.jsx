import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// HeroAnimation touches refs + window APIs that aren't worth exercising here.
// Stub it so we only test Hero's own structure.
vi.mock("./HeroAnimation", () => ({
    default: () => <div data-testid="hero-animation-stub" />,
}));

import Hero from "./Hero";

describe("Hero", () => {
    it("renders the kamensec heading and subtitle", () => {
        render(<Hero />);
        expect(
            screen.getByRole("heading", { level: 1, name: /kamensec/i })
        ).toBeInTheDocument();
        expect(
            screen.getByText(/independent/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/security researcher/i)
        ).toBeInTheDocument();
    });

    it("has a contact CTA pointing to Telegram (opens in new tab safely)", () => {
        render(<Hero />);
        const contact = screen.getByRole("link", { name: /contact/i });
        expect(contact).toHaveAttribute(
            "href",
            "https://telegram.me/kamensec"
        );
        expect(contact).toHaveAttribute("target", "_blank");
        expect(contact).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("has a 'view audits' CTA pointing to the projects section", () => {
        render(<Hero />);
        const viewAudits = screen.getByRole("link", {
            name: /view audits/i,
        });
        expect(viewAudits).toHaveAttribute("href", "#works");
    });
});
