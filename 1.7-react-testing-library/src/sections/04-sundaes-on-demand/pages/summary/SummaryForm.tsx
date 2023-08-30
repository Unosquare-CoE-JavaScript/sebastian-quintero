import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SummaryForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form>
      <Form.Group>
        <Form.Check onChange={(event) => setIsChecked(event.target.checked)} />
      </Form.Group>
      <Button type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};
