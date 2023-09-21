import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import {
  DrawingManager,
  GoogleMap,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import add from "../../assets/basil_add-solid.svg";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useSnackbar } from "../../components/SnackBar/useSnackBar";
import getApiClient from "../../axios/axios";
import PageLoading from "../../components/PageLoading/PageLoading";
import XPolygon from "./Components/XPolygon";
import OutsideclickWrapper from "../../components/OutsideClickWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faClose, faPencil } from "@fortawesome/free-solid-svg-icons";
import circle from "@turf/circle";
import bboxPolygon from "@turf/bbox-polygon";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import * as Yup from "yup";
const libraries = ["places", "drawing"];
const Areas = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });
  const [loading, setLoading] = useState(false);
  const [map, setMap] = React.useState(null);
  const [newmap, setNewMap] = useState(null);
  const activePolygonIndex = useRef();
  const drawingManagerRef = useRef();
  const newDrawingManagerRef = useRef();
  const polygonRefs = useRef([]);
  const [zones, setAllZones] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedPolygon, setSelectedPolygon] = useState();
  const { isActive, message, openSnackBar, type } = useSnackbar();
  const [zoomlevel, setZoomlevel] = useState(10);
  const [surgeModal, setSurgeModal] = useState(false);
  const [surgeModalFee, setSurgeModalFee] = useState();
  const surgeOptions = ["DUE TO HIGH RAIN", "DUE TO HIGH DEMAND"];
  const [surgeModalReason, setSurgeModalReason] = useState(surgeOptions[0]);
  const [newZoneModal, setNewZoneModal] = useState(false);
  const [newZoneName, setNewZoneName] = useState();
  const [newZonePolygon, setNewZonePolygon] = useState([]);
  const [error, setError] = useState({});
  const [edit, setEdit] = useState(false);
  const formSchema = Yup.object().shape({
    fee: Yup.number().required("fee is required"),
    reason: Yup.string().required("reason is required"),
  });
  const newZoneSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    coordinates: Yup.array()
      .of(Yup.array().of(Yup.number()).length(2))
      .required("please draw a zone")
      .min(1, "please draw a zone"),
  });
  const getAllZones = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.get("/v1/zone");
      if (response?.data?.success === true) {
        let all_zones = response?.data?.data?.zones;
        let all_polygons = [];
        setAllZones(all_zones);
        for (let zone of all_zones) {
          let path = [];
          for (let i = 0; i < zone?.coordinates?.length; i++) {
            path?.push({
              lat: zone?.coordinates[i][1],
              lng: zone?.coordinates[i][0],
            });
          }

          all_polygons?.push({
            path: path,
            name: zone?.name,
            _id: zone?._id,
            delivery_config: zone?.delivery_config,
            surge: zone?.surge,
            is_surge_active: zone?.is_surge_active,
          });
        }
        setPolygons(all_polygons);
      } else {
        openSnackBar(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      openSnackBar(
        err.response.data.error.message ?? "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };

  const updatePolygon = async (coordinates) => {
    setLoading(true);
    try {
      let arr = [];
      for (let i = 0; i < coordinates?.length; i++) {
        arr?.push([coordinates[i]?.lng, coordinates[i]?.lat]);
      }
      const axios = await getApiClient();
      const response = await axios.put("/v1/zone/update", {
        zone_id: selectedPolygon,
        coordinates: arr,
      });
      if (response?.data?.success) {
        await getAllZones();
        setSelectedPolygon(null);
        openSnackBar("updated zone", "success");
      } else {
        openSnackBar(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      openSnackBar(
        err.response?.data?.error?.message ?? "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  const onLoadMaps = React.useCallback(function callback(map) {
    map.setZoom(11);
    var latlng = new window.google.maps.LatLng({
      lat: 13.1067448,
      lng: 80.0969511,
    });
    map.setCenter(latlng);

    setMap(map);
  }, []);

  const onLoadDrawingManager = (drawingManager) => {
    drawingManagerRef.current = drawingManager;
  };
  const onLoadNewDrawingManager = (drawingManager) => {
    newDrawingManagerRef.current = drawingManager;
  };

  const onOverlayComplete = ($overlayEvent) => {
    drawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);
      updatePolygon(newPolygon);
    } else if (
      $overlayEvent.type === window.google.maps.drawing.OverlayType.CIRCLE
    ) {
      const center = $overlayEvent.overlay.getCenter();
      const radius = $overlayEvent.overlay.getRadius();
      const coordinates = circle([center?.lng(), center?.lat()], radius, {
        units: "meters",
        steps: 100,
      });
      let arr = [];

      for (let i = 0; i < coordinates?.geometry?.coordinates[0]?.length; i++) {
        arr.push({
          lat: coordinates?.geometry?.coordinates[0][i][1],
          lng: coordinates?.geometry?.coordinates[0][i][0],
        });
      }

      $overlayEvent.overlay?.setMap(null);
      updatePolygon(arr);
    } else if (
      $overlayEvent.type === window.google.maps.drawing.OverlayType.RECTANGLE
    ) {
      let minX = $overlayEvent.overlay.bounds.Ua.lo;
      let minY = $overlayEvent.overlay.bounds.Ia.lo;
      let maxX = $overlayEvent.overlay.bounds.Ua.hi;
      let maxY = $overlayEvent.overlay.bounds.Ia.hi;
      let bbox = [minX, minY, maxX, maxY];
      var poly = bboxPolygon(bbox);
      const coordinates = poly.geometry.coordinates[0];
      let arr = [];

      for (let i = 0; i < coordinates?.length; i++) {
        arr.push({
          lat: coordinates[i][0],
          lng: coordinates[i][1],
        });
      }
      $overlayEvent.overlay?.setMap(null);
      updatePolygon(arr);
    }
  };
  const onNewOverlayComplete = ($overlayEvent) => {
    newDrawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);

      setNewZonePolygon(newPolygon);
    } else if (
      $overlayEvent.type === window.google.maps.drawing.OverlayType.CIRCLE
    ) {
      const center = $overlayEvent.overlay.getCenter();
      const radius = $overlayEvent.overlay.getRadius();
      const coordinates = circle([center?.lng(), center?.lat()], radius, {
        units: "meters",
        steps: 100,
      });
      let arr = [];

      for (let i = 0; i < coordinates?.geometry?.coordinates[0]?.length; i++) {
        arr.push({
          lat: coordinates?.geometry?.coordinates[0][i][1],
          lng: coordinates?.geometry?.coordinates[0][i][0],
        });
      }

      $overlayEvent.overlay?.setMap(null);
      setNewZonePolygon(arr);
    } else if (
      $overlayEvent.type === window.google.maps.drawing.OverlayType.RECTANGLE
    ) {
      let minX = $overlayEvent.overlay.bounds.Ua.lo;
      let minY = $overlayEvent.overlay.bounds.Ia.lo;
      let maxX = $overlayEvent.overlay.bounds.Ua.hi;
      let maxY = $overlayEvent.overlay.bounds.Ia.hi;
      let bbox = [minX, minY, maxX, maxY];
      var poly = bboxPolygon(bbox);
      const coordinates = poly.geometry.coordinates[0];
      let arr = [];

      for (let i = 0; i < coordinates?.length; i++) {
        arr.push({
          lat: coordinates[i][0],
          lng: coordinates[i][1],
        });
      }
      $overlayEvent.overlay?.setMap(null);
      setNewZonePolygon(arr);
    }
  };
  const onDeleteDrawing = () => {
    const filtered = polygons.filter(
      (polygon, index) => index !== activePolygonIndex.current
    );
    setPolygons(filtered);
  };
  const onEditPolygon = (index) => {
    const polygonRef = polygonRefs.current[index];
    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map((latLng) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      const allPolygons = [...polygons];
      allPolygons[index] = coordinates;
      setPolygons(allPolygons);
    }
  };
  const addSurge = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/zone/add-surge", {
        fee: surgeModalFee,
        reason:
          surgeModalReason === "DUE TO HIGH RAIN"
            ? "rain"
            : surgeModalReason === "DUE TO HIGH DEMAND"
            ? "demand"
            : "",
        zone_id: selectedPolygon,
      });
      if (response?.data?.success === true) {
        openSnackBar("Added surge", "success");
        setSurgeModal(false);
        await getAllZones();
        setSelectedPolygon(null);
      } else {
        openSnackBar(
          response?.data?.error?.message || "something went wrong",
          "error"
        );
      }
    } catch (err) {
      openSnackBar(
        err?.response?.data?.error?.message || "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  const removeSurge = async (zone_id) => {
    setLoading(true);
    console.log("surge", zone_id);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/zone/remove-surge", {
        zone_id: zone_id,
      });

      if (response?.data?.success === true) {
        openSnackBar("Removed surge", "success");
        setSurgeModal(false);
        await getAllZones();
        setSelectedPolygon(null);
      } else {
        openSnackBar(
          response?.data?.error?.message || "something went wrong",
          "error"
        );
      }
    } catch (err) {
      openSnackBar(
        err?.response?.data?.error?.message || "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  const handleSurgeSubmit = async () => {
    setError({});
    try {
      await formSchema.validate(
        {
          fee: surgeModalFee,
          reason: surgeModalReason,
        },
        { abortEarly: false }
      );
      addSurge();
    } catch (err) {
      setError(
        err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {})
      );
    }
  };
  const CreateNewZone = async (coordinates) => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/zone/create", {
        name: newZoneName,
        coordinates: coordinates,
      });
      if (response?.data?.success === true) {
        openSnackBar("Added zone", "success");
        setNewZoneModal(false);
        await getAllZones();
        setNewZonePolygon([]);
      } else {
        openSnackBar(
          response?.data?.error?.message || "something went wrong",
          "error"
        );
      }
    } catch (err) {
      openSnackBar(
        err?.response?.data?.error?.message || "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  const handleNewZoneSubmit = async () => {
    setError({});
    let coordinates = [];
    for (let i = 0; i < newZonePolygon?.length; i++) {
      coordinates?.push([newZonePolygon[i]?.lng, newZonePolygon[i]?.lat]);
    }
    console.log(coordinates);
    try {
      await newZoneSchema.validate(
        {
          name: newZoneName,
          coordinates: coordinates,
        },
        { abortEarly: false }
      );
      CreateNewZone(coordinates);
    } catch (err) {
      console.log(
        err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {})
      );
      setError(
        err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {})
      );
    }
  };
  const onNewLoadMaps = React.useCallback(function callback(map) {
    map.setZoom(11);
    var latlng = new window.google.maps.LatLng({
      lat: 13.1067448,
      lng: 80.0969511,
    });
    map.setCenter(latlng);

    setNewMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const onNewUnmount = React.useCallback(function callback(map) {
    setNewMap(null);
  }, []);

  useEffect(() => {
    getAllZones();
  }, []);

  useEffect(() => {
    if (!selectedPolygon) {
      setEdit(false);
    }
  }, [selectedPolygon]);
  useEffect(() => {
    if (surgeModal === false) {
      setSurgeModalFee();
      setSurgeModalReason("DUE TO HIGH RAIN");
      setError({});
    }
  }, [surgeModal]);
  useEffect(() => {
    if (newZoneModal === false) {
      setNewZoneName("");
      setNewZonePolygon([]);
      setError({});
    }
  }, [newZoneModal]);
  return (
    <>
      {loading && <PageLoading />}
      <Modal show={surgeModal} setShow={setSurgeModal}>
        <div className="bg-white md:min-w-[25vw] min-h-[10vh] rounded-xl flex flex-col relative">
          <div className="bg-gray-300 rounded-t-xl flex flex-row justify-between items-center py-2 px-2">
            <p className="uppercase">Add surge fee</p>
            <div
              className="primary-gradient w-6 h-6 flex  justify-center items-center rounded-md cursor-pointer"
              onClick={() => {
                setSurgeModal(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} color={"#fff"} />
            </div>
          </div>
          <div className=" p-2 px-8">
            <div className="mt-4">
              <p className="uppercase text-sm text-text_high_emp">SURGE FEE</p>
              <Input
                value={surgeModalFee}
                type="text"
                placeholder=""
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9]/g, "");
                  setSurgeModalFee(value);
                }}
                styles="mt-2 py-2"
              />
              {error?.fee && <p className="text-red-500">{error?.fee}</p>}
            </div>
            <div className="mt-4">
              <p className="uppercase text-sm text-text_high_emp mb-2">
                REASON
              </p>
              <DropDown
                options={surgeOptions}
                selected={surgeModalReason}
                onSelect={(e) => {
                  setSurgeModalReason(e);
                }}
              />
              {error?.reason && <p className="text-red-500">{error?.reason}</p>}
              {/*   {error?.name && <p className="text-red-500">{error?.name}</p>} */}
            </div>
            <div className=" text-center mt-4">
              <button
                className="primary-gradient px-6 py-1 rounded-md font-medium uppercase text-white"
                onClick={() => {
                  handleSurgeSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={newZoneModal} setShow={setNewZoneModal}>
        <div className="bg-white md:min-w-[25vw] min-h-[10vh] rounded-xl flex flex-col relative">
          <div className="bg-gray-300 rounded-t-xl flex flex-row justify-between items-center py-2 px-2">
            <p className="uppercase">Create new zone</p>
            <div
              className="primary-gradient w-6 h-6 flex  justify-center items-center rounded-md cursor-pointer"
              onClick={() => {
                setNewZoneModal(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} color={"#fff"} />
            </div>
          </div>
          <div className="mt-4 px-4 pb-4">
            <p className="uppercase text-sm text-text_high_emp">Zone name</p>
            <Input
              value={newZoneName}
              type="text"
              placeholder="Enter zone name"
              onChange={(e) => {
                let value = e.target.value;

                setNewZoneName(value);
              }}
              styles="mt-2 py-2"
            />
            {error?.name && <p className="text-red-500">{error?.name}</p>}
            <GoogleMap
              mapContainerStyle={{
                width: "500px",
                height: "50vh",
                maxWidth: "100%",
                maxHeight: "100%",
                marginTop: 10,
              }}
              onZoomChanged={() => {
                setZoomlevel(map?.getZoom());
              }}
              zoom={10}
              onLoad={onNewLoadMaps}
              onUnmount={onNewUnmount}
              options={{
                gestureHandling: "greedy",
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
              }}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <DrawingManager
                onLoad={onLoadNewDrawingManager}
                onOverlayComplete={onNewOverlayComplete}
                options={{
                  polygonOptions: {
                    fillColor: "rgba(19, 144, 194,0)", // Fill color of the polygon
                    fillOpacity: 0, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
                    strokeColor: "#000", // Border color of the polygon
                    strokeOpacity: 0.85, // Opacity of the border color (0 = transparent, 1 = fully opaque)
                    strokeWeight: 2, // Width of the border stroke
                  },
                  drawingControl: true,
                  drawingControlOptions: {
                    position: window.google?.maps?.ControlPosition?.TOP_CENTER,
                    drawingModes: [
                      window.google?.maps?.drawing?.OverlayType?.POLYGON,
                      window.google?.maps?.drawing?.OverlayType?.CIRCLE,
                      window.google?.maps?.drawing?.OverlayType?.RECTANGLE,
                    ],
                  },
                }}
              />
              {polygons?.map((item, index) => {
                return (
                  <Polygon
                    key={index}
                    path={item?.path}
                    options={{
                      fillColor: "rgba(64, 138, 206,0.2)", // Fill color of the polygon
                      fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
                      strokeColor: "#3582CD", // Border color of the polygon
                      strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
                      strokeWeight: 3, // Width of the border stroke
                    }}
                  />
                );
              })}
              {newZonePolygon?.length > 0 && (
                <Polygon
                  paths={newZonePolygon}
                  onClick={() => {}}
                  options={{
                    fillColor: "rgba(255, 0, 0,0.2)", // Fill color of the polygon
                    fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
                    strokeColor: "#FF0000", // Border color of the polygon
                    strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
                    strokeWeight: 3, // Width of the border stroke
                  }}
                />
              )}
            </GoogleMap>
            {error?.coordinates && (
              <p className="text-red-500">{error?.coordinates}</p>
            )}
            <div className=" text-center mt-4">
              <button
                className="primary-gradient px-6 py-1 rounded-md font-medium uppercase text-white"
                onClick={() => {
                  handleNewZoneSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <MainLayout>
        {" "}
        <SnackBar isActive={isActive} message={message} type={type} />
        <div className="h-[calc(100vh-20px)] relative md:min-h-[100vh] pt-14 pb-10 md:pt-0 md:pb-0  w-[100%]">
          <button
            className="flex gap-2 primary-gradient absolute right-4 top-[90px] md:top-4  px-3 py-2 rounded-md z-50"
            onClick={() => {
              setNewZoneModal(true);
            }}
          >
            <img src={add} alt="" />
            <div>
              <p className="text-white font-medium">CREATE NEW AREA</p>
            </div>
          </button>
          {selectedPolygon && (
            <div className="z-50 absolute bottom-[70px] right-4 md:bottom-10 md:right-10">
              <button
                className="flex shadow-lg w-[45px] h-[45px] items-center rounded-lg justify-center p-2  bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] text-white"
                onClick={() => {
                  setSurgeModal(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faBolt}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                  color={"#fff"}
                />
              </button>
              <button
                className="flex mt-2 shadow-lg w-[45px] h-[45px] items-center rounded-lg justify-center p-2  bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] text-white"
                onClick={() => {
                  if (!edit) {
                    openSnackBar("edit tools are at the top", "success");
                  }
                  setEdit(!edit);
                }}
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  color={"#fff"}
                />
              </button>
            </div>
          )}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{
                width: "100vw",
                height: "100vh",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
              onZoomChanged={() => {
                setZoomlevel(map?.getZoom());
              }}
              zoom={10}
              onLoad={onLoadMaps}
              onUnmount={onUnmount}
              options={{
                gestureHandling: "greedy",
                zoomControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
              }}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <DrawingManager
                onLoad={onLoadDrawingManager}
                onOverlayComplete={onOverlayComplete}
                options={{
                  polygonOptions: {
                    fillColor: "rgba(19, 144, 194,0)", // Fill color of the polygon
                    fillOpacity: 0, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
                    strokeColor: "#000", // Border color of the polygon
                    strokeOpacity: 0.85, // Opacity of the border color (0 = transparent, 1 = fully opaque)
                    strokeWeight: 2, // Width of the border stroke
                  },
                  drawingControl: edit,
                  drawingControlOptions: {
                    position: window.google?.maps?.ControlPosition?.TOP_CENTER,
                    drawingModes: [
                      window.google?.maps?.drawing?.OverlayType?.POLYGON,
                      window.google?.maps?.drawing?.OverlayType?.CIRCLE,
                      window.google?.maps?.drawing?.OverlayType?.RECTANGLE,
                    ],
                  },
                }}
              />
              {polygons?.map((item, index) => {
                return (
                  <XPolygon
                    key={index}
                    zoom={zoomlevel}
                    path={item?.path}
                    name={item?.name}
                    zone_id={item?._id}
                    map={map}
                    onClick={(e) => {
                      if (selectedPolygon === item?._id) {
                        setSelectedPolygon(null);
                      } else {
                        setSelectedPolygon(item?._id);
                      }
                    }}
                    selected={selectedPolygon === item?._id}
                    delivery_config={item?.delivery_config}
                    is_surge_active={item?.is_surge_active}
                    surge={item?.surge}
                    openSnackBar={openSnackBar}
                    getAllZones={getAllZones}
                    removeSurge={removeSurge}
                  />
                );
              })}
            </GoogleMap>
          )}
        </div>
      </MainLayout>{" "}
    </>
  );
};

export default Areas;
