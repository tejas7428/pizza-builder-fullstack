import { useState, useEffect } from 'react';

const useGeolocationState = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
        loading: false
      });
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
        loading: false
      });
    };

    const handleError = (error) => {
      setLocation({
        latitude: null,
        longitude: null,
        error: error.message,
        loading: false
      });
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return location;
};

export default useGeolocationState;