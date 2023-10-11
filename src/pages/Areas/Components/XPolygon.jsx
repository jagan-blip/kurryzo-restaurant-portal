import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faClose, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Marker,
  Polygon,
  OVERLAY_MOUSE_TARGET,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import React, { Fragment, useEffect, useState } from "react";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import getApiClient from "../../../axios/axios";
import * as Yup from "yup";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import rainsurge from "../../../assets/rain_surge.png";
import demandsurge from "../../../assets/demand_surge.png";
const XPolygon = ({
  selected,
  path,
  name,
  onClick,
  map,
  zoom,
  zone_id,
  delivery_config,
  openSnackBar,
  getAllZones,
  is_surge_active,
  surge,
  removeSurge,
}) => {
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [config, setConfig] = useState(
    JSON.parse(JSON.stringify(delivery_config))
  );
  const selectedOption = {
    fillColor: "rgba(255, 0, 0,0.2)", // Fill color of the polygon
    fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
    strokeColor: "#FF0000", // Border color of the polygon
    strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
    strokeWeight: 3, // Width of the border stroke
  };
  const notSelectedOption = {
    fillColor: "rgba(64, 138, 206,0.2)", // Fill color of the polygon
    fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
    strokeColor: "#3582CD", // Border color of the polygon
    strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
    strokeWeight: 3, // Width of the border stroke
  };
  const surgeOption = {
    fillColor: "rgba(94, 0, 117,0.2)", // Fill color of the polygon
    fillOpacity: 0.35, // Opacity of the fill color (0 = transparent, 1 = fully opaque)
    strokeColor: "#5E0075", // Border color of the polygon
    strokeOpacity: 0.8, // Opacity of the border color (0 = transparent, 1 = fully opaque)
    strokeWeight: 3, // Width of the border stroke
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
  const getPixelPositionOffset = (width, height) => ({
    x: -width / 2,
    y: -height / 2,
  });
  const formSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    delivery_config: Yup.array()
      .of(
        Yup.object({
          _id: Yup.string().optional(),
          lower_range: Yup.number().required("lower range is required"),
          upper_range: Yup.number().required("upper range is required"),
          price_per_km: Yup.number().required("Rs/km is required"),
          base_price: Yup.number().required("base price is required"),
        })
      )
      .length(3)
      .required(),
  });

  const updateZone = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.put("/v1/zone/update", {
        name: editName,
        delivery_config: config,
        zone_id: zone_id,
      });
      if (response?.data?.success === true) {
        openSnackBar("updated zone !", "success");

        await getAllZones();
        setEdit(false);
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

  const handleSubmit = async () => {
    setError({});
    try {
      await formSchema.validate(
        {
          name: editName,
          delivery_config: config,
        },
        { abortEarly: false }
      );
      updateZone();
    } catch (err) {
      setError(
        err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {})
      );
    }
  };
  useEffect(() => {
    if (edit === false) {
      setEditName(name);
      setConfig(delivery_config);
      setError({});
    }
  }, [edit]);
  return (
    <>
      <Modal show={edit} setShow={setEdit}>
        <div className="bg-white md:min-w-[25vw] min-h-[10vh] rounded-xl flex flex-col relative">
          <div className="bg-gray-300 rounded-t-xl flex flex-row justify-between items-center py-2 px-2">
            <p className="uppercase">Edit Zone</p>
            <div
              className="primary-gradient w-6 h-6 flex  justify-center items-center rounded-md cursor-pointer"
              onClick={() => {
                setEdit(false);
              }}
            >
              <CloseIcon />
            </div>
          </div>
          <div className=" p-2">
            <div className="mt-4">
              <p className="uppercase text-sm text-text_high_emp">Zone name</p>
              <Input
                value={editName}
                type="text"
                placeholder=""
                onChange={(e) => {
                  setEditName(e.target.value);
                }}
                styles="mt-2 py-2"
              />
              {error?.name && <p className="text-red-500">{error?.name}</p>}
            </div>
            <div>
              <p className="uppercase text-sm text-text_high_emp mt-3 mb-3">
                Delivery Fee
              </p>
              <div className="mb-3 grid grid-cols-5 content-center  ">
                <div className=" ">
                  <p>Lower</p>
                </div>
                <div className=""></div>
                <div className="">
                  <p>Upper</p>
                </div>
                <div className="">
                  <p>Base</p>
                </div>{" "}
                <div className="">
                  <p>rs/km</p>
                </div>
              </div>
              {config?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <div key={index} className="grid grid-cols-5 mt-3">
                      <div className="w-[50px] ">
                        <input
                          value={item?.lower_range}
                          type="text"
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            let arr = JSON.parse(JSON.stringify(config));
                            arr[index].lower_range =
                              value !== "" ? parseInt(value) : null;
                            setConfig([...arr]);
                          }}
                          className="w-[100%] p-2 text-lg bg-[#D9D9D93D] text-text_medium_emp font-medium duration-200 rounded-md focus:ring-1 border-2 outline-none border-transparent focus:ring-pink-400 focus:border-pink-400"
                        ></input>
                      </div>

                      <div className="w-[80%] my-auto border-t border-primary border-dotted"></div>

                      <div className="w-[50px]">
                        <input
                          value={item?.upper_range}
                          type="text"
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            let arr = JSON.parse(JSON.stringify(config));
                            arr[index].upper_range =
                              value !== "" ? parseInt(value) : null;
                            setConfig([...arr]);
                          }}
                          className="w-[100%] p-2 text-lg bg-[#D9D9D93D] text-text_medium_emp font-medium duration-200 rounded-md focus:ring-1 border-2 outline-none border-transparent focus:ring-pink-400 focus:border-pink-400"
                        ></input>
                      </div>
                      <div className="w-[50px]">
                        <input
                          className={`p-2  bg-[#D9D9D93D] w-[100%]  text-text_medium_emp duration-200 rounded-md focus:ring-1 border-2 outline-none border-transparent focus:ring-pink-400 focus:border-pink-400 `}
                          value={item?.base_price}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            let arr = JSON.parse(JSON.stringify(config));

                            arr[index].base_price =
                              value !== "" ? parseInt(value) : null;
                            setConfig([...arr]);
                          }}
                          type={"text"}
                        />
                      </div>
                      <div className="w-[50px]">
                        <input
                          className={`p-2  bg-[#D9D9D93D] w-[100%] text-text_medium_emp  duration-200 rounded-md focus:ring-1 border-2 outline-none border-transparent focus:ring-pink-400 focus:border-pink-400 `}
                          value={item?.price_per_km}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            let arr = JSON.parse(JSON.stringify(config));
                            arr[index].price_per_km =
                              value !== "" ? parseInt(value) : null;
                            setConfig([...arr]);
                          }}
                          type={"text"}
                        />
                      </div>
                    </div>

                    {error?.[`delivery_config[${index}].lower_range`] ? (
                      <p className="text-red-500">
                        {error?.[`delivery_config[${index}].lower_range`]}
                      </p>
                    ) : error?.[`delivery_config[${index}].upper_range`] ? (
                      <p className="text-red-500">
                        {error?.[`delivery_config[${index}].upper_range`]}
                      </p>
                    ) : error?.[`delivery_config[${index}].base_price`] ? (
                      <p className="text-red-500">
                        {error?.[`delivery_config[${index}].base_price`]}
                      </p>
                    ) : error?.[`delivery_config[${index}].price_per_km`] ? (
                      <p className="text-red-500">
                        {error?.[`delivery_config[${index}].price_per_km`]}
                      </p>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>

            {(JSON.stringify(delivery_config) !== JSON.stringify(config) ||
              name !== editName) && (
              <div className=" text-center mt-4">
                <button
                  className="primary-gradient px-6 py-1 rounded-md font-medium uppercase text-white"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>
      {map &&
        ((zoom > 11 && !is_surge_active) || (is_surge_active && zoom > 13)) && (
          <>
            <OverlayView
              position={path?.length > 0 ? findPolygonCentroid(path) : path[0]}
              mapPaneName={OVERLAY_MOUSE_TARGET}
            >
              <div>
                <div className={`flex flex-col justify-center items-center `}>
                  <div className=" bg-[#F7564C] p-2 py-1 rounded-lg relative flex items-center gap-1  ">
                    <p className="text-white font-medium text-base whitespace-nowrap ">
                      {" "}
                      {name}
                    </p>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencil} color={"#fff"} />
                    </div>
                  </div>
                  <div className=" -mt-[1px] h-0 w-0   border-[10px] border-t-[#F7564C] border-l-transparent border-b-transparent border-r-transparent"></div>
                </div>
                {is_surge_active && (
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-between items-center gap-10  p-2 py-1 rounded-lg relative">
                      <p className="text-lg text-primary font-medium whitespace-nowrap">
                        ₹ {surge?.fee}
                      </p>
                      <div
                        className="primary-gradient w-6 h-6 flex  justify-center items-center rounded-md cursor-pointer"
                        onClick={() => {
                          removeSurge(zone_id);
                        }}
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    {surge?.reason === "rain" ? (
                      <img src={rainsurge} className=" w-32 mb-3 " />
                    ) : (
                      <img src={demandsurge} className=" w-32 mb-3 " />
                    )}
                  </div>
                )}{" "}
              </div>
            </OverlayView>
          </>
        )}

      <Polygon
        paths={path}
        onClick={onClick}
        options={
          is_surge_active && !selected
            ? surgeOption
            : selected
            ? selectedOption
            : notSelectedOption
        }
      />
    </>
  );
};

export default XPolygon;
