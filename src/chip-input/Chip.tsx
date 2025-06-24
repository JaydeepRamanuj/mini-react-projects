import type { ChipType } from "./ChipInput";
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";

type ChipProps = ChipType & {
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
};

function Chip({ id, title, isSelected, onDelete, onSelect }: ChipProps) {
  return (
    <div
      className={`w-fit p-1 rounded-2xl flex items-center gap-2 cursor-pointer  ${
        isSelected
          ? "bg-blue-100 text-blue-800 border border-blue-400"
          : "bg-gray-200 text-gray-600 border border-gray-400 hover:border-blue-200 hover:bg-blue-50/80"
      }`}
      onClick={() => {
        onSelect(id);
      }}
    >
      <span className={`${isSelected ? "text-blue-800" : "text-gray-600"}`}>
        <GoDotFill />
      </span>
      <span>{title}</span>
      <span
        className="p-1 rounded-full hover:text-red-400 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <IoClose size={18} />
      </span>
    </div>
  );
}

export default Chip;
