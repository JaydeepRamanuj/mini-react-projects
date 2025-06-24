import { useEffect, useState } from "react";

function ProgressBar() {
  // Using useRef

  // just to re-render
  //   const [_, setRenderTrigger] = useState<number>(0);

  //   const progress = useRef<number>(0);
  //   useEffect(() => {
  //     const generateProgressData = setInterval(() => {
  //       if (progress.current === 100) {
  //         clearInterval(generateProgressData);
  //       } else {
  //         progress.current += 1;
  //         setRenderTrigger(progress.current);
  //       }
  //     }, 50);
  //   }, []);

  //   using useState
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    const generateProgressData = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(generateProgressData);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(generateProgressData);
  }, []);

  return (
    <div className="mx-auto w-[70%]">
      <h1 className="text-blue-800 text-3xl font-semibold">ProgressBar</h1>
      <div className=" mt-6 rounded-xl border border-gray-600 relative">
        <div
          role="progressbar"
          className={`h-8 bg-green-500 w-1/2 rounded-xl font-semibold text-center transition duration-300  `}
          style={{ width: progress + "%" }}
        ></div>
        <div
          className={`w-full text-lg text-center h-full absolute left-0 top-0 font-semibold flex justify-center items-center ${
            progress > 50 && "text-white"
          }`}
        >{`${progress}% `}</div>
      </div>
    </div>
  );
}

export default ProgressBar;
