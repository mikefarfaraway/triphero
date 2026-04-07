import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpotDetailSheet } from "@/components/spot-detail-sheet";
import { sampleProfile, sampleRelatedSpot, sampleSpot } from "@/tests/fixtures";
import { renderWithI18n } from "@/tests/test-utils";

describe("SpotDetailSheet", () => {
  it("renders long-form details and related spots without requiring optional coordinates", () => {
    const onClose = vi.fn();
    const onSelectRelated = vi.fn();

    renderWithI18n(
      <SpotDetailSheet
        spot={sampleSpot}
        relatedSpots={[sampleRelatedSpot]}
        curator={sampleProfile.curator}
        onClose={onClose}
        onSelectRelated={onSelectRelated}
      />,
    );

    expect(screen.getByRole("dialog", { name: "Sample Spot details" })).toBeInTheDocument();
    expect(screen.getByText(/Because it feels soft and personal\./)).toBeInTheDocument();
    expect(screen.getByText("Open in Google Maps")).toBeInTheDocument();
    expect(screen.getByAltText("Mina portrait")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /related sample/i }));
    expect(onSelectRelated).toHaveBeenCalledWith("related-sample");
  });
});
