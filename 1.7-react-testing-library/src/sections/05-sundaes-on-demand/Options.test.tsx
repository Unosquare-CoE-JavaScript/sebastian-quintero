import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Options } from "./Options";

describe("options", () => {
  it("should display image for each scoop option from server", async () => {
    render(<Options type="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    const altTexts = scoopImages.map((img) => img.getAttribute("alt"));

    expect(scoopImages).toHaveLength(4);
    expect(altTexts).toEqual([
      "Chocolate scoop",
      "Vanilla scoop",
      "Mint chip scoop",
      "Salted caramel scoop",
    ]);
  });

  it("should display image for each topping option from server", async () => {
    render(<Options type="toppings" />);

    const scoopImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    const altTexts = scoopImages.map((img) => img.getAttribute("alt"));

    expect(scoopImages).toHaveLength(6);
    expect(altTexts).toEqual([
      "M&Ms topping",
      "Hot fudge topping",
      "Peanut butter cups topping",
      "Gummi bears topping",
      "Mochi topping",
      "Cherries topping",
    ]);
  });
});

describe("total", () => {
  it("should starts out at $0.00 for scoops", async () => {
    render(<Options type="scoops" />);

    const scoopsSubtotal = await screen.findByText("Scoops total: $", {
      exact: false,
    });

    expect(scoopsSubtotal).toBeInTheDocument();
  });

  it("should starts out at $0.00 for toppings", async () => {
    render(<Options type="toppings" />);

    const toppingsSubtotal = await screen.findByText("Toppings total: $", {
      exact: false,
    });

    expect(toppingsSubtotal).toBeInTheDocument();
  });

  it("should update subtotal when scoops change", async () => {
    const user = await userEvent.setup();
    render(<Options type="scoops" />);

    const subtotal = screen.getByText("Scoops total: $", { exact: false });
    const input = await screen.findByRole("spinbutton", { name: "Vanilla" });

    await user.clear(input);
    await user.type(input, "1");

    expect(subtotal).toHaveTextContent("2.00");
  });

  it("should update subtotal when toppings change", async () => {
    const user = await userEvent.setup();
    render(<Options type="toppings" />);

    const subtotal = screen.getByText("Toppings total: $", { exact: false });
    const input = await screen.findByRole("checkbox", { name: "Cherries" });

    await user.click(input);

    expect(subtotal).toHaveTextContent("1.50");
  });
});
