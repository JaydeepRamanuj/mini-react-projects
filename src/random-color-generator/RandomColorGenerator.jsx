import { useState, useRef } from 'react';

import generateRandomHexCode from './GenerateRandomColors';
import { generateRandomRGBCode } from './GenerateRandomColors';

function RandomColorGenerator() {
  let [color, setColor] = useState('#b0d7e6');

  let colorCodeType = useRef('hex');
  const handleClick = () => {
    setColor(
      colorCodeType.current === 'hex'
        ? generateRandomHexCode()
        : generateRandomRGBCode()
    );
  };

  const handleChange = (type) => {
    colorCodeType.current = type;
  };

  return (
    <>
      <div className="">
        <label htmlFor="hex">Generate random HEX color code</label>
        <input
          className="m-2"
          type="radio"
          name="color"
          id="hex"
          defaultChecked
          onClick={() => {
            handleChange('hex');
          }}
        />
        <label htmlFor="rgb" className="m-2">
          Generate random RGB color code
        </label>
        <input
          type="radio"
          name="color"
          id="rgb"
          onClick={() => {
            handleChange('rgb');
          }}
        />
      </div>
      <div
        className="output min-h-[500px] p-4 rounded-md text-2xl text-white font-bold flex flex-col justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <h1>{color}</h1>

        <button
          className="px-4 py-2 text-center rounded-md bg-blue-600 mt-2 active:bg-blue-600 active:scale-95"
          onClick={() => {
            handleClick();
          }}
        >
          Generate Random color
        </button>
      </div>
    </>
  );
}

export default RandomColorGenerator;
