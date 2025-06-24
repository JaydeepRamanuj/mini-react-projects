import { useEffect, useRef, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

type ItemType = {
  id: number;
  title: string;
};

function ReOrderableList() {
  const [items, setItems] = useState<ItemType[]>([
    { id: 1, title: "JavaScript" },
    { id: 2, title: "TypeScript" },
    { id: 3, title: "React.js" },
    { id: 4, title: "Next.js" },
    { id: 5, title: "Node.js" },
  ]);

  const itemsRefs = useRef<(HTMLDivElement | null)[] | null>([]);
  const [inpVal, setInpVal] = useState("");
  const [draggingElement, setDraggingElement] =
    useState<HTMLDivElement | null>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const handleAddNewItem = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    setItems([...items, { id: items.length + 1, title: inpVal }]);
    setInpVal("");
  };
  const [currentItem, setCurrentItem] = useState<ItemType | null>();

  const [preview, setPreview] = useState<{
    title: string;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseDown = (e: MouseEvent, item: ItemType) => {
    if (!e.target) return;
    if (!e.target.closest(".drag-handle")) return;

    const dragHandle = e.target.closest(".drag-handle");
    setDraggingElement(dragHandle.parentElement);
    setIsDragging(true);
    setCurrentItem(item);
    // console.log("e.clientX =>", e.clientX);
    // console.log("e.clientY =>", e.clientY);
    setPreview({
      title: item.title,
      x: e.clientX,
      y: e.clientY,
    });
  };
  const handleMouseUp = () => {
    // console.log(e);
    setIsDragging(false);
    setDraggingElement(null);
    setCurrentItem(null);
    setPreview(null);
  };

  const sortItems = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const updated = [...items];
    // Getting item we want to move with its index
    const [movedItem] = updated.splice(fromIndex, 1);
    // Adding that item after item we want using index
    updated.splice(toIndex, 0, movedItem);
    setItems(updated);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !draggingElement || !itemsRefs.current) return;

    if (preview) {
      setPreview({ ...preview, x: e.clientX, y: e.clientY });
    }

    // We are getting index of item we are hovering on
    const indexOfItemHoveringOn = itemsRefs.current.findIndex(
      (el) => el === e.target
    );
    // Then we are also getting index of item we want to drag
    const fromIndex = items.findIndex((i) => i.id === currentItem?.id);

    if (indexOfItemHoveringOn === -1 || fromIndex === -1) return;

    if (indexOfItemHoveringOn === fromIndex) return;

    // Now we are finding the actual element we are hovering on
    const target = itemsRefs.current[indexOfItemHoveringOn];
    if (!target) return;

    // If item we are dragging is above even half of item we are hovering on, we call it 'above' and then sorting based on that
    const targetMiddle = target.offsetTop + target.clientHeight / 2;
    const isAbove = draggingElement.offsetTop < targetMiddle;

    if (isAbove) {
      sortItems(fromIndex, indexOfItemHoveringOn);
    } else {
      sortItems(fromIndex, indexOfItemHoveringOn + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);
  return (
    <div>
      <h1 className="text-blue-800 text-center font-semibold text-3xl">
        ReOrderableList
      </h1>

      <div className="mt-10 w-fit mx-auto">
        <form onSubmit={handleAddNewItem}>
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
            onClick={handleAddNewItem}
          >
            Add
          </button>
        </form>
      </div>
      <AnimatePresence>
        <div
          className="mt-10 w-[500px] mx-auto flex flex-col gap-3 p-2 bg-blue-100/80 rounded-lg select-none relative"
          onMouseMove={handleMouseMove}
        >
          {items.map((item, index) => (
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              ref={(ele: HTMLDivElement) => {
                if (itemsRefs.current) itemsRefs.current[index] = ele;
              }}
              key={item.id}
              className="p-2 rounded bg-blue-200 text-blue-800 flex  items-center justify-between transition"
              onMouseDown={(e) => {
                handleMouseDown(e, item);
              }}
              onMouseUp={handleMouseUp}
            >
              <span>{item.title}</span>
              <span className="drag-handle p-1 rounded cursor-grab active:cursor-grabbing active:scale-[0.97] hover:bg-blue-100 ">
                <RxDragHandleDots2 size={18} />
              </span>
            </motion.div>
          ))}

          {preview && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className=" fixed pointer-events-none bg-blue-100 text-blue-800 px-4 py-2 rounded shadow"
              style={{
                top: preview.y,
                left: preview.x,
                transform: "translate(-50%, -50%)",
              }}
            >
              {preview.title}
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default ReOrderableList;
