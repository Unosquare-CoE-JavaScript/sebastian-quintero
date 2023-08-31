export type IntegerOptions = {
  value: string;
};

export function integerValidator({ value }: IntegerOptions) {
  const parsedValue = parseFloat(value);
  return Math.floor(parsedValue) === parsedValue;
}

export type RangeOptions = {
  value: number | string;
  min: number;
  max: number;
};

export function rangeValidator({ value, min, max }: RangeOptions) {
  let num;
  if (typeof value === "string") {
    num = parseInt(value);
  } else {
    num = value;
  }
  return min <= num && num <= max;
}
