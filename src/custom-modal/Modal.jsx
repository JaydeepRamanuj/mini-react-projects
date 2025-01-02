import { useEffect } from 'react';

function Modal({ component, setModal }) {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      e.key === 'Escape' && setModal(false);
    });
  });

  function handleClick(e) {
    if (e.target.classList.contains('modal-wrapper')) {
      setModal(false);
    }
  }

  return (
    <div
      className="modal-wrapper h-screen w-screen bg-black/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10"
      onClick={handleClick}
    >
      <div className=" p-1 rounded-md bg-slate-300/40 max-w-[500px] shadow-xl z-30 relative">
        {component}
        <i
          className="bi bi-x-circle-fill text-gray-800 text-2xl absolute top-2 right-2 cursor-pointer z-50"
          title="click to close"
          onClick={() => {
            setModal(false);
          }}
        ></i>
      </div>
    </div>
  );
}

export default Modal;
