import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Test if props are working fine", () => {
  test("Text is displayed", () => {
    render(<Badge text="Hello World" />);
    const badge = screen.getByText(/hello world/i);
    expect(badge).toHaveTextContent("Hello World")
  });

  test("border is added to className", () => {
    render(<Badge border text="Hello World" />);
    const badge = screen.getByText(/hello world/i);
    expect(badge).toHaveClass("border-2")
  });

  test("rounded-3xl is added to className", () => {
    render(<Badge rounded text="Hello World" />);
    const badge = screen.getByText(/hello world/i);
    expect(badge).not.toHaveClass("rounded-sm")
    expect(badge).toHaveClass("rounded-3xl")
  });
});
