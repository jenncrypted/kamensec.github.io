import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
    it("renders the signature with a link to jenncrypted.io", () => {
        render(<Footer />);
        const link = screen.getByRole("link", { name: /jenncrypted\.io/i });
        expect(link).toHaveAttribute("href", "https://jenncrypted.io");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("shows the current year dynamically", () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(screen.getByText(new RegExp(`©\\s*${year}`))).toBeInTheDocument();
    });
});
