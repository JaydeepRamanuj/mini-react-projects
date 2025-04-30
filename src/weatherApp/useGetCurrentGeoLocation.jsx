import { useEffect, useState } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState();

  useEffect(() => {
    try {
      window.navigator.geolocation.getCurrentPosition(
        (response) => {
          console.log(response);
          setLocation(response.coords);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  return [location];
}

export default useGeoLocation;
