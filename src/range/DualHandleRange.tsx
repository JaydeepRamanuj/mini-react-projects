import React, { useState, useEffect, useRef, useCallback } from "react";

const allProducts = [
  { id: 1, name: "Laptop Pro", price: 1200 },
  { id: 2, name: "Gaming Mouse", price: 75 },
  { id: 3, name: "Mechanical Keyboard", price: 150 },
  { id: 4, name: "Webcam HD", price: 50 },
  { id: 5, name: "Ultra-wide Monitor", price: 650 },
  { id: 6, name: "USB Hub", price: 25 },
  { id: 7, name: "Noise-Cancelling Headphones", price: 200 },
  { id: 8, name: "External SSD", price: 120 },
  { id: 9, name: "Smart Watch", price: 300 },
  { id: 10, name: "VR Headset", price: 900 },
];

function DualHandleRange() {
  const sliderWidth = 500;
  const sliderStep = 1;
  const minValue = 25;
  const maxValue = 1200;

  const [currentMinValue, setCurrentMinValue] = useState(minValue);
  const [currentMaxValue, setCurrentMaxValue] = useState(maxValue);

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [currentHandle, setCurrentHandle] = useState<"min" | "max" | "">("");

  const range = useRef<HTMLDivElement>(null);
  const leftHandle = useRef<HTMLSpanElement>(null);
  const rightHandle = useRef<HTMLSpanElement>(null);

  const sliderStart =
    (range.current && range.current.getBoundingClientRect().left) || minValue;

  // console.log("sliderStart =>", sliderStart);
  const sliderEnd =
    (range.current &&
      range.current.getBoundingClientRect().left +
        range.current.getBoundingClientRect().width) ||
    maxValue;

  // console.log("sliderEnd =>", sliderEnd);

  useEffect(() => {
    const newFilteredProducts = allProducts.filter((product) => {
      return (
        product.price >= currentMinValue && product.price <= currentMaxValue
      );
    });
    setFilteredProducts(newFilteredProducts);
  }, [currentMinValue, currentMaxValue]);

  const handleMouseDown = (type: "min" | "max") => {
    setIsSliding(true);
    setCurrentHandle(type);
  };

  // --- Helper to convert pixel position to value ---
  const getValueFromMouseX = useCallback(
    (clientX: number): number => {
      if (!range.current) return minValue;

      const trackRect = range.current.getBoundingClientRect();

      // 1. Calculate mouse position relative to the track's left edge
      let mouseX = clientX - trackRect.left;

      // 2. Clamp mouseX within track boundaries
      // Ensures the calculated position doesn't go beyond the visual track ends
      mouseX = Math.max(0, Math.min(mouseX, trackRect.width));

      // 3. Calculate Ratio: How far along the track (0 to 1) is the mouse?
      const ratio = mouseX / trackRect.width;

      // 4. Map Ratio to Data Range (Linear Interpolation)
      // This converts the 0-1 ratio to a value within your defined minDataValue to maxDataValue
      const rawValue = ratio * (maxValue - minValue) + minValue;

      // 5. Apply Steps: Round to the nearest step multiple (THIS IS THE KEY FOR "TICKS")
      // This snaps the continuous rawValue to the nearest discrete step
      const steppedValue = Math.round(rawValue / sliderStep) * sliderStep;

      // 6. Final Clamping: Ensure the stepped value stays within the overall data range
      // Important for values rounded near the very start or end of the range
      return Math.max(minValue, Math.min(steppedValue, maxValue));
    },
    [minValue, maxValue, sliderStep] // Dependencies for useCallback
  );

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding || !currentHandle) return;

    const newValue = getValueFromMouseX(e.clientX);

    if (
      leftHandle.current &&
      rightHandle.current &&
      e.clientX > sliderStart &&
      e.clientX < sliderEnd
    ) {
      if (
        currentHandle == "min"
        // && leftHandle.current.style.left < rightHandle.current.style.left
      ) {
        leftHandle.current.style.left = e.clientX - sliderStart + "px";
        setCurrentMinValue(newValue);
      }
      if (currentHandle == "max") {
        rightHandle.current.style.left = e.clientX - sliderStart + "px";
        setCurrentMaxValue(newValue);
      }
    }
  };
  const handleMouseUp = () => {
    setCurrentHandle("");
    setIsSliding(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isSliding, currentHandle]);
  return (
    <div className="p-6 font-sans max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-blue-800 text-center font-semibold text-3xl">
        Dual Head Range Slider
      </h1>
      <div className="mt-10 p-2 border border-gray-200 rounded-lg bg-white">
        <div
          ref={range}
          className="relative my-6 mx-auto  h-3 rounded-lg bg-gray-200 select-none"
          style={{ width: sliderWidth }}
        >
          <span
            ref={leftHandle}
            className="size-12 text-lg font-semibold rounded-full flex justify-center items-center p-2 border-2 border-transparent  bg-blue-100 text-blue-800 transition active:border-blue-400 active:scale-[1.1]  absolute top-1/2 -translate-y-1/2 left-0 cursor-grab active:cursor-grabbing"
            onMouseDown={() => {
              handleMouseDown("min");
            }}
          >
            {currentMinValue}
          </span>

          <span
            ref={rightHandle}
            className="size-12 text-lg font-semibold rounded-full flex justify-center items-center p-2 border-2 border-transparent  bg-blue-100 text-blue-800 transition active:border-blue-400 active:scale-[1.1] absolute top-1/2 -translate-y-1/2 left-[90%] cursor-grab active:cursor-grabbing"
            onMouseDown={() => {
              handleMouseDown("max");
            }}
          >
            {currentMaxValue}
          </span>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-semibold mb-4 text-gray-800">
        Filtered Products ({filteredProducts.length} results):
      </h3>
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">
          No products match your current price range.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <h4 className="font-medium text-lg text-gray-800">
                {product.name}
              </h4>
              <p className="text-blue-600 font-bold text-xl">
                ${product.price.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DualHandleRange;
