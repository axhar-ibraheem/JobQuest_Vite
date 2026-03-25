interface MessageProps {
  text: string;
}

const Message = ({ text }: MessageProps) => {
  return <p className="text-red-400 text-sm">{text}</p>;
};

export default Message;
