import { GrandTotal } from "./GrandTotal";
import { Options } from "./Options";

export const OrderEntry: React.FC = () => {
  return (
    <div>
      <Options type="scoops" />
      <Options type="toppings" />
      <GrandTotal />
    </div>
  );
};
