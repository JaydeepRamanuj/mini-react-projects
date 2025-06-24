import { useState } from "react";
import Chip from "./Chip";

export type ChipType = {
  id: number;
  title: string;
  isSelected: boolean;
};

function ChipInput() {
  const [inpVal, setInpVal] = useState("");
  const [chips, setChips] = useState<ChipType[]>([
    { id: 1, title: "JavaScript", isSelected: true },
    { id: 2, title: "TypeScript", isSelected: true },
    { id: 3, title: "React.js", isSelected: true },
    { id: 4, title: "Next.js", isSelected: false },
    { id: 5, title: "Node.js", isSelected: false },
  ]);

  const handleDelete = (id: number) => {
    setChips(chips.filter((chip) => chip.id !== id));
  };

  const handleAddNewChip = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    if (!inpVal) return;
    setChips((prev) => [
      ...prev,
      { id: chips.length + 1, isSelected: false, title: inpVal },
    ]);
    setInpVal("");
  };

  const handleSelectChip = (id: number) => {
    const updatedChips = chips.map((chip) => {
      if (chip.id == id) {
        return { ...chip, isSelected: !chip.isSelected };
      }

      return chip;
    });

    setChips(updatedChips);
  };

  return (
    <div>
      <h1 className="text-blue-800 text-center font-semibold text-3xl">
        ChipInput
      </h1>

      <div className="mt-10 w-fit mx-auto">
        <form onSubmit={handleAddNewChip}>
          <input
            type="text"
            name=""
            id=""
            value={inpVal}
            required
            className="border border-blue-400 rounded-lg p-1 focus:outline-blue-400"
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
          />
          <button
            className="w-fit bg-blue-100 text-blue-800 px-4 py-1.5 rounded-lg hover:bg-blue-200 cursor-pointer ml-3"
            onClick={handleAddNewChip}
          >
            Add
          </button>
        </form>
      </div>

      <div className="mt-10 w-fit mx-auto flex flex-wrap gap-3">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            id={chip.id}
            title={chip.title}
            isSelected={chip.isSelected}
            onDelete={handleDelete}
            onSelect={handleSelectChip}
          />
        ))}
      </div>
    </div>
  );
}

export default ChipInput;
