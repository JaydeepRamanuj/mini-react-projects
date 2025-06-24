import { useContext } from "react";
import Modal from "./Modal";
import Card from "./Card";
import { ToolContext } from "../context/ToolProvider";

function ModalButton() {
  const { toolVal, setToolVal } = useContext(ToolContext);

  const toggleModal = () => {
    setToolVal((prev) => ({
      ...prev,
      showPopup: true,
      popupContent: <Card />,
    }));
  };

  return (
    <>
      <button
        className="w-fit m-5 px-3 py-1 rounded bg-blue-500 active:bg-blue-700 active:scale-95 hover:bg-blue-700 text-white"
        onClick={toggleModal}
      >
        Toggle Modal
      </button>
      {/* {showModal != false && (
        <Modal component={<Card />} setModal={setShowModal} />
      )} */}
    </>
  );
}

export default ModalButton;
