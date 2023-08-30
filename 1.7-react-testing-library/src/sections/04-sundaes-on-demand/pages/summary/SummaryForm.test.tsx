import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryForm } from "./SummaryForm";

describe("checkbox", () => {
  it("should be unchecked by default", () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
  });

  it("should enable the button when is checked", async () => {
    const user = await userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    await user.click(checkbox);

    expect(button).toBeEnabled();
  });

  it("should disable the button when is unchecked", async () => {
    const user = await userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    user.click(checkbox);
    user.click(checkbox);

    expect(button).toBeDisabled();
  });
});

describe("popover", () => {
  it("should be hidden by default", () => {
    render(<SummaryForm />);

    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).not.toBeInTheDocument();
  });

  it("should be shown on mouse over", async () => {
    const user = await userEvent.setup();

    const { container } = render(<SummaryForm />);

    logRoles(container);
    screen.debug();

    const termsAndConditions = screen.getByText(/terms and conditions/i);

    await user.hover(termsAndConditions);
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    screen.debug();

    expect(popover).toBeInTheDocument();
  });

  it("should be hidden on mouse out", async () => {
    const user = await userEvent.setup();

    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox");
    const popover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    await user.hover(checkbox);
    await user.unhover(checkbox);

    expect(popover).not.toBeInTheDocument();
  });
});
