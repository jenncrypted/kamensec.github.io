import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "./Projects";

describe("Projects", () => {
    it("renders all 3 tabs", () => {
        render(<Projects />);
        expect(
            screen.getByRole("tab", { name: /audits/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("tab", { name: /contests/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("tab", { name: /judging/i })
        ).toBeInTheDocument();
    });

    it("defaults to the audits tab", () => {
        render(<Projects />);
        const auditsTab = screen.getByRole("tab", { name: /audits/i });
        expect(auditsTab).toHaveAttribute("aria-selected", "true");
    });

    it("switches to the contests panel when the contests tab is clicked", async () => {
        const user = userEvent.setup();
        render(<Projects />);
        await user.click(screen.getByRole("tab", { name: /contests/i }));
        expect(
            screen.getByRole("tab", { name: /contests/i })
        ).toHaveAttribute("aria-selected", "true");
        expect(
            screen.getByRole("tab", { name: /audits/i })
        ).toHaveAttribute("aria-selected", "false");
    });

    it("shows the terminal-style pending placeholder when the judging tab is active", async () => {
        const user = userEvent.setup();
        render(<Projects />);
        await user.click(screen.getByRole("tab", { name: /judging/i }));
        expect(screen.getByText("pending")).toBeInTheDocument();
        expect(screen.getByText(/awaiting entries for/i)).toBeInTheDocument();
        expect(screen.getByText(/contest reviews/i)).toBeInTheDocument();
    });
});
