import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpotCard } from "@/components/spot-card";
import { sampleSpot } from "@/tests/fixtures";

describe("SpotCard", () => {
  it("renders spot metadata and opens detail intent on click", () => {
    const onSelect = vi.fn();

    render(<SpotCard spot={sampleSpot} index={0} onSelect={onSelect} />);

    expect(screen.getAllByText("Sample Spot").length).toBeGreaterThan(0);
    expect(screen.getAllByText("샘플 스팟").length).toBeGreaterThan(0);
    expect(screen.getByText(/dessert cafe/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith("sample-spot");
  });
});
