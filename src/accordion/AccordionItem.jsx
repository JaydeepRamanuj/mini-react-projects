import { useState } from 'react';

function AccordionItem({ title, content, setItem, isActive, accid }) {
  // const [isSelected, setIsSelected] = useState(isActive);
  // const handleClick = () => setVal((prevVal) => !prevVal);

  return (
    <li
      className="p-1 rounded bg-slate-300 mt-4 cursor-pointer"
      onClick={() => setItem(accid)}
    >
      <h2 className="p-1 pl-2 text-xl rounded font-semibold text-zinc-900 flex justify-between bg-slate-400">
        {title}
        <span>
          <i
            className={`bi ${
              isActive ? 'bi-caret-up-fill' : 'bi-caret-down-fill'
            }`}
          ></i>
        </span>
      </h2>
      {isActive && (
        <div className="p-1 text-zinc-600 text-ellipsis">{content}</div>
      )}
    </li>
  );
}

export default AccordionItem;
