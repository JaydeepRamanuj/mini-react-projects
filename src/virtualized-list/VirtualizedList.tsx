import { useEffect, useRef, useState } from "react";

function VirtualizedList() {
  const [list, setList] = useState<number[]>([]);
  const itemHeight = 50;
  const containerHeight = 800;

  const container = useRef<HTMLDivElement>(null);

  const [indices, setIndices] = useState<{ start: number; end: number }>({
    start: 0,
    end: containerHeight / itemHeight,
  });

  const virtualizedList = list.slice(indices.start, indices.end);

  const handleScroll = (e: HTMLDivElement) => {
    const eleScrollTop = e.target.scrollTop;
    setIndices({
      start: Math.round(eleScrollTop / itemHeight),
      end: Math.round((eleScrollTop + containerHeight) / itemHeight),
    });
  };

  useEffect(() => {
    const list = Array.from({ length: 10000 }, (_, i) => i + 1);
    setList(list);
  }, []);
  return (
    <div>
      <h1 className="text-blue-800 text-2xl font-semibold text-center">
        VirtualizedList
      </h1>

      <div
        ref={container}
        className="w-fit mx-auto mt-10 p-4 bg-gray-100 rounded-lg overflow-auto"
        onScroll={handleScroll}
        style={{ height: containerHeight + 32 }}
      >
        <div
          className="max-w-[400px] mx-auto flex flex-col gap-3"
          style={{
            height: list.length * itemHeight,
            // transform: `translateY(${scrollTop}px)`,
            transform: `translateY(${indices.start * itemHeight}px)`,
          }}
        >
          {virtualizedList.map((item, index) => (
            <div
              key={index}
              style={{ height: 50 }}
              className=" min-w-[300px] bg-blue-100 text-blue-800 text-center text-lg font-semibold p-1 flex justify-center items-center rounded-lg hover:bg-blue-200 hover:scale-[1.05] cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;
