import { useCallback, useState } from "react";
import { integerValidator, rangeValidator } from "../utilities/validators";

export function useCountValidator(callback: (newValue: number) => void) {
  const [isValid, setIsValid] = useState(true);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value;

      const isValid =
        integerValidator({ value }) &&
        rangeValidator({ value, min: 0, max: 10 });
      setIsValid(isValid);

      const newValue = isValid ? parseInt(value) : 0;
      callback(newValue);
    },
    [callback]
  );

  return { isValid, onChange };
}
