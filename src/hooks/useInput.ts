import { useState } from "react";

type ValidateValue = (value: string) => boolean;

const useInput = (validateValue: ValidateValue) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = (): void => {
    setIsTouched(true);
  };
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const reset = (text: string = ""): void => {
    setEnteredValue(text);
    setIsTouched(false);
  };
  return [
    enteredValue,
    valueChangeHandler,
    inputBlurHandler,
    hasError,
    reset,
  ] as const;
};

export default useInput;
