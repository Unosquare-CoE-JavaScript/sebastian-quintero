import { useEffect, useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { Item } from "./item.model";
import { Alert, Row } from "react-bootstrap";
import { ToppingOption } from "./ToppingOption";
import { ScoopsTotal } from "../06-sundaes-on-demand/ScoopsTotal";
import { ToppingsTotal } from "../06-sundaes-on-demand/ToppingsTotal";

const ITEM_TOTAL_COMPONENT_MAP: Record<string, React.FC> = {
  scoops: ScoopsTotal,
  toppings: ToppingsTotal,
};

const ITEM_COMPONENT_MAP: Record<string, React.FC<Item>> = {
  scoops: ScoopOption,
  toppings: ToppingOption,
};

export type OptionsProps = {
  type: "scoops" | "toppings";
};

export const Options: React.FC<OptionsProps> = ({ type }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch(`http://localhost:3030/${type}`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setItems(res);
        }
      })
      .catch((reason) => {
        console.error(reason);
        if (mounted) {
          setError(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [type]);

  const title = type[0].toUpperCase() + type.substring(1);
  const ItemTotalComponent = ITEM_TOTAL_COMPONENT_MAP[type];
  const ItemComponent = ITEM_COMPONENT_MAP[type];

  return (
    <>
      <h2>{title}</h2>
      <ItemTotalComponent />
      <Row>
        {error ? (
          <Alert variant="danger" onClose={() => setError(false)} dismissible>
            Something goes wrong!
          </Alert>
        ) : null}
        {items.map((item) => (
          <ItemComponent key={item.name} {...item} />
        ))}
      </Row>
    </>
  );
};
