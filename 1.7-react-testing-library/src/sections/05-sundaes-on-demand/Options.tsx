import { useEffect, useState } from "react";
import { ScoopOption } from "./ScoopOption";
import { Item } from "./item.model";
import { Row } from "react-bootstrap";
import { ToppingOption } from "./ToppingOption";

const ITEM_COMPONENT_MAP: Record<string, React.FC<Item>> = {
  scoops: ScoopOption,
  toppings: ToppingOption,
};

export type OptionsProps = {
  type: "scoops" | "toppings";
};

export const Options: React.FC<OptionsProps> = ({ type }) => {
  const ItemComponent = ITEM_COMPONENT_MAP[type];

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let mounted = true;

    fetch(`http://localhost:3030/${type}`)
      .then((res) => res.json())
      .then((res) => {
        if (mounted) {
          setItems(res);
        }
      })
      .catch(() => console.error);

    return () => {
      mounted = false;
    };
  }, [type]);

  return (
    <Row>
      {items.map((item) => (
        <ItemComponent key={item.name} {...item} />
      ))}
    </Row>
  );
};
