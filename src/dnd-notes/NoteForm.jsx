import React, { useContext, useState } from "react";
import { ToolContext } from "../context/ToolProvider";

function NoteForm() {
  const { toolVal, setToolVal } = useContext(ToolContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const generateUniqueId = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (title) setToolVal((prev) => ({ ...prev, title: title, desc: desc }));

    setToolVal((prev) => ({
      ...prev,
      showPopup: false,
      notes: [
        ...prev.notes,
        { id: generateUniqueId(), title: title, desc: desc },
      ],
    }));
    window.localStorage.setItem("dndNotes", JSON.stringify(toolVal.notes));
  };
  return (
    <>
      <h1 className="text-lg text-white text-center mb-4">Add new Note</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name=""
          id=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-1.5 rounded"
          placeholder="Enter title"
          required
          autoFocus
        />

        <input
          type="text"
          name=""
          id=""
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="p-1.5 rounded"
          placeholder="Enter description"
        />

        <button className="bg-amber-500/60 text-white font-semibold rounded p-1 active:scale-[0.97] hover:bg-amber-500/70 ">
          Submit
        </button>
      </form>
    </>
  );
}

export default NoteForm;
