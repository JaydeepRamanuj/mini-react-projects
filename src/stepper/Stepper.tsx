import { useState } from "react";

type StepType = {
  id: number;
  title: string;
  status: "complete" | "incomplete";
};

function Stepper() {
  const [steps, setSteps] = useState<StepType[]>([
    { id: 1, title: "Place order", status: "incomplete" },
    { id: 2, title: "Get customer info", status: "incomplete" },
    { id: 3, title: "Payment", status: "incomplete" },
  ]);
  const [stepTitle, setStepTitle] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // console.log("steps =>", steps);
  // console.log("currentStep =>", currentStep);
  return (
    <div>
      <h1 className="text-blue-800 text-3xl font-bold">Stepper</h1>
      <div className="mt-6 bg-gray-100 rounded-lg p-2 w-fit mx-auto">
        <input
          type="text"
          name=""
          id="steps"
          min={3}
          max={15}
          value={stepTitle}
          placeholder="Enter step Title"
          className="p-1 rounded border text-lg"
          onChange={(e) => {
            setStepTitle(e.target.value);
          }}
        />
        <button
          className="mx-3 px-2 py-1 rounded w-fit text-white bg-blue-500 cursor-pointer hover:bg-blue-600 active:scale-[0.97]"
          onClick={() => {
            setSteps((prev) => [
              ...prev,
              { id: prev.length + 1, title: stepTitle, status: "incomplete" },
            ]);
            setStepTitle("");
          }}
        >
          Add new step
        </button>

        <button
          className="px-2 py-1 rounded-md text-red-700 bg-red-100"
          onClick={() => {
            setSteps([]);
            setCurrentStep(1);
          }}
        >
          Reset steps
        </button>
      </div>
      <div className="w-fit mx-auto mt-10 relative isolate">
        <div className=" flex items-center gap-[200px] ">
          {steps.map((step) => (
            <div
              className="w-fit flex flex-col items-center gap-2 z-10"
              key={step.id}
            >
              <div
                className={`size-[40px] flex justify-center items-center  font-semibold rounded-full  ${
                  currentStep >= step.id
                    ? step.status == "complete"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div
                className={`absolute px-3 py-1 rounded text-center  -bottom-10 whitespace-nowrap text-lg font-semibold ${
                  currentStep >= step.id
                    ? step.status == "complete"
                      ? "text-green-500"
                      : "text-blue-500"
                    : "text-gray-600"
                }`}
              >
                {step.title}
              </div>
            </div>
          ))}
        </div>
        {steps.length >= 1 && (
          <div
            className="h-[10px] w-full  bg-gray-200 absolute top-[20px] left-[20px] -translate-y-1/2 -z-0"
            style={{
              width: (steps.length - 1) * 200 + (steps.length - 1) * 40 + "px",
            }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-green-500 transition-all"
              style={{
                width: (currentStep - 1) * 200 + (currentStep - 1) * 40 + "px",
              }}
            ></div>
          </div>
        )}
      </div>
      {steps.length > 0 && (
        <div className="mt-20 text-3xl text-blue-600 font-semibold text-center">
          {steps[currentStep - 1].title}
        </div>
      )}
      <div className="mt-10 flex gap-4 justify-center">
        <button
          className="px-2 py-1 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 active:scale-[0.97] disabled:bg-blue-300"
          disabled={!(currentStep > 1)}
          onClick={() => {
            setSteps(
              steps.map((step: StepType) => {
                if (step.id == currentStep - 1) {
                  return { ...step, status: "incomplete" };
                } else {
                  return step;
                }
              })
            );
            setCurrentStep((prev) => prev - 1);
          }}
        >
          Previous
        </button>
        <button
          className="px-2 py-1 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600 active:scale-[0.97] disabled:bg-blue-300"
          disabled={!(currentStep < steps.length)}
          onClick={() => {
            setSteps(
              steps.map((step: StepType) => {
                if (step.id == currentStep) {
                  return { ...step, status: "complete" };
                } else {
                  return step;
                }
              })
            );
            setCurrentStep((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Stepper;
