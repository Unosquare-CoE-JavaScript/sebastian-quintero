import { Col } from "react-bootstrap";
import type { Item } from "./item.model";

export type ScoopOptionProps = Item;

export const ScoopOption: React.FC<ScoopOptionProps> = ({
  name,
  imagePath,
}) => {
  return (
    <Col>
      <img src={imagePath} alt={`${name} scoop`} />
    </Col>
  );
};
