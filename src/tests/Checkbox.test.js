import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../Checkbox";

describe("Test checkbox props, state and styles", () => {
  test("palette classes applied to component", () => {
    // Primary
    render(<Checkbox label="primary" value="primary" />);
    // Get checkbox
    const primary = screen.getByLabelText(/primary/i);
    const primaryCont = primary.parentElement;
    expect(primaryCont).toHaveClass("primary");

    // Success
    render(<Checkbox label="success" value="success" palette="success" />);
    // Get checkbox
    const success = screen.getByLabelText(/success/i);
    const successCont = success.parentElement;
    expect(successCont).toHaveClass("success");

    // Secondary
    render(<Checkbox label="secondary" value="secondary" palette="secondary" />);
    // Get checkbox
    const secondary = screen.getByLabelText(/secondary/i);
    const secondaryCont = secondary.parentElement;
    expect(secondaryCont).toHaveClass("secondary");
  });

  test("Component error", async () => {
    render(<Checkbox error label="secondary" value="secondary" />);
    // Get checkbox
    const checkbox = screen.getByLabelText(/secondary/i);
    expect(checkbox).toHaveClass("bg-red-300");
    // get label
    const label = screen.getByText(/secondary/i);
    expect(label).not.toHaveClass("text-text");
    expect(label).toHaveClass("text-red-300");
  });

  test("onClick function pass has prop", async () => {
    const user = userEvent.setup();
    let message = "hello"
    const handleClick = (e) => message += ` ${e.target.value}`
    render(<Checkbox onClick={handleClick} label="checkbox" value="world" />);
    // Get checkbox
    const checkbox = screen.getByLabelText(/checkbox/i);
    await user.click(checkbox);
    expect(message).toBe("hello world");
  });

  test("Component is disabled", async () => {
    const user = userEvent.setup();
    let message = "hello"
    const handleClick = (e) => message += ` ${e.target.value}`
    render(<Checkbox onClick={handleClick} disabled label="checkbox" value="world" />);
    // Get checkbox
    const checkbox = screen.getByLabelText(/checkbox/i);
    await user.click(checkbox);
    expect(message).toBe("hello");
  });

  test("Label text pass has prop", () => {
    render(<Checkbox label="checkbox" value="world" />);
    // Get checkbox
    const checkbox = screen.getByText(/checkbox/i);
    expect(checkbox.innerHTML).toBe("checkbox");
  });

  test("Indeterminate state", () => {
    render(<Checkbox indeterminate label="checkbox" value="world" />);
    // Get checkbox
    const checkbox = screen.getByLabelText(/checkbox/i);
    expect(checkbox.indeterminate).toBeTruthy();
  });

  test("Create id from label prop (replace blank space with hyphen -)", () => {
    render(<Checkbox label="neo new index" value="world" />);
    // Get checkbox
    const checkbox = screen.getByLabelText(/neo new index/i);
    expect(checkbox.id).toBe("neo-new-index");
  });
});
