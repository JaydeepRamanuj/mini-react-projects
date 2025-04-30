import { useState } from "react";
import { useEffect } from "react";

import Slide from "./Slide";

function Slider() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(1);
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=10&h=500&w=700")
      .then((response) => response.json())
      .then((result) => {
        setImages(result);
        setIsLoading(0);
      });
  }, []);

  function slide(index) {
    let newSlide = index;
    if (index <= 0) {
      newSlide = images.length - 1;
      //   setCurrentSlide(images.length - 1);
    } else if (index >= images.length) {
      newSlide = 0;
      //   setCurrentSlide(0);
    }

    setCurrentSlide(newSlide);
  }

  const slideLeft = () => {
    slide(currentSlide - 1);
  };
  const slideRight = () => {
    slide(currentSlide + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2">
        <span className="text-xl"> Loading...</span>
        <span className="block h-4 w-4 rounded-full border-2 animate-spin border-slate-300 border-t-slate-800"></span>
      </div>
    );
  }
  return (
    <div className="slider-wrapper relative overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <Slide key={index} url={img.download_url} />
        ))}
      </div>
      <div
        className="left absolute top-1/2 left-1 -translate-y-1/2 active:scale-95"
        onClick={slideLeft}
      >
        <i className="bi bi-arrow-left-circle-fill text-white/60"></i>
      </div>
      <div
        className="right left absolute top-1/2 right-1 -translate-y-1/2 active:scale-95"
        onClick={slideRight}
      >
        <i className="bi bi-arrow-right-circle-fill text-white/60"></i>
      </div>
    </div>
  );
}

export default Slider;
