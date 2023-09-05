import Message from "../UI/Notification/Message";

const FormRow = (props) => {
  const { type, placeholder, name, id, value } = props.input;

  return (
    <div className="mb-3 relative">
      <label
        htmlFor={id}
        className="capitalize block mb-3 md:text-lg tracking-wider"
      >
        {props.label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          required
          className="border-2 w-full py-1 focus:outline-blue-600 lg:text-lg rounded-md ps-2"
          id={id}
          name={name}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={value}
        />
        {props.eyeIcon}
      </div>
      {props.error && <Message text= {props.message} />}
    </div>
  );
};

export default FormRow;
