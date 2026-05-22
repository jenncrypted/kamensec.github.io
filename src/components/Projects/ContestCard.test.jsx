import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContestCard from "./ContestCard";

const sampleContest = {
    platform: "codehawks",
    title: "Tadle",
    date: "Aug 2024",
    findings: {
        high: [
            {
                title: "Makers Can Gain Profit By Aborting Trades",
                link: "https://example.com/finding/1",
                unique: false,
            },
            {
                title: "Loss Of Funds Due To Unreachable Allowance",
                link: "https://example.com/finding/2",
                unique: false,
            },
        ],
    },
};

describe("ContestCard", () => {
    it("renders contest title, date, and platform header", () => {
        render(<ContestCard contest={sampleContest} />);
        expect(screen.getByText("Tadle")).toBeInTheDocument();
        expect(screen.getByText("Aug 2024")).toBeInTheDocument();
        expect(screen.getByText(/--platform/)).toBeInTheDocument();
        expect(screen.getByText(/codehawks/)).toBeInTheDocument();
    });

    it("renders a severity badge with the correct count", () => {
        render(<ContestCard contest={sampleContest} />);
        expect(screen.getByText(/2 high/)).toBeInTheDocument();
    });

    it("renders each finding as an external link", () => {
        render(<ContestCard contest={sampleContest} />);
        const findings = screen.getAllByRole("link");
        expect(findings).toHaveLength(2);
        expect(findings[0]).toHaveAttribute(
            "href",
            "https://example.com/finding/1"
        );
        expect(findings[0]).toHaveAttribute("target", "_blank");
        expect(findings[0]).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("toggles aria-expanded when the show/hide button is clicked", async () => {
        const user = userEvent.setup();
        render(<ContestCard contest={sampleContest} />);
        const toggle = screen.getByRole("button", { name: /show findings/i });
        expect(toggle).toHaveAttribute("aria-expanded", "false");
        await user.click(toggle);
        const hideBtn = screen.getByRole("button", { name: /hide findings/i });
        expect(hideBtn).toHaveAttribute("aria-expanded", "true");
    });

    it("does not render the toggle when there are no findings", () => {
        render(
            <ContestCard
                contest={{ ...sampleContest, findings: {} }}
            />
        );
        expect(
            screen.queryByRole("button", { name: /findings/i })
        ).not.toBeInTheDocument();
    });
});
