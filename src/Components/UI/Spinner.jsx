const Spinner = ({classes}) => {
  return (
    <div className={`${classes} mx-auto border-2 border-zinc-300 rounded-full border-t-cyan-600 animate-spin`}></div>
  );
};

export default Spinner;
