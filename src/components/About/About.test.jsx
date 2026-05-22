import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
    it("renders the about-me heading", () => {
        render(<About />);
        expect(
            screen.getByRole("heading", { level: 2, name: /about-me/i })
        ).toBeInTheDocument();
    });

    it("renders the bio that mentions Dimitri Kamenski", () => {
        render(<About />);
        expect(
            screen.getByText(/Dimitri Kamenski/i)
        ).toBeInTheDocument();
    });

    it("renders the white rabbit visual asset", () => {
        const { container } = render(<About />);
        const img = container.querySelector("img");
        expect(img).toBeInTheDocument();
        expect(img.getAttribute("src")).toContain("white-rabbit.png");
    });
});
