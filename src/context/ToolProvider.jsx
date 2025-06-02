import React, { createContext, useState } from "react";

export const ToolContext = createContext();

function ToolProvider({ children }) {
  const [toolVal, setToolVal] = useState({
    showPopup: false,
    popupContent: null,
    taskTitle: "",
    taskDesc: "",
    notes: JSON.parse(window.localStorage.getItem("dndNotes")) || [
      {
        id: 1,
        title: "Test note 1",
        desc: "This is test note 1",
        isPinned: true,
      },
      {
        id: 2,
        title: "Test note 2",
        desc: "This is test note 2",
        isPinned: true,
      },
      {
        id: 3,
        title: "Test note 3",
        desc: "This is test note 3",
        isPinned: false,
      },
      {
        id: 4,
        title: "Test note 4",
        desc: "This is test note 4",
        isPinned: true,
      },
      {
        id: 5,
        title: "Test note 5",
        desc: "This is test note 5",
        isPinned: false,
      },
    ],
    notePositions: JSON.parse(window.localStorage.getItem("dndPos")) || [],
  });
  return (
    <ToolContext.Provider value={{ toolVal, setToolVal }}>
      {children}
    </ToolContext.Provider>
  );
}

export default ToolProvider;
