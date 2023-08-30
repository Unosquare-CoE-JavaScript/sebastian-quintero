import { render, screen } from "@testing-library/react";
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
