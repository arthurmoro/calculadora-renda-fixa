import React, { CSSProperties, FC, KeyboardEvent, useCallback } from "react";
import { Form } from "react-bootstrap";

export interface onValueChangeProps {
  value: number;
  name: string;
}

interface Props {
  display?: string;
  name: string;
  className?: string;
  max?: number;
  onValueChange: (props: onValueChangeProps) => void;
  style?: CSSProperties;
  value: number;
  prefix?: string;
  "aria-describedby"?: string;
}

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput: FC<Props> = ({
  name,
  className = "",
  max = Number.MAX_SAFE_INTEGER,
  onValueChange,
  style = {},
  value,
  display = "currency",
  prefix = "",
  "aria-describedby": ariaDescribedBy = "",
}) => {
  const valueAbsTrunc = Math.trunc(Math.abs(value));
  if (
    value !== valueAbsTrunc ||
    !Number.isFinite(value) ||
    Number.isNaN(value)
  ) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const { key, keyCode } = e;
      if (
        (value === 0 && !VALID_FIRST.test(key)) ||
        (value !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }
      const valueString = value.toString();
      let nextValue: number;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString: string =
          value === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (nextValue > max) {
        return;
      }
      onValueChange({ value: nextValue, name });
    },
    [max, onValueChange, value]
  );

  const valueDisplay =
    prefix +
    (value / 100).toLocaleString("pt-BR", {
      style: display,
      currency: "BRL",
    });

  return (
    <Form.Control
      className={className}
      inputMode="numeric"
      // @ts-ignore
      onKeyDown={handleKeyDown}
      style={style}
      value={valueDisplay}
      aria-describedby={ariaDescribedBy}
    />
  );
};

export default CurrencyInput;
