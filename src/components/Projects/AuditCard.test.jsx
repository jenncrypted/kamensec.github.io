import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuditCard from "./AuditCard";

const sampleAudit = {
    title: "EigenLayer",
    scope: "M2 Core",
    firm: "Sigma Prime",
    year: 2024,
    tags: ["Restaking"],
    stack: "Solidity · EVM",
    source: "https://example.com/report.pdf",
};

describe("AuditCard", () => {
    it("renders audit title, scope, firm, year, stack, and tags", () => {
        render(<AuditCard audit={sampleAudit} />);
        expect(screen.getByText("EigenLayer")).toBeInTheDocument();
        expect(screen.getByText("M2 Core")).toBeInTheDocument();
        expect(screen.getByText("Sigma Prime")).toBeInTheDocument();
        expect(screen.getByText(/--year/)).toBeInTheDocument();
        expect(screen.getByText("Solidity · EVM")).toBeInTheDocument();
        expect(screen.getByText("Restaking")).toBeInTheDocument();
    });

    it("renders the report link as external safely", () => {
        render(<AuditCard audit={sampleAudit} />);
        const link = screen.getByRole("link", { name: /view report/i });
        expect(link).toHaveAttribute("href", sampleAudit.source);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("skips the scope row when tags are empty", () => {
        render(<AuditCard audit={{ ...sampleAudit, tags: [] }} />);
        // The dt label "scope" comes from tags; with no tags it shouldn't render
        // (the dt for "firm" and "stack" still does).
        const scopeLabels = screen.queryAllByText("scope");
        expect(scopeLabels).toHaveLength(0);
    });
});
