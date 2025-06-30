import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopicTitle } from "./index";

describe("TopicTitle", () => {
  test("render a h2 when size is lg and noBorder is false", () => {
    render(<TopicTitle title="test title" size="lg" />);
    expect(screen.getByRole("heading", { level: 2, name: "test title" })).toBeInTheDocument();
  });

  test("render a h3 when size is md and noBorder is false", () => {
    render(<TopicTitle title="test title" size="md" />);
    expect(screen.getByRole("heading", { level: 3, name: "test title" })).toBeInTheDocument();
  });

  test("render a h4 when size is sm and noBorder is false", () => {
    render(<TopicTitle title="test title" size="sm" />);
    expect(screen.getByRole("heading", { level: 4, name: "test title" })).toBeInTheDocument();
  });
});
