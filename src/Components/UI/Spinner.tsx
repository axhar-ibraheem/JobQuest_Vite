interface SpinnerProps {
  classNames: string;
}

const Spinner = ({ classNames }: SpinnerProps) => {
  return (
    <div
      className={`${classNames} mx-auto border-2 border-zinc-300 rounded-full border-t-cyan-600 animate-spin`}
    ></div>
  );
};

export default Spinner;
