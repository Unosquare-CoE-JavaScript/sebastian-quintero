import { useAtomValue } from "jotai";
import { scoopsTotalAtom } from "../../state/scoops";
import { formatCurrency } from "../../utilities/format";

export const ScoopsTotal: React.FC = () => {
  const total = useAtomValue(scoopsTotalAtom);

  return <p>Scoops total: {formatCurrency(total)}</p>;
};
