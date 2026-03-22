import { PropsWithChildren } from "react";
import { ImCross } from "react-icons/im";
import { ModelView } from "../Landing";

interface ModalProps {
  setShow: (show: ModelView) => void;
}

const Modal = ({ setShow, children }: PropsWithChildren<ModalProps>) => {
  return (
    <div className="fixed z-20 inset-0">
      <div className="bg-blue-100 opacity-50 w-full h-full"></div>
      <div className="bg-white border-t-8 shadow-2xl border-purple-900 p-4 w-[90vw]  max-w-md rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mb-5 w-full flex">
          <button className="ms-auto" onClick={() => setShow("none")}>
            <ImCross></ImCross>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
