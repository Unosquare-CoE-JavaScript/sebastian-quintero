import { Col } from "react-bootstrap";
import type { Item } from "./item.model";

export type ToppingOptionProps = Item;

export const ToppingOption: React.FC<ToppingOptionProps> = ({
  name,
  imagePath,
}) => {
  return (
    <Col>
      <img src={imagePath} alt={`${name} topping`} />
    </Col>
  );
};
