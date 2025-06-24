import { useState } from "react";
import GridTile from "./GridTile";

type TileType = {
  id: number;
  isActive: boolean;
};

function GridLights() {
  const [tiles, setTiles] = useState<TileType[]>(
    Array.from({ length: 25 }, (_, i) => ({ id: i + 1, isActive: false }))
  );

  const handleToggle = (id: number) => {
    setTiles(
      tiles.map((tile) => {
        if (tile.id === id) {
          return { ...tile, isActive: !tile.isActive };
        }
        if (tile.id === id - 1 && id % 5 !== 1) {
          return { ...tile, isActive: !tile.isActive };
        }
        if (tile.id === id + 1 && id % 5 !== 0) {
          return { ...tile, isActive: !tile.isActive };
        }
        if (tile.id === id - 5 && id >= 5) {
          return { ...tile, isActive: !tile.isActive };
        }
        if (tile.id === id + 5 && id < 20) {
          return { ...tile, isActive: !tile.isActive };
        }
        return tile;
      })
    );
  };

  return (
    <div>
      <h1 className="text-blue-800 text-center font-semibold text-3xl">
        GridLights
      </h1>
      <div className="mt-10 w-fit mx-auto grid grid-cols-5 gap-1">
        {tiles.map((tile) => (
          <GridTile
            key={tile.id}
            id={tile.id}
            isActive={tile.isActive}
            handleClick={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default GridLights;
