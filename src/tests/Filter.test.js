import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("palettes, filters and onClick function", () => {
  test("receive an array and print filters", () => {
    render(<Filter items={["Tea", "Coffee"]} />);
    const tea = screen.getByText(/tea/i);
    expect(tea).toHaveTextContent("Tea");

    const coffee = screen.getByText(/coffee/i);
    expect(coffee).toHaveTextContent("Coffee");
  });

  describe("palettes", () => {
    test("apply primary", () => {
      render(<Filter items={["Tea", "Coffee"]} />);
      const filter = screen.getByText(/tea/i);
      expect(filter).toHaveClass("primary");
    });

    test("apply secondary", () => {
      render(<Filter palette="secondary" items={["Tea", "Coffee"]} />);
      const filter = screen.getByText(/tea/i);
      expect(filter).toHaveClass("secondary");
    });

    test("apply success", () => {
      render(<Filter palette="success" items={["Tea", "Coffee"]} />);
      const filter = screen.getByText(/tea/i);
      expect(filter).toHaveClass("success");
    });
  });

  test("onClick, return text value, in lowercase", async () => {
    const user = userEvent.setup();
    let filterText;
    render(
      <Filter
        onClick={(text) => {
          filterText = text;
        }}
        items={["Tea", "Coffee"]}
      />
    );
    const filter = screen.getByText(/tea/i);

    // call onClick function
    await user.click(filter);

    expect(filterText).toBe("tea");
  });
});
