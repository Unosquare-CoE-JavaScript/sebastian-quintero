import { useAtomValue } from "jotai";
import { orderTotalAtom } from "../../state/order";
import { formatCurrency } from "../../utilities/format";

export const GrandTotal: React.FC = () => {
  const total = useAtomValue(orderTotalAtom);
  return <p>Grand total: {formatCurrency(total)}</p>;
};
