import { useState } from 'react';

function RatingComponent() {
  let [selectedStars, setSelectedStars] = useState(0);
  let [hoverStar, setHoverStar] = useState(0);

  const handleMouseOver = (index) => {
    setHoverStar(index);
  };
  const handleClick = (index) => {
    setSelectedStars(index);
    console.log(index);
  };
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        index++;
        return (
          <i
            key={index}
            className={`bi bi-star-fill text-3xl mx-2 ${
              index <= (selectedStars || hoverStar)
                ? // ? 'text-orange-500'
                  // : 'text-black'
                  'active'
                : 'inactive'
            }`}
            onClick={() => handleClick(index)}
            onMouseOver={() => handleMouseOver(index)}
          ></i>
        );
      })}

      {/* <i
        className="bi bi-star text-3xl mx-2"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      ></i>
      <i
        className="bi bi-star text-3xl mx-2"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      ></i>
      <i
        className="bi bi-star text-3xl mx-2"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      ></i>
      <i
        className="bi bi-star text-3xl mx-2"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
      ></i> */}
    </div>
  );
}

export default RatingComponent;
