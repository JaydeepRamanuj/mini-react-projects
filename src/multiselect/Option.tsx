type OptionProps = {
  id: number;
  value: string;
  isSelected: boolean;
  onSelect: (id: number, isSelected: boolean) => void;
};
function Option({ id, value, isSelected, onSelect }: OptionProps) {
  return (
    <div
      className={`flex items-center justify-between cursor-pointer px-2 rounded-md ${
        isSelected
          ? "bg-blue-200 shadow-lg text-blue-800  border border-blue-300/80 "
          : "hover:bg-blue-200/60"
      }`}
      onClick={() => {
        onSelect(id, !isSelected);
      }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        id={value}
        className="size-4"
        onChange={() => {
          onSelect(id, !isSelected);
        }}
      />
      <label
        htmlFor={value}
        className={`w-full  rounded-lg flex p-2 items-center gap-2  transition-all cursor-pointer`}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </label>
    </div>
  );
}

export default Option;
