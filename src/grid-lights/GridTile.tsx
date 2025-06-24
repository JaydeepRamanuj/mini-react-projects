type GridTileProps = {
  id: number;
  isActive: boolean;
  handleClick: (id: number) => void;
};

function GridTile({ id, isActive = false, handleClick }: GridTileProps) {
  return (
    <div
      className={`size-10  rounded cursor-pointer   ${
        isActive
          ? "bg-orange-300 border border-orange-400"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
      onClick={() => {
        handleClick(id);
      }}
    ></div>
  );
}

export default GridTile;
