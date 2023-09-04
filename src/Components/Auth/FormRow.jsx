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
      <input
        type={type}
        placeholder={placeholder}
        required
        className="border-2 w-full py-2 focus:outline-blue-600 md:text-lg rounded-md ps-2"
        id={id}
        name={name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={value}
      />
      {props.eyeIcon}
    </div>
  );
};

export default FormRow;
