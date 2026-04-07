import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/hero";
import { sampleProfile } from "@/tests/fixtures";

describe("Hero", () => {
  it("renders the personalized heading and curator profile even without accent colors", () => {
    render(<Hero profile={sampleProfile} />);

    expect(screen.getByText("Mina's Seoul Edit")).toBeInTheDocument();
    expect(screen.getByText("Mina")).toBeInTheDocument();
  });
});
