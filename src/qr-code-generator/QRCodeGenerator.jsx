import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator() {
  const [input, setInput] = useState('');
  const [value, setValue] = useState('this is test qr code');
  const generateQRCode = () => {
    setValue(input);
    setInput('');
  };
  return (
    <div>
      <h1>QR Code Generator</h1>
      <div className=" mx-auto mt-6 w-fit">
        <input
          type="text"
          name=""
          id=""
          value={input}
          className="border-2 p-1 mr-4 rounded"
          placeholder="Enter some text here"
          onChange={(ele) => {
            setInput(ele.target.value);
          }}
        />
        <button
          className="py-1 px-6 rounded bg-blue-600 active:bg-blue-700 text-white active:scale-95"
          onClick={() => {
            generateQRCode();
          }}
        >
          Generate
        </button>
      </div>
      <div className="mt-10 py-10 mx-auto border-4 border-slate-800 rounded-lg">
        <QRCode className="mx-auto" value={value} size={300} />
      </div>
    </div>
  );
}

export default QRCodeGenerator;
