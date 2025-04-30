import { useState } from 'react';
import Modal from './Modal';
import Card from './Card';
function CustomModal() {
  const [showModal, setShowModal] = useState(0);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <button
        className="w-fit m-5 px-3 py-1 rounded bg-blue-500 active:bg-blue-700 active:scale-95 hover:bg-blue-700 text-white"
        onClick={toggleModal}
      >
        Toggle Modal
      </button>
      {showModal != false && (
        <Modal component={<Card />} setModal={setShowModal} />
      )}
    </>
  );
}

export default CustomModal;
