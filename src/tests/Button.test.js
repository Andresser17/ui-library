import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Test button state and styles", () => {
  test("palette classes applied to component", () => {
    // Primary
    render(<Button text="primary" />);
    // Get button
    const primary = screen.getByRole("button", { name: /primary/i });
    expect(primary).toHaveClass("primary");

    // Success
    render(<Button palette="success" text="success" />);
    // Get button
    const success = screen.getByRole("button", { name: /success/i });
    expect(success).toHaveClass("success");

    // Secondary
    render(<Button palette="secondary" text="secondary" />);
    // Get button
    const secondary = screen.getByRole("button", { name: /secondary/i });
    expect(secondary).toHaveClass("secondary");
  });

  test("border is applied to component", () => {
    render(<Button border text="border on" />);
    // get button
    const border = screen.getByRole("button", { name: /border on/i });
    expect(border).toHaveClass("border-2 border-border");
    // screen.debug()
  });

  test("component is disabled", async () => {
    const user = userEvent.setup();
    let text = "hello";
    render(<Button onClick={() => (text = text + " world")} text="button" />);
    // Get button
    const button = screen.getByRole("button", { name: /button/i });
    await user.click(button);
    expect(text).toBe("hello world");

    render(
      <Button onClick={() => console.log(user)} disabled text="disabled" />
    );
    // Get button
    const disabled = screen.getByRole("button", { name: /disabled/i });
    expect(disabled).toBeDisabled();
  });

  test("component is loading, check if animate-spin class is applied", () => {
    render(<Button loading text="loading" />);
    // Get button
    const loading = screen.getByText(/loading-icon.svg/i);
    expect(loading).toHaveClass("animate-spin");
  });

  test("rounded style applied", () => {
    render(<Button rounded text="button" />);
    // Get button
    const button = screen.getByRole("button", { name: /button/i });
    expect(button).toHaveClass("rounded-lg");
  });
});

describe("All Buttons designs", () => {
  test("Label", () => {
    // Label
    render(<Button text="Label" />);
    const label = screen.getByRole("button", { name: /label/i });
    expect(label).toHaveTextContent("Label");
  });

  test("Label + icon", () => {
    // Label + icon
    render(<Button icon text="Label Icon" />);
    const labelIcon = screen.getByRole("button", { name: /label icon/i });
    expect(labelIcon).toHaveTextContent("plus-icon.svg");
    expect(labelIcon).toHaveTextContent("Label Icon");
  });

  test("Icon", () => {
    // Icon
    render(<Button icon />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("plus-icon.svg");
    expect(button).not.toHaveTextContent("Label");
  });

  test("Icon Circle", () => {
    // Icon Circle
    render(<Button icon rounded />);
    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("plus-icon.svg");
    expect(button).not.toHaveTextContent("Label");
    expect(button).toHaveClass("rounded-[50%]");
  });
});
