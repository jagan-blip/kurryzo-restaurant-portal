import React, { useEffect, useState, useRef } from "react";
import Modal from "../../../components/Modal/Modal";
import cancel from "../../../assets/cancel.svg";
import maskMan from "../../../assets/maskman.svg";
import MapInsideModal from "./MapInsideModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  GoogleMap,
  Marker,
  OverlayViewF,
  OVERLAY_MOUSE_TARGET,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { ReactComponent as Triangle } from "../../../assets/triangle.svg";
import "../../../App.css";
const libraries = ["places", "drawing"];
const AreaCard = ({ title, total, online, offline, data }) => {
  const onlineWidth = (online / total) * 100;
  const offlineWidth = (offline / total) * 100;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [polygon, setPolygon] = useState([]);
  const [map, setMap] = useState();
  const [zoomlevel, setZoomlevel] = useState(10);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  function findPolygonCentroid(vertices) {
    const numVertices = vertices?.length;
    let sumX = 0;
    let sumY = 0;

    for (const vertex of vertices) {
      sumX += vertex.lng;
      sumY += vertex.lat;
    }

    const centroidX = sumX / numVertices;
    const centroidY = sumY / numVertices;

    return { lat: centroidY, lng: centroidX };
  }
  const onLoadMaps = React.useCallback(function callback(map) {
    map.setZoom(14);
    setMap(map);
  }, []);
  useEffect(() => {
    let path = [];
    for (let i = 0; i < data?._id[0]?.coordinates?.length; i++) {
      path?.push({
        lat: data?._id[0]?.coordinates[i][1],
        lng: data?._id[0]?.coordinates[i][0],
      });
    }
    setPolygon(path);
  }, []);

  return (
    <div className="bg-[#F5F9FA] border border-dashed border-gray-500 md:rounded-2xl rounded-3xl">
      <p className="text-center  mt-2 md:text-2xl font-semibold  tracking-widest">
        {title}
      </p>
      <div className="mt-3 flex px-3">
        <div className="bg-[#d8f8e7] flex justify-between py-2 px-2 items-center  w-[100%] rounded-lg font-semibold  ">
          <p className="text-lg">TOTAL</p>
          <p className="w-20 md:w-20 py-1 md:py-2 text-center text-lg rounded-md font-medium bg-[#00A859] text-white ">
            {total}
          </p>
        </div>
      </div>
      <div className="flex px-3 mt-6 gap-1 md:gap-4  ">
        <div className="w-[90%] bg-[#dddddd] rounded md:rounded-md">
          <div
            className="h-[100%] flex items-center rounded bg-gradient-to-r from-[#256DFA] to-[#98BBF9] md:rounded-md "
            style={{ width: `${onlineWidth}%` }}
          >
            <p className=" text-white font-medium px-3 md:py-1 text-xs md:text-base">
              ONLINE
            </p>
          </div>
        </div>
        <p className="font-bold text-sm md:text-2xl w-[10%]">{online}</p>
      </div>

      <div className="flex px-3 mt-6 gap-1 md:gap-4 ">
        <div className=" w-[90%]  bg-[#dddddd] rounded md:rounded-md">
          <div
            className="h-[100%] flex items-center bg-gradient-to-r from-[#FA255E] to-[#D89FBE] rounded md:rounded-md "
            style={{ width: `${offlineWidth}%` }}
          >
            <p className=" text-white font-medium px-3 md:py-1 text-xs md:text-base">
              OFFLINE
            </p>
          </div>
        </div>
        <p className="font-bold text-sm md:text-2xl w-[10%]">{offline}</p>
      </div>

      <div className="text-center text-lg md:text-right px-3 mt-3 mb-3">
        <p
          className="text-[#FF6B00] cursor-pointer font-medium"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          View drivers
        </p>
      </div>
      <Modal
        show={isModalOpen}
        setShow={setIsModalOpen}
        disableBackClick={false}
        onBackClick={() => setIsModalOpen(false)}
      >
        <div className="bg-white md:min-w-[25vw] min-h-[10vh] rounded-xl flex flex-col relative">
          <div className=" absolute top-0 z-30 w-full rounded-t-xl flex flex-row justify-between items-center py-2 px-2">
            <p className="uppercase"></p>
            <div
              className="primary-gradient w-6 h-6 flex  justify-center items-center rounded-md cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} color={"#fff"} />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{
                  width: "500px",
                  height: "50vh",
                  maxWidth: "80vw",
                  maxHeight: "100%",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                center={
                  polygon?.length > 0
                    ? findPolygonCentroid(polygon)
                    : polygon[0]
                }
                onLoad={onLoadMaps}
                onZoomChanged={() => {
                  setZoomlevel(map?.getZoom());
                }}
                zoom={14}
                options={{
                  zoomControl: false,
                  fullscreenControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  disableDoubleClickZoom: true,
                  /*      scrollwheel: false, */
                }}
              >
                {" "}
                <Polygon
                  paths={polygon}
                  onClick={() => {}}
                  options={{
                    fillColor: "rgba(64, 138, 206,0.2)", // Fill color of the polygon
                    fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
                    strokeColor: "#3582CD", // Border color of the polygon
                    strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
                    strokeWeight: 3, // Width of the border stroke
                  }}
                />
                {data?.drivers?.map((item, index) => {
                  return (
                    <OverlayViewF
                      position={{
                        lat: item?.driver?.location?.coordinates[1],
                        lng: item?.driver?.location?.coordinates[0],
                      }}
                      mapPaneName={OVERLAY_MOUSE_TARGET}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <div className="bg-green-600 px-1 rounded">
                          <p className="text-white font-semibold">
                            {item?.driver?.name}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-center marker-shadow">
                          <div className="relative bg-white w-8 h-8 p-1 rounded-full ">
                            <img
                              src={item?.driver?.profile_image || maskMan}
                              alt={item?.driver.name}
                              className="rounded-full w-[100%] h-[100%]"
                              onError={(e) => {
                                e.target.src = maskMan;
                              }}
                            />
                          </div>
                          <div className=" -mt-[2px]">
                            <Triangle />
                          </div>
                        </div>
                      </div>
                    </OverlayViewF>
                    /*  <Marker
                      position={{
                        lat: item?.driver?.location?.coordinates[1],
                        lng: item?.driver?.location?.coordinates[0],
                      }}
                    >
                      <div>asd</div>{" "}
                    </Marker> */
                  );
                })}
              </GoogleMap>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AreaCard;
