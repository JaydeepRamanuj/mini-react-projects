type TileProps = {
  id: number;
  value: string;
  clickHandler: (id: number) => void;
  showValue: boolean;
  isMatched: boolean;
};
function Tile({ id, value, clickHandler, showValue, isMatched }: TileProps) {
  return (
    <div
      className={`size-[100px] p-2 rounded-md bg-blue-200 text-white text-6xl font-semibold flex justify-center items-center hover:bg-blue-300 hover:shadow-lg cursor-pointer transition ${
        isMatched ? "bg-green-500" : showValue ? "bg-blue-500" : "bg-blue-200"
      }`}
      onClick={() => {
        clickHandler(id);
      }}
    >
      {showValue && value}
    </div>
  );
}

export default Tile;
