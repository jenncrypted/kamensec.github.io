import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Stub EmailJS so submitting the form doesn't hit the network in tests.
vi.mock("@emailjs/browser", () => ({
    default: {
        sendForm: vi.fn(() => Promise.resolve({ status: 200, text: "OK" })),
    },
}));

import Contact from "./Contact";
import emailjs from "@emailjs/browser";

describe("Contact", () => {
    it("renders the intro and three form fields", () => {
        render(<Contact />);
        expect(screen.getByText(/For audits/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("your name")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("you@example.com")
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/what's on your mind/i)
        ).toBeInTheDocument();
    });

    it("renders the alternative contact channels", () => {
        render(<Contact />);
        expect(
            screen.getByRole("link", { name: /kamensec@proton\.me/i })
        ).toHaveAttribute("href", "mailto:kamensec@proton.me");

        // Telegram and X both render their handle as "@kamensec".
        // Find both via the handle text and assert each anchor's href.
        const handles = screen.getAllByText("@kamensec");
        expect(handles).toHaveLength(2);
        const hrefs = handles.map((el) =>
            el.closest("a").getAttribute("href")
        );
        expect(hrefs).toContain("https://telegram.me/kamensec");
        expect(hrefs).toContain("https://x.com/kamensec");
    });

    it("calls emailjs.sendForm on submit and shows a success state", async () => {
        const user = userEvent.setup();
        render(<Contact />);

        await user.type(screen.getByPlaceholderText("your name"), "Tester");
        await user.type(
            screen.getByPlaceholderText("you@example.com"),
            "test@example.com"
        );
        await user.type(
            screen.getByPlaceholderText(/what's on your mind/i),
            "Hello there"
        );

        await user.click(screen.getByRole("button", { name: /submit/i }));

        expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
        expect(
            await screen.findByText(/message sent/i)
        ).toBeInTheDocument();
    });
});
