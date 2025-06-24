import { useState } from "react";
import AccordionItem from "./AccordionItem";
import accordionData from "./accordionData";

function Accordion() {
  let [curr, setCurrVal] = useState(null);

  let toggleAccordion = (id) => {
    setCurrVal((prev) => (prev == id - 1 ? null : id - 1));
  };

  return (
    <>
      <div className="flex flex-col w-1/2 mx-auto mt-10">
        <button className="text-3xl bg-blue-100 text-center px-8 py-4 rounded text-blue-800">
          Accordions
        </button>
        <ul>
          {accordionData &&
            accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                accid={item.id}
                title={item.question}
                content={item.answer}
                setItem={toggleAccordion}
                isActive={curr == item.id - 1}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default Accordion;
