import { useContext, useEffect, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ToolContext } from "../context/ToolProvider";
function Modal() {
  const ref = useRef();
  const { toolVal, setToolVal } = useContext(ToolContext);
  const handleCancel = () => {
    console.log("Cancel button clicked");
    setToolVal((prev) => ({ ...prev, showPopup: false }));
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToolVal((prev) => ({ ...prev, showPopup: false }));
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setToolVal((prev) => ({ ...prev, showPopup: false }));
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="overlay fixed w-full h-full top-0 left-0 bg-black/60 backdrop-blur flex justify-center items-center z-999">
      <div
        ref={ref}
        className="popup-content border-2 p-3 rounded-md bg-white/20 border-blue-300 shadow-3xl relative"
      >
        {toolVal.popupContent && toolVal.popupContent}
        <span
          className="size-8 flex justify-center items-center bg-black/60 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer transition-all  hover:scale-[1.05] hover:bg-black/70"
          onClick={handleCancel}
        >
          <IoIosCloseCircle />
        </span>
      </div>
    </div>
  );
}

export default Modal;
