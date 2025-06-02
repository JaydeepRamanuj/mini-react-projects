import React, { createRef, useContext, useEffect, useRef } from "react";
import Note from "./Note";
import { IoAddSharp } from "react-icons/io5";
import { ToolContext } from "../context/ToolProvider";
import NoteForm from "./NoteForm";

function DNDNotes() {
  const { toolVal, setToolVal } = useContext(ToolContext);

  // Static notes data
  // const notes = [
  //   { id: 1, title: "Test note 1", desc: "This is test note 1" },
  //   { id: 2, title: "Test note 2", desc: "This is test note 2" },
  //   { id: 3, title: "Test note 3", desc: "This is test note 3" },
  //   { id: 4, title: "Test note 4", desc: "This is test note 4" },
  //   { id: 5, title: "Test note 5", desc: "This is test note 5" },
  // ];

  const noteRefs = useRef({});
  // let notePositions;
  let newPositionGenerated = false;
  // try {
  //   notePositions = JSON.parse(window.localStorage.getItem("dnd")) || [];
  // } catch (error) {
  //   console.log("Error getting note positiones from localStorage", error);
  //   notePositions = [];
  // }
  // console.log(notePositions);
  const containerRef = useRef();

  document.body.style.userSelect = "none";
  const onDragStart = (id, e) => {
    const currentNote = noteRefs.current[id]?.current;
    if (!currentNote) return;

    const currentNoteData = toolVal.notes.find((note) => note.id === id);
    if (currentNoteData.isPinned) return;

    currentNote.style.minWidth = currentNote.clientWidth + "px";

    const noteRect = currentNote.getBoundingClientRect();
    currentNote.style.zIndex = "20";
    // Calculate click offset within the note so note can be centered when dragged
    const offsetX = e.clientX - noteRect.left;
    const offsetY = e.clientY - noteRect.top;

    // console.log("offsetX", offsetX);
    // console.log("offsetY", offsetY);

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      // document.body.style.userSelect = "none";
      const containerRect = container.getBoundingClientRect();
      const noteWidth = currentNote.offsetWidth;
      const noteHeight = currentNote.offsetHeight;

      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;

      // Keeping note isside container
      newLeft = Math.max(containerRect.left, newLeft);
      newTop = Math.max(containerRect.top, newTop);
      newLeft = Math.min(containerRect.right - noteWidth, newLeft);
      newTop = Math.min(containerRect.bottom - noteHeight, newTop);

      // Apply position relative to container
      currentNote.style.left = newLeft - containerRect.left + "px";
      currentNote.style.top = newTop - containerRect.top + "px";
    };

    const handleMouseUp = () => {
      // resetting styles

      // document.body.style.userSelect = "auto";
      currentNote.style.zIndex = "initial";
      currentNote.style.minWidth = "180px";

      // saving notes to localstorage
      const selectedNote = toolVal.notePositions.find((note) => note.id === id);

      selectedNote.x = parseInt(currentNote.style.left.slice(0, -2));
      selectedNote.y = parseInt(currentNote.style.top.slice(0, -2));

      // console.log("selectedNote.x", selectedNote.x);
      // console.log("selectedNote.y", selectedNote.y);

      window.localStorage.setItem(
        "dndPos",
        JSON.stringify(toolVal.notePositions)
      );
      window.localStorage.setItem("dndNotes", JSON.stringify(toolVal.notes));
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach listeners to the whole document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const onDragEnd = () => {};

  // Generates random initial positions for notes
  const generateRandomPositions = () => {
    return {
      x: Math.round(Math.random() * 500),
      y: Math.round(Math.random() * 500),
    };
  };

  // saving note positions if new positions was generated
  useEffect(() => {
    if (newPositionGenerated) {
      window.localStorage.setItem(
        "dndPos",
        JSON.stringify(toolVal.notePositions)
      );
    }
  });

  const handlePopup = () => {
    setToolVal((prev) => ({
      ...prev,
      showPopup: true,
      popupContent: <NoteForm />,
    }));
  };

  const onPinChange = (noteId, e) => {
    e.stopPropagation();
    setToolVal((prev) => {
      const updatedNotes = prev.notes.map((note) =>
        note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
      );
      // Also update localStorage
      window.localStorage.setItem("dndNotes", JSON.stringify(updatedNotes));
      return { ...prev, notes: updatedNotes };
    });
  };

  const onDelete = (id, title) => {
    const response = confirm(
      `Are you sure you want to delete note: '${title}' note`
    );

    if (response) {
      setToolVal((prev) => {
        const nextNotes = prev.notes.filter((note) => note.id !== id);
        window.localStorage.setItem("dndNotes", JSON.stringify(nextNotes));
        return {
          ...prev,
          notes: nextNotes,
        };
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Drag and Drop Notes</h1>
      <div
        ref={containerRef}
        className="w-[800px] h-[800px] border border-gray-300 rounded-md relative overflow-hidden"
      >
        {toolVal.notes.map((note) => {
          let x = 0;
          let y = 0;

          // check if note positioned are already stored or not, if not generate new one
          const existingNote = toolVal.notePositions.find(
            (n) => n.id === note.id
          );
          if (existingNote) {
            x = parseInt(existingNote.x);
            y = parseInt(existingNote.y);
          } else {
            const newPos = generateRandomPositions();
            x = newPos.x;
            y = newPos.y;

            toolVal.notePositions.push({ id: note.id, x: x, y: y });
            newPositionGenerated = true;
          }

          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              desc={note.desc}
              left={x}
              top={y}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              ref={
                noteRefs.current[note.id] ??
                (noteRefs.current[note.id] = createRef())
              }
              isPinned={note.isPinned}
              onPinChange={(e) => {
                onPinChange(note.id, e);
              }}
              onDelete={() => {
                onDelete(note.id, note.title);
              }}
            />
          );
        })}
        <div
          className="size-10 bg-yellow-500 text-white text-xl flex justify-center items-center rounded-full absolute bottom-4 right-4 cursor-pointer shadow-md hover:bg-yellow-600 active:bg-yellow-600 active:scale-[0.97]"
          onClick={handlePopup}
        >
          <IoAddSharp />
        </div>
      </div>
    </div>
  );
}

export default DNDNotes;
