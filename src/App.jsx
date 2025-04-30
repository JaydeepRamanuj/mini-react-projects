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

function App() {
  const features = [
    { title: "RatingComponent", element: <RatingComponent /> },
    { title: "Slider", element: <Slider /> },
    { title: "LoadMore", element: <LoadMore /> },
    { title: "QRCodeGenerator", element: <QRCodeGenerator /> },
    { title: "LightDarkMode", element: <LightDarkMode /> },
    { title: "ScrollIndicator, look at the top", element: <ScrollIndicator /> },
    { title: "CustomTabs", element: <CustomTabs /> },
    { title: "CustomModal", element: <CustomModal /> },
    { title: "RandomColorGenerator", element: <RandomColorGenerator /> },
    { title: "Accordion", element: <Accordion /> },
    { title: "GithubProfile", element: <GithubProfile /> },
    { title: "TicTacToe", element: <TicTacToe /> },
    { title: "CustomHookDemo", element: <CustomHookDemo /> },
    // <UserProfile />,
  ];
  return (
    <>
      {features.map((feature, index) => (
        <div className="features-container" key={index}>
          <h1 className="features-container-heading">{feature.title}</h1>
          {feature.element}
        </div>
      ))}
    </>
  );
}

export default App;
