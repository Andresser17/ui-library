import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";
let globalDatabase = {};

describe("input state and styles", () => {
  beforeAll(() => {
    globalDatabase = { err: console.error };
  });

  afterEach(() => {
    console.error = globalDatabase.err;
  });

  describe("palette classes applied to component", () => {
    test("applied primary", () => {
      // Primary
      render(<Input placeholder="primary" />);
      // Get button
      const primary = screen.getByPlaceholderText(/primary/i);
      expect(primary).toHaveClass("primary");
    });

    test("applied success", () => {
      // Secondary
      render(<Input palette="secondary" placeholder="secondary" />);
      // Get button
      const secondary = screen.getByPlaceholderText(/secondary/i);
      expect(secondary).toHaveClass("secondary");
    });

    test("applied success", () => {
      // Success
      render(<Input palette="success" placeholder="success" />);
      // Get button
      const success = screen.getByPlaceholderText(/success/i);
      expect(success).toHaveClass("success");
    });
  });

  test("getData function", async () => {
    const user = userEvent.setup();

    let text = "";
    const handleData = (data) => {
      text = data;
    };
    render(<Input getData={handleData} placeholder="primary" />);

    // get input
    const input = screen.getByPlaceholderText(/primary/i);

    await user.type(input, "hello world");

    expect(text).toBe("hello world");
  });

  test("readonly input", async () => {
    const user = userEvent.setup();

    let text = "";
    const handleChange = (e) => {
      text = e.target.value;
    };
    render(
      <Input
        onChange={handleChange}
        readOnly
        placeholder="primary"
        defaultValue="Hello,"
      />
    );

    // get input
    const input = screen.getByPlaceholderText(/primary/i);

    await user.type(input, " world");

    expect(text).toBe("");
  });

  test("type property only accept text or number, if not throw an error", async () => {
    console.error = jest.fn();
    const input = () => render(<Input type="number" placeholder="primary" />);

    expect(input).toThrowError("type property only accept text and password");
  });

  test("display description prop, on label", async () => {
    render(
      <Input
        id="first-input"
        placeholder="primary"
        description="Input description"
      />
    );
    screen.getByText(/input description/i);
  });

  describe("status", () => {
    test("error state", async () => {
      const user = userEvent.setup();

      // validate text
      const handleData = (data, setStatus) => {
        if (data === "example@email.com") {
          return;
        }

        setStatus({ code: 2, message: "Invalid email!" });
      };
      render(
        <Input
          getData={handleData}
          placeholder="primary"
          description="A normal description"
        />
      );

      // get input
      const input = screen.getByPlaceholderText(/primary/i);

      await user.type(input, "example@gmail.com");

      expect(input).toHaveClass("bg-red-200");

      // get description
      const descrip = screen.getByText("Invalid email!");
      expect(descrip).toHaveClass("text-bg danger");
    });

    test("success state", async () => {
      const user = userEvent.setup();

      // validate text
      const handleData = (data, setStatus) => {
        if (data === "example@email.com") {
          setStatus({ code: 1 });
        }
      };
      render(<Input getData={handleData} placeholder="primary" />);

      // get input
      const input = screen.getByPlaceholderText(/primary/i);

      await user.type(input, "example@email.com");

      expect(input).toHaveClass("bg-green-200");
    });
  });
});
