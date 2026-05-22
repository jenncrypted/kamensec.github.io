import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";

describe("Navbar", () => {
    it("renders the 3 section links", () => {
        render(<Navbar />);
        expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute(
            "href",
            "#works"
        );
        expect(screen.getByRole("link", { name: /about-me/i })).toHaveAttribute(
            "href",
            "#about-me"
        );
        expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
            "href",
            "#contact"
        );
    });

    it("renders the mobile menu button with proper a11y attrs", () => {
        render(<Navbar />);
        const btn = screen.getByRole("button", { name: /open menu/i });
        expect(btn).toHaveAttribute("aria-expanded", "false");
        expect(btn).toHaveAttribute("aria-controls", "primary-menu");
    });

    it("toggles aria-expanded when the menu button is clicked", async () => {
        const user = userEvent.setup();
        render(<Navbar />);
        const btn = screen.getByRole("button", { name: /open menu/i });
        await user.click(btn);
        const closeBtn = screen.getByRole("button", { name: /close menu/i });
        expect(closeBtn).toHaveAttribute("aria-expanded", "true");
    });
});
