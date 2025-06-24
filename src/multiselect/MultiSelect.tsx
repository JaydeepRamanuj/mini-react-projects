import { FaChevronDown } from "react-icons/fa";
import Option from "./Option";
import { useEffect, useRef, useState } from "react";

export type OptionType = {
  id: number;
  value: string;
  isSelected: boolean;
};

const optionsItems = [
  {
    id: 1,
    value: "JavaScript",
    isSelected: false,
  },
  {
    id: 2,
    value: "TypeScript",
    isSelected: false,
  },
  {
    id: 3,
    value: "React.js",
    isSelected: false,
  },
  {
    id: 4,
    value: "Next.js",
    isSelected: false,
  },
  {
    id: 5,
    value: "Node.js",
    isSelected: false,
  },
];

function MultiSelect() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<OptionType[]>(optionsItems);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: number, isSelected: boolean) => {
    setOptions(
      options.map((option) => {
        if (option.id === id) {
          return { ...option, isSelected: isSelected };
        }
        return option;
      })
    );
    setOpen(false);
  };

  return (
    <div>
      <h1 className="text-blue-800 text-center font-semibold text-3xl">
        Multi Select
      </h1>
      <div ref={ref} className="mt-10 relative w-fit mx-auto">
        <div
          className="min-w-[200px] flex items-center justify-between px-4 py-3 rounded-lg bg-blue-100/80 shadow-sm text-blue-700 border-gray-400 cursor-pointer font-semibold z-0"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="">Select files</span>
          <FaChevronDown className="text-blue-700" />
        </div>

        {open && (
          <div className="absolute z-10 w-full mt-2 bg-blue-50 rounded-lg shadow-xl overflow-y-auto p-2 flex flex-col gap-2">
            {options.map((opt) => (
              <Option
                key={opt.id}
                id={opt.id}
                value={opt.value}
                isSelected={opt.isSelected}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-10 w-fit mx-auto flex flex-col items-center">
        <span className="text-lg text-blue-800">Selected Files:</span>
        <div className="mt-10 flex gap-3">
          {options.map((opt) => {
            if (opt.isSelected) {
              return (
                <div
                  key={opt.id}
                  className="w-fit px-2 py-1 bg-blue-100 rounded-lg text-blue-800 shadow"
                >
                  {opt.value}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default MultiSelect;
