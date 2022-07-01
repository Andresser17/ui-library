import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PopUpModal from "../PopUpModal";

describe("close pop-up", () => {
  test("close when button is click", async () => {
    const user = userEvent.setup();

    render(<PopUpModal />);

    // get close button
    const closeButton = screen.getByRole("button");
    // get modal
    const modal = closeButton.parentElement;

    // close modal
    await user.click(closeButton);

    expect(modal).toHaveStyle({ display: "none" });
  });

  test("close after timeout is over", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    render(<PopUpModal countdown={2} />);

    // get close button
    const closeButton = screen.getByRole("button");
    // get modal
    const modal = closeButton.parentElement;

    expect(setTimeout).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(modal).toHaveStyle({ display: "none" });
    }, 1000 * 2);
  });
});
