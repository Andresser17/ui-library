import { render, screen } from "@testing-library/react";
import Island from "../Island";

describe("Island modes", () => {
  test("stop", () => {
    render(
      <Island title="Your text" head="Head" description="An easy description" />
    );

    // element is rendered
    () => screen.getByText(/head/i);

    // progress bar is not present
    const progressBar = screen.queryByText(/progress/i);
    expect(progressBar).not.toBeInTheDocument();
  });

  test("pending", () => {
    render(
      <Island
        title="Your text"
        head="Head"
        description="An easy description"
        mode="pending"
        percent={67}
      />
    );

    // element is rendered
    () => screen.getByText(/head/i);

    // progress bar is present
    const progressBar = screen.queryByText(/progress/i);
    expect(progressBar).toBeInTheDocument();

    // progress bar is present
    const percent = screen.queryByText(/67%/i);
    expect(percent).toBeInTheDocument();
  });

  test("completed", () => {
    render(
      <Island
        title="Your text"
        head="Head"
        description="An easy description"
        mode="completed"
      />
    );

    // element is rendered
    () => screen.getByText(/head/i);

    // progress bar is present
    const progressBar = screen.queryByText(/completed/i);
    expect(progressBar).toBeInTheDocument();
  });
});
