import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Notification from "../Notification";

describe("palettes, modes, states and mobile", () => {
  describe("palettes", () => {
    test("apply primary", () => {
      render(<Notification header="Head" />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont).toHaveClass("primary");
    });

    test("apply secondary", () => {
      render(<Notification palette="secondary" header="Head" />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont).toHaveClass("secondary");
    });

    test("apply success", () => {
      render(<Notification palette="success" header="Head" />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont).toHaveClass("success");
    });
  });

  describe("designs", () => {
    test("without header", () => {
      render(<Notification description="Description" buttons />);
      const noti = screen.getByText(/description/i);
      const notiCont = noti.parentElement;
      expect(notiCont.children.length).toBe(2);
    });

    test("without buttons", () => {
      render(<Notification header="Head" description="Description" />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont.children.length).toBe(2);
    });

    test("without description", () => {
      render(<Notification header="Head" buttons />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont.children.length).toBe(2);
    });

    test("without description and buttons", () => {
      render(<Notification header="Head" />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont.children.length).toBe(1);
    });

    test("mobile, not have buttons", () => {
      // Simulate android device
      Object.defineProperty(window.navigator, 'userAgent', {value : "Mozilla/5.0 (Mobile) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0"});

      render(<Notification header="Head" description="description" buttons />);
      const noti = screen.getByText(/head/i);
      const notiCont = noti.parentElement;
      expect(notiCont.children.length).toBe(2);
    });
  });

  describe("states", () => {
    test("success", () => {
      render(<Notification header="Head" description="Description" buttons mode="success" />);
      screen.getByRole("success-icon");
    });

    test("error", () => {
      render(<Notification header="Head" description="Description" buttons mode="error" />);
      screen.getByRole("error-icon");
    });

    test("information", () => {
      render(<Notification header="Head" description="Description" buttons mode="info" />);
      screen.getByRole("info-icon");
    });
  });

  xtest("onClick, return text value, in lowercase", async () => {
    const user = userEvent.setup();
    let notiText;
    render(
      <Notification
        onClick={(text) => {
          notiText = text;
        }}
        items={["Tea", "Coffee"]}
      />
    );
    const noti = screen.getByText(/tea/i);

    // call onClick function
    await user.click(noti);

    expect(notiText).toBe("tea");
  });
});
