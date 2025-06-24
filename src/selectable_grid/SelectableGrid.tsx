import { useEffect, useRef, useState } from "react";

function SelectableGrid() {
  const [dimensions, setDimensions] = useState<{ rows: number; cols: number }>({
    rows: 10,
    cols: 10,
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectableArea, setSelectableArea] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const gridElements = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isSelecting) {
      const minX = Math.min(selectableArea.startX, selectableArea.endX);
      const maxX = Math.max(selectableArea.startX, selectableArea.endX);
      const minY = Math.min(selectableArea.startY, selectableArea.endY);
      const maxY = Math.max(selectableArea.startY, selectableArea.endY);
      gridElements.current.forEach((ele: HTMLDivElement) => {
        if (ele) {
          const rect = ele.getBoundingClientRect();
          if (
            !(
              maxX < rect.left ||
              minX > rect.right ||
              maxY < rect.top ||
              minY > rect.bottom
            )
          ) {
            ele.classList.add(
              "bg-blue-300",
              "border",
              "border-blue-600",
              "shadow-lg",
              "scale-[1.11]"
            );
          }
        }
      });
    }
  }, [isSelecting, selectableArea]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        containerRef.current.contains(e.target as Node)
      ) {
        setIsSelecting(true);
        setSelectableArea({
          startX: e.clientX,
          startY: e.clientY,
          endX: e.clientX,
          endY: e.clientY,
        });
      }

      gridElements.current.forEach((ele: HTMLDivElement) => {
        if (ele) {
          ele.classList.remove(
            "bg-blue-300",
            "border",
            "border-blue-600",
            "shadow-lg",
            "scale-[1.11]"
          );
        }
      });
      setSelectableArea((prev) => ({
        ...prev,
        startX: e.clientX,
        startY: e.clientY,
      }));
    };
    const handleMouseUp = (e: MouseEvent) => {
      //   console.log(e);
      setSelectableArea((prev) => ({
        ...prev,
        endX: e.clientX,
        endY: e.clientY,
      }));
      setIsSelecting(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isSelecting) {
        setSelectableArea((prev) => ({
          ...prev,
          endX: e.clientX,
          endY: e.clientY,
        }));
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [selectableArea]);
  return (
    <div className="select-none">
      <h1>SelectableGrid</h1>
      <form className="max-w-lg mx-auto flex flex-col gap-3 ">
        <input
          className="p-1 rounded border border-gray-400/60"
          type="number"
          name=""
          id=""
          value={dimensions.rows}
          placeholder="Enter number of rows"
          onChange={(e) => {
            setDimensions((prev) => ({
              ...prev,
              rows: Number(e.target.value),
            }));
          }}
        />
        <input
          className="p-1 rounded border border-gray-400/60"
          type="number"
          name=""
          id=""
          value={dimensions.cols}
          placeholder="Enter number of columns"
          onChange={(e) => {
            setDimensions((prev) => ({
              ...prev,
              cols: Number(e.target.value),
            }));
          }}
        />
      </form>
      <div
        ref={containerRef}
        className="mx-auto mt-10 p-3 flex flex-wrap gap-2"
        style={{ width: dimensions.rows * 40 + dimensions.rows * 8 + 20 }}
      >
        {Array.from({ length: dimensions.rows * dimensions.cols }).map(
          (_, index) => (
            <div
              ref={(ele: HTMLDivElement) => {
                gridElements.current[index] = ele;
              }}
              key={index}
              className="w-10 h-10 flex justify-center items-center p-2 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 cursor-pointer hover:shadow-md transition"
            >
              {index + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SelectableGrid;
