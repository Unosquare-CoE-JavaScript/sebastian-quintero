import { logRoles, render, screen } from "@testing-library/react";
import { ButtonApp } from "./ButtonApp";

test("button has correct initial color", () => {
  const { container } = render(<ButtonApp />);
//   logRoles(container);
  const button = screen.getByRole("button", { name: "Change to blue" });
  expect(button).toHaveStyle({
    "background-color": "red",
  });
});

test("button turns blue when clicked", () => {
  render(<ButtonApp />);
});
