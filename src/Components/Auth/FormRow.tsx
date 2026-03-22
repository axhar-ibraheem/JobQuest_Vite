import { ChangeEvent, FocusEvent } from "react";
import Message from "../UI/Notification/Message";

interface InputConfig {
  type: "text" | "email" | "password";
  placeholder?: string;
  name: string;
  id: string;
  value: string;
}

interface FormRowProps {
  input: InputConfig;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  message: string;
  eyeIcon?: JSX.Element | false;
}

const FormRow = ({
  input,
  label,
  onChange,
  onBlur,
  error,
  message,
  eyeIcon,
}: FormRowProps) => {
  const { type, placeholder, name, id, value } = input;

  return (
    <div className="mb-3 relative">
      <label
        htmlFor={id}
        className="capitalize block mb-1 md:mb-3 md:text-lg tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          required
          className="border-2 w-full py-1 focus:outline-blue-600 lg:text-lg rounded-md ps-2"
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {eyeIcon}
      </div>
      {error && <Message text={message}></Message>}
    </div>
  );
};

export default FormRow;
