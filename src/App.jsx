import RatingComponent from "./star-rating/RatingComponent";
import "./App.css";
import CustomModal from "./custom-modal/CustomModal";
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

function App() {
  const { toolVal } = useContext(ToolContext);
  // console.log("toolVal", toolVal);

  const features = [
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
    { title: "LoadMore", element: <LoadMore /> },
    { title: "QRCodeGenerator", element: <QRCodeGenerator /> },
    { title: "TicTacToe", element: <TicTacToe /> },
    { title: "Accordion", element: <Accordion /> },
    { title: "GithubProfile", element: <GithubProfile /> },
    { title: "RandomColorGenerator", element: <RandomColorGenerator /> },
    { title: "ScrollIndicator, look at the top", element: <ScrollIndicator /> },
    { title: "RatingComponent", element: <RatingComponent /> },
    { title: "Slider", element: <Slider /> },
    { title: "LightDarkMode", element: <LightDarkMode /> },
    { title: "CustomTabs", element: <CustomTabs /> },
    { title: "CustomModal", element: <CustomModal /> },
    { title: "CustomHookDemo", element: <CustomHookDemo /> },
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
      {/* 
      <OTPInput length={4} />
      <OTPInput length={8} isPassword />
      <OTPInput
        length={8}
        isCharactersAllowed
        onComplete={(val) => {
          console.log(val);
        }}
        otp={12345678}
        onError={(val) => {
          alert(val);
        }}
      /> */}
      {/* <OTPInput otp={123456} /> */}
      {/* <OTPInput
        otp={"abc123"}
        isCharactersAllowed
        onSuccess={(val) => {
          alert(val);
        }}
        onError={(val) => console.log(val)}
      /> */}

      {/* <DNDNotes /> */}
      {toolVal.showPopup && <Modal />}
    </>
  );
}

export default App;
