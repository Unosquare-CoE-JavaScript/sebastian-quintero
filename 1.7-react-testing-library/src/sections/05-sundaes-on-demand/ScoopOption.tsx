import { Col, Form } from "react-bootstrap";
import type { Item } from "./item.model";
import { useSetAtom } from "jotai";
import { scoopsUpdateAtom } from "../../state/scoops";
import { useCountValidator } from "../../hooks/use-count-validatior";

export type ScoopOptionProps = Item;

export const ScoopOption: React.FC<ScoopOptionProps> = ({
  name,
  imagePath,
}) => {
  const updateScoops = useSetAtom(scoopsUpdateAtom);
  const { isValid, onChange } = useCountValidator((newValue) =>
    updateScoops(name, newValue)
  );

  return (
    <Col>
      <img src={imagePath} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`}>
        <Form.Label>{name}</Form.Label>
        <Form.Control
          role="spinbutton"
          type="number"
          defaultValue={0}
          onChange={onChange}
          isValid={isValid}
        ></Form.Control>
      </Form.Group>
    </Col>
  );
};
