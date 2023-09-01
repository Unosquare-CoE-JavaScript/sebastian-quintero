import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

export const SummaryForm: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form>
      <Form.Group>
        <Form.Check
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
          label={
            <span>
              I agree to
              <OverlayTrigger
                placement="right"
                overlay={
                  <Popover id="popover">
                    <Popover.Body>
                      No ice cream will actually be delivered
                    </Popover.Body>
                  </Popover>
                }
              >
                <span style={{ color: "blue" }}>Terms and Conditions</span>
              </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>
      <Button type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};
