import { Col, Form } from "react-bootstrap";
import type { Item } from "./item.model";
import { useSetAtom } from "jotai";
import { toppingsUpdateAtom } from "../../state/toppings";

export type ToppingOptionProps = Item;

export const ToppingOption: React.FC<ToppingOptionProps> = ({
  name,
  imagePath,
}) => {
  const updateToppings = useSetAtom(toppingsUpdateAtom);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    updateToppings(name, event.target.checked ? 1 : 0);

  return (
    <Col>
      <img src={imagePath} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
};
