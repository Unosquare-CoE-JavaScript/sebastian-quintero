import { useAtomValue } from "jotai";
import { toppingsTotalAtom } from "../../state/toppings";
import { formatCurrency } from "../../utilities/format";

export const ToppingsTotal: React.FC = () => {
  const total = useAtomValue(toppingsTotalAtom);

  return <p>Toppings total: {formatCurrency(total)}</p>;
};
