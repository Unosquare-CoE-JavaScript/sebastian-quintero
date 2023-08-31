import { rest } from "msw";
import { server } from "../../../mocks/server";
import { render, screen, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderEntry } from "./OrderEntry";

describe("alert", () => {
  it("should handle error for scoops and toppings", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});

describe("grand total", () => {
  it("should start out at $0.00", async () => {
    render(<OrderEntry />);

    const total = await screen.findByText("Grand total: $", { exact: false });

    expect(total).toHaveTextContent("0.00");
  });

  it("should be updated if scoop is added", async () => {
    const user = await userEvent.setup();

    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });
    const input = await screen.findByRole("spinbutton", { name: "Vanilla" });

    await user.clear(input);
    await user.type(input, "1");

    expect(total).toHaveTextContent("2.00");
  });

  it("should be updated if topping is added", async () => {
    const user = await userEvent.setup();

    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });
    const input = await screen.findByRole("checkbox", { name: "Cherries" });

    await user.click(input);

    expect(total).toHaveTextContent("1.50");
  });

  it("should be updated if scoop and topping are added", async () => {
    const user = await userEvent.setup();

    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });
    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const toppingInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.clear(scoopInput);
    await user.type(scoopInput, "1");
    await user.click(toppingInput);

    expect(total).toHaveTextContent("3.50");
  });

  it("should be updated if an item is removed", async () => {
    const user = await userEvent.setup();

    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });
    const scoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const toppingInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(toppingInput);
    await user.clear(scoopInput);
    await user.type(scoopInput, "1");
    await user.click(toppingInput);

    expect(total).toHaveTextContent("2.00");
  });
});
