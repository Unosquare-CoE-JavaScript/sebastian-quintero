import { fireEvent, logRoles, render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("button has correct initial color", () => {
  const { container } = render(<Button />);
  //   logRoles(container);
  const button = screen.getByRole("button", { name: "Change to blue" });
  expect(button).toHaveStyle({
    "background-color": "red",
  });
});

test("button turns blue when clicked", () => {
  render(<Button />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(button).toHaveStyle({ "background-color": "blue" });
});

test("button turns red when clicked twice", () => {
  render(<Button />);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(button).toHaveStyle({ "background-color": "red" });
});

test("initial state", () => {
  render(<Button />);

  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(button).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("button is disabled and turning gray when checkbox is checked", () => {
  render(<Button />);

  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
  expect(button).toHaveStyle({ "background-color": "gray" });
});

test("button is disabled when checkbox is unchecked", () => {
  render(<Button />);

  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
});
