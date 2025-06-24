import { useState } from "react";

function AccordionItem({ title, content, setItem, isActive, accid }) {
  // const [isSelected, setIsSelected] = useState(isActive);
  // const handleClick = () => setVal((prevVal) => !prevVal);

  return (
    <li
      className="p-1 rounded  mt-4 cursor-pointer bg-blue-100 text-blue-800"
      onClick={() => setItem(accid)}
    >
      <h2 className="p-1 pl-2 text-xl rounded font-semibold  flex justify-between text-left">
        {title}
        <span>
          <i
            className={`bi ${
              isActive ? "bi-caret-up-fill" : "bi-caret-down-fill"
            }`}
          ></i>
        </span>
      </h2>
      {isActive && (
        <div className="p-1 text-zinc-600 text-ellipsis text-left">
          {content}
        </div>
      )}
    </li>
  );
}

export default AccordionItem;
