import RatingComponent from "./star-rating/RatingComponent";
import "./App.css";
import CustomTabs from "./custom-tabs/CustomTabs";
import LightDarkMode from "./light-dark-mode/light-dark-mode";
import LoadMore from "./load-more-btn/LoadMore";
import QRCodeGenerator from "./qr-code-generator/QRCodeGenerator";
import RandomColorGenerator from "./random-color-generator/RandomColorGenerator";
import ScrollIndicator from "./scroll-indicator/ScrollIndicator";
import Slider from "./slider/Slider";
import Accordion from "./accordion/Accordion";
import GithubProfile from "./github-profile-card/GithubProfile";
import TicTacToe from "./TicTacToe/TicTacToe";
import CustomHookDemo from "./customHooks/CustomHookDemo";
import OTPInput from "./otp/OTPInput";
import DNDNotes from "./dnd-notes/DNDNotes";
import ToolProvider, { ToolContext } from "./context/ToolProvider";
import Modal from "./custom-modal/Modal";
import { useContext } from "react";
import Stepper from "./stepper/Stepper";
import SelectableGrid from "./selectable_grid/SelectableGrid";
import GridLights from "./grid-lights/GridLights";
import VirtualizedList from "./virtualized-list/VirtualizedList";
import ReOrderableList from "./reorderable-list/ReOrderableList";
import Pagination from "./pagination/Pagination";
import PasswordGenerator from "./password_generator/PasswordGenerator";
import DualHandleRange from "./range/DualHandleRange";
import ProgressBar from "./progress_bar/ProgressBar";
import ChipInput from "./chip-input/ChipInput";
import MultiSelect from "./multiselect/MultiSelect";
import MemoryGame from "./memory-game/MemoryGame";
import InfiniteScroll from "./infinite_scroll/InfiniteScroll";
import JobBoard from "./job_board/JobBoard";
import ModalButton from "./custom-modal/ModalButton";

function App() {
  const { toolVal } = useContext(ToolContext);
  // console.log("toolVal", toolVal);

  const features = [
    { title: "Stepper", element: <Stepper /> },
    { title: "Virtualized List", element: <VirtualizedList /> },
    { title: "Dual Handle Range Selector ", element: <DualHandleRange /> },
    { title: "Chip Input", element: <ChipInput /> },
    {
      title: "OTP Input",
      element: (
        <OTPInput
          otp={"abc123"}
          isCharactersAllowed
          onSuccess={(val) => {
            alert(val);
          }}
          onError={(val) => console.log(val)}
        />
      ),
    },
    { title: "Drag and Drop", element: <DNDNotes /> },
    { title: "Selectable Grid", element: <SelectableGrid /> },
    { title: "Password Generator", element: <PasswordGenerator /> },
    { title: "Multi Select", element: <MultiSelect /> },
    { title: "Re-orderable List", element: <ReOrderableList /> },
    { title: "Pagination", element: <Pagination /> },
    { title: "Grid Lights", element: <GridLights /> },
    { title: "Progress Bar", element: <ProgressBar /> },
    { title: "Memory Game", element: <MemoryGame /> },

    { title: "QRCode Generator", element: <QRCodeGenerator /> },
    { title: "Job Board", element: <JobBoard /> },
    { title: "Load More", element: <LoadMore /> },
    { title: "Tic Tac Toe", element: <TicTacToe /> },
    { title: "Accordion", element: <Accordion /> },
    { title: "Github Profile", element: <GithubProfile /> },
    { title: "RandomColor Generator", element: <RandomColorGenerator /> },
    {
      title: "Scroll Indicator, look at the top",
      element: <ScrollIndicator />,
    },
    { title: "Rating Component", element: <RatingComponent /> },
    { title: "Slider", element: <Slider /> },
    { title: "Light Dark Mode", element: <LightDarkMode /> },
    { title: "Custom Tabs", element: <CustomTabs /> },
    { title: "Custom Modal", element: <ModalButton /> },
    { title: "Custom Hook Demo", element: <CustomHookDemo /> },
    { title: "Infinite scroll", element: <InfiniteScroll /> },
    // <UserProfile />,
  ];

  // console.log("toolVal.showPopup", toolVal.showPopup);
  return (
    <>
      {features.map((feature, index) => (
        <div className="features-container" key={index}>
          <h1 className="features-container-heading">{feature.title}</h1>
          {feature.element}
        </div>
      ))}

      {toolVal.showPopup && <Modal />}
    </>
  );
}

export default App;
