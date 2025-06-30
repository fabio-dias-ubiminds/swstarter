import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { DetailsPage } from "./DetailsPage";

test("Page", () => {
  vi.mock("@/components/BackButton", () => ({
    BackButton: () => <button>Back</button>,
  }));

  vi.mock("@/components/SwContainer", () => ({
    SwContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));

  render(
    <DetailsPage
      leftContent={<div>Left Content</div>}
      rightContent={<div>Right Content</div>}
      title="Test Title"
    />
  );
  expect(screen.getByText("Left Content")).toBeInTheDocument();
  expect(screen.getByText("Right Content")).toBeInTheDocument();
  expect(screen.getByText("Test Title")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
});
