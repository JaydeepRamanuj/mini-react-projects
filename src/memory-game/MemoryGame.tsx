import { useEffect, useRef, useState } from "react";
import { generateRandomValuesForGrid, type TileType } from "./utils";
import Tile from "./Tile";

function MemoryGame() {
  const [gridSize, setGridSize] = useState<number>(4);
  const [grid, setGrid] = useState<TileType[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);

  const generateGrid = () => {
    const generatedGrid = generateRandomValuesForGrid(gridSize);
    setGrid(generatedGrid);
  };

  useEffect(() => {
    generateGrid();
  }, [gridSize]);

  const moves = useRef(0);
  // console.log(grid);

  const handleTileClick = (tileId: number) => {
    if (!selectedTiles.includes(tileId)) {
      moves.current += 1;
    }
    if (
      selectedTiles.includes(tileId) ||
      matchedTiles.includes(tileId) ||
      selectedTiles.length >= 2
    ) {
      return;
    }

    setSelectedTiles((prev) => [...prev, tileId]);
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [firstId, secondId] = selectedTiles;
      const firstTile = grid.find((t) => t.id === firstId);
      const secondTile = grid.find((t) => t.id === secondId);

      if (!firstTile || !secondTile) return;

      if (firstTile.value === secondTile.value) {
        // console.log("Matched");
        setMatchedTiles((prev) => [...prev, firstTile.id, secondTile.id]);
      }

      setTimeout(() => {
        setSelectedTiles([]);
      }, 1000);
    }
  }, [selectedTiles, grid]);

  return (
    <div className=" overflow-hidden">
      <div>
        <h1 className="text-4xl font-bold text-blue-800">Memory game</h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <p>Grid Size:</p>
          <input
            type="number"
            name=""
            min={4}
            max={10}
            id=""
            className="p-1 rounded border border-gray-400"
            value={gridSize}
            onChange={(e) => {
              setGridSize(Number(e.target.value));
            }}
          />

          <span>Moves : {moves.current}</span>
        </div>
      </div>
      <div
        className="mt-10 flex flex-wrap gap-[10px] mx-auto"
        style={{ width: gridSize * 100 + gridSize * 10 + "px" }}
      >
        {grid.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            value={tile.value}
            showValue={selectedTiles.includes(tile.id)}
            isMatched={matchedTiles.includes(tile.id)}
            clickHandler={handleTileClick}
          />
        ))}
      </div>

      {matchedTiles.length == gridSize ** 2 && (
        <div className="mt-10 text-green-800 text-2xl font-semibold animate-ping">
          You Won
        </div>
      )}

      <button
        className="mt-6 px-2 py-1 rounded-md bg-orange-100 text-orange-800 text-lg cursor-pointer hover:bg-orange-200"
        onClick={() => {
          setSelectedTiles([]);
          setGrid([]);
          setMatchedTiles([]);
          generateGrid();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default MemoryGame;
