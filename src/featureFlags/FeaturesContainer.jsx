import { useState } from 'react';

import RatingComponent from '../star-rating/RatingComponent';
import LightDarkMode from '../light-dark-mode/light-dark-mode';
import LoadMore from '../load-more-btn/LoadMore';
import QRCodeGenerator from '../qr-code-generator/QRCodeGenerator';
import ScrollIndicator from '../scroll-indicator/ScrollIndicator';
import Slider from '../slider/Slider';
function FeaturesContainer() {
  const [featuresList, setFeaturesList] = useState({
    featureEnableTime: '',
    featureVersionNumber: '',
    features: {
      ratingComponent: {
        status: true,
        component: <RatingComponent />,
        conditions: [],
        dependencyList: [],
      },
      slider: {
        status: true,
        component: <Slider />,
        conditions: [],
        dependencyList: [],
      },
      loadMore: {
        status: true,
        component: <LoadMore />,
        conditions: [],
        dependencyList: [],
      },
      QRCodeGenerator: {
        status: false,
        component: <QRCodeGenerator />,
        conditions: [],
        dependencyList: [],
      },
      lightDarkMode: {
        status: false,
        component: <LightDarkMode />,
        conditions: [],
        dependencyList: [],
      },
      scrollIndicator: {
        status: false,
        component: <ScrollIndicator />,
        conditions: [],
        dependencyList: [],
      },
    },
  });

  return (
    <div>
      {Object.keys(featuresList.features).map((feature) => {
        if (featuresList.features[feature].status) {
          return featuresList.features[feature].component;
        }
      })}
    </div>
  );
}

export default FeaturesContainer;
