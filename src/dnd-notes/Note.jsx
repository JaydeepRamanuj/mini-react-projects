import React, { forwardRef, useEffect } from "react";
import { BsPin, BsPinFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

// Forward ref to get DOM node access from parent
const Note = forwardRef(
  (
    {
      id,
      title,
      desc,
      left,
      top,
      onDragStart,
      onDragEnd,
      isPinned,
      onPinChange,
      onDelete,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="absolute min-w-[180px] border border-gray-300 bg-yellow-100 cursor-move rounded-md shadow-md active:shadow-2xl active:border-2 active:border-yellow-400 hover:border-2 hover:border-yellow-400"
        style={{ left: `${left}px`, top: `${top}px` }}
        onMouseDown={(e) => onDragStart(id, e)}
        onMouseUp={(e) => onDragEnd(id, e)}
      >
        <h3 className="bg-yellow-200 px-2 py-1 font-semibold rounded-t-md flex justify-between items-center">
          <span>{title}</span>
          <span
            className="size-6 rounded-full bg-white/40 text-sm flex justify-center items-center hover:bg-white/70 ml-auto mr-1 border-2 border-transparent hover:border-yellow-400 cursor-pointer"
            onClick={onPinChange}
          >
            {isPinned ? <BsPinFill /> : <BsPin />}
          </span>
          <span
            className="size-6 rounded-full bg-white/40 text-md flex justify-center items-center hover:bg-white/70 text-red-400 border-2 border-transparent hover:border-yellow-400 cursor-pointer"
            onClick={onDelete}
          >
            <MdDelete />
          </span>
        </h3>
        <p className="p-2 text-sm">{desc}</p>
      </div>
    );
  }
);

export default Note;
