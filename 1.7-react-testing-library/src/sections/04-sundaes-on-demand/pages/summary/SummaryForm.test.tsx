import { fireEvent, render, screen } from "@testing-library/react";
import { SummaryForm } from "./SummaryForm";

describe("checkbox", () => {
  it("should be unchecked by default", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  it("should enable the button when is checked", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    fireEvent.click(checkbox);

    expect(button).toBeEnabled();
  });

  it("should disable the button when is unchecked", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(button).toBeDisabled();
  });
});
