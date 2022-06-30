import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputTag from "../InputTag";
let globalDatabase = {};

xdescribe("input state and styles", () => {
  beforeAll(() => {
    globalDatabase = { err: console.error };
  });

  afterEach(() => {
    console.error = globalDatabase.err;
  });

  describe("palette classes applied to component", () => {
    test("applied primary", () => {
      const handleInput = (input, mergeData) => {
        console.log(input)
      }

      // Primary
      render(<InputTag getInput={handleInput} description="primary" placeholder="primary" />);
      // Get button
      const primary = screen.getByText(/primary/i);
      const primaryCont = primary.parentElement;
      expect(primaryCont).toHaveClass("primary");
    });

    test("applied success", () => {
      // Secondary
      render(
        <InputTag
          palette="secondary"
          description="secondary"
          placeholder="secondary"
        />
      );
      // Get button
      const secondary = screen.getByText(/secondary/i);
      const secondaryCont = secondary.parentElement;
      expect(secondaryCont).toHaveClass("secondary");
    });

    test("applied success", () => {
      // Success
      render(
        <InputTag
          palette="success"
          description="success"
          placeholder="success"
        />
      );
      // Get button
      const success = screen.getByText(/success/i);
      const successCont = success.parentElement;
      expect(successCont).toHaveClass("success");
    });
  });

  test("getData function", async () => {
    const user = userEvent.setup();

    let text = "";
    const handleData = (tags) => {
      text = tags[0];
    };
    render(<InputTag getData={handleData} placeholder="primary" />);

    // get input
    const input = screen.getByPlaceholderText(/primary/i);

    await user.type(input, "tag1{enter}");

    expect(text).toBe("tag1");
  });

  test("type property only accept text or number, if not throw an error", async () => {
    console.error = jest.fn();
    const input = () =>
      render(<InputTag type="number" placeholder="primary" />);

    expect(input).toThrowError("type property only accept text and password");
  });

  test("display description prop, on label", async () => {
    render(
      <InputTag
        id="first-input"
        placeholder="primary"
        description="Input description"
      />
    );
    screen.getByText(/input description/i);
  });

  test("display tags on input", async () => {
    const user = userEvent.setup();

    let text = [];
    const handleData = (tags, setData) => {
      text = [...tags];
      setData({}, tags);
    };
    render(<InputTag getData={handleData} placeholder="primary" />);

    // get input
    const input = screen.getByPlaceholderText(/primary/i);

    await user.type(input, "tea{enter}");
    await user.type(input, "coffee{enter}");
    await user.type(input, "water{enter}");

    expect(text).toStrictEqual(["tea", "coffee", "water"]);

    // get tags
    screen.getByText(/tea/i);
    screen.getByText("coffee");
    screen.getByText("water");
  });

  describe("status", () => {
    test("error state", async () => {
      const user = userEvent.setup();

      // validate text
      const handleData = (tags, setStatus) => {
        if (tags[0] === "example@email.com") {
          return;
        }

        setStatus({ code: 2, message: "Invalid email!" });
      };
      render(
        <InputTag
          getData={handleData}
          placeholder="primary"
          description="A normal description"
        />
      );

      // get input
      const input = screen.getByPlaceholderText(/primary/i);

      await user.type(input, "example@gmail.com{enter}");

      expect(input.parentElement).toHaveClass("bg-red-200");

      // get description
      const descrip = screen.getByText("Invalid email!");
      expect(descrip).toHaveClass("text-bg danger");
    });

    test("success state", async () => {
      const user = userEvent.setup();

      // validate text
      const handleData = (tags, setData) => {
        if (tags[0] === "tag1") {
          setData({ code: 1 }, tags);
        }
      };
      render(<InputTag getData={handleData} placeholder="primary" />);

      // get input
      const input = screen.getByPlaceholderText(/primary/i);

      await user.type(input, "tag1{enter}");

      expect(input.parentElement).toHaveClass("bg-green-200");
    });
  });
});
