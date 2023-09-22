import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places", "drawing"];

const MapInsideModal = ({ isOpen, onClose }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  useEffect(() => {
    // Any additional initialization code for the map can go here
  }, []);

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "23vw", // Adjust the height as needed
              }}
              center={{
                lat: 13.1067448,
                lng: 80.0969511,
              }}
              zoom={11}
              options={{
               
                zoomControl: false, 
                fullscreenControl: false, 
                mapTypeControl: false, 
                streetViewControl: false, 
              }}
            >
              
            </GoogleMap>
          ) : (
            <div>Loading...</div>
          )}
        </section>
        <footer className="modal-card-foot">
          
        </footer>
      </div>
    </div>
  );
};

export default MapInsideModal;
