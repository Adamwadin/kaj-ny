import React, { useEffect, useRef, useState } from 'react';


const GoogleMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = 'AIzaSyDVamKsrZWn610KmarrM_qNskU5dPAQRAg';

    const loadMap = (coordinates: { lat: number; lng: number }) => {
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (mapRef.current) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: coordinates,
            zoom: 10,
          });

          // ger en marker på platsen
          new window.google.maps.Marker({
            position: coordinates,
            map: map,
            title: 'Din plats',
          });
        }
      };
      document.head.appendChild(script);
    };

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            loadMap({ lat: latitude, lng: longitude });
            setLoading(false);
          },
          (error) => {
            setError('hitter ej plats');
            setLoading(false);
          }
        );
      } else {
        setError('meeeeeep!');
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div ref={mapRef} style={{ width: '50%', height: '500px', left: '25%' }}></div>;
};

export default GoogleMap;
