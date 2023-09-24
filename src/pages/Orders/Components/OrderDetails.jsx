import React, { useEffect } from "react";
import { useState } from "react";
import dot from "../../../assets/dot.svg";
import Assigned from "../../../assets/assigned.svg";
import ReachedPickup from "../../../assets/reached_pickup.svg";
import InDelivery from "../../../assets/in_delivery.svg";
import Delivered from "../../../assets/delivered.svg";
import Unassigned from "../../../assets/unassigned.svg";
import cancel from "../../../assets/cancel.svg";
import Modal from "../../../components/Modal/Modal";
import Profile from "../../../assets/driver_DP.svg";
import star from "../../../assets/star.svg";
import order_cancelled from "../../../assets/order_cancelled.svg";
import getApiClient from "../../../axios/axios";
import moment from "moment";
import Stepper from "./Stepper";
import SnackBar from "../../../components/SnackBar/SnackBar";
import { useSnackbar } from "../../../components/SnackBar/useSnackBar";
import PageLoading from "../../../components/PageLoading/PageLoading";
const OrderDetails = ({ data, refetch }) => {
import Profile from '../../../assets/driver_DP.svg'
import star from '../../../assets/star.svg'
import { Stepper } from 'react-form-stepper';

const OrderDetails = (props) => {
  const {etaTime, imageSrc, orderID, price, date, time, driverStatus, restaurantName, restaurantLocation} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const driversList = [{ name: "Test Driver 1", rating: 4.2 }];
  const [drivers, setDrivers] = useState([]);
  const { isActive, message, openSnackBar, type } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const CancelOrder = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/order/cancel", {
        order_id: data?._id,
      });
      if (response?.data?.success === true) {
        await refetch();
        openSnackBar("order cancelled", "success");
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
  const getOrdersForAssignment = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/order/assign/drivers", {
        order_id: data?._id,
      });
      if (response?.data?.success === true) {
        setDrivers(response?.data?.data?.drivers);
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
  const AssignOrder = async (driver_id) => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/order/assign", {
        order_id: data?._id,
        driver_id: driver_id,
      });
      if (response?.data?.success === true) {
        openSnackBar("driver alerted", "success");
        setIsDriverModalOpen(false);
        await refetch();
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
  return (
    <>
      {loading && <PageLoading />}
      <SnackBar isActive={isActive} message={message} type={type} />
      <div className={`bg-[#F5F9FA]  rounded-3xl`}>
        <div className="flex flex-row px-3 justify-between items-center mt-6">
          <div className="flex gap-2 items-center">
            <div
              className={`w-10 h-10 rounded-full flex justify-center items-center md:ml-0`}
            >
              <img
                src={
                  data?.is_order_cancelled
                    ? order_cancelled
                    : data?.driver_status === "assigned"
                    ? Assigned
                    : data?.driver_status === "arrived_in_restaurant"
                    ? ReachedPickup
                    : data?.driver_status === "delivery_started"
                    ? InDelivery
                    : data?.driver_status === "arrived_user_location"
                    ? InDelivery
                    : data?.driver_status === "completed"
                    ? Delivered
                    : data?.driver_status === "unassigned"
                    ? Unassigned
                    : null
                }
                alt=""
              />
            </div>

            <div className="text-gray-500 font-medium">
              <p className="text-sm">Order ID</p>
              <p className="text-black">{data?.order_id}</p>
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <div className="text-gray-500 font-medium">
              <p className="text-sm">Price</p>
              <p className="text-sm text-black">
                ₹ {parseInt(data?.order_price)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between px-3 mt-5 mb-8">
          <div>
            <p className="font-medium text-gray-500 tracking-wider text-sm">
              {moment(new Date(data?.created_at)).format("DD MMM YYYY")}
            </p>
            <p className="tracking-wider text-sm text-gray-500 mt-1">
              {" "}
              {moment(new Date(data?.created_at)).format("hh:mm A")}
            </p>
          </div>
          <div>
            <p
              className={`px-8 py-2 border capitalize border-dashed border-gray-400 rounded-lg font-medium`}
              style={{
                backgroundColor: data?.is_order_cancelled
                  ? "#F7C4C4"
                  : data?.driver_status === "unassigned"
                  ? "#C9EADE"
                  : data?.driver_status === "assigned"
                  ? "#C9DEF2"
                  : data?.driver_status === "arrived_in_restaurant"
                  ? "#F4E9CF"
                  : data?.driver_status === "delivery_started"
                  ? "#F4DFCF"
                  : data?.driver_status === "arrived_user_location"
                  ? "#F4DFCF"
                  : data?.driver_status === "completed"
                  ? "#D1EDEC"
                  : "",
              }}
            >
              {data?.is_order_cancelled
                ? "cancelled"
                : data?.driver_status === "unassigned"
                ? "unassigned"
                : data?.driver_status === "assigned"
                ? "assigned"
                : data?.driver_status === "arrived_in_restaurant"
                ? "reached pickup"
                : data?.driver_status === "delivery_started"
                ? "in delivery"
                : data?.driver_status === "arrived_user_location"
                ? "in delivery"
                : data?.driver_status === "completed"
                ? "Delivered"
                : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1.5 px-4">
          <div className="md:mt-1">
            <img src={dot} alt="" />
          </div>
          <div className="border border-dashed mt-1 w-[25%] bg-black"></div>
          <div className="md:mt-1">
            <img src={dot} alt="" />
          </div>
          <div className="border border-dashed mt-1 w-[25%] bg-black"></div>
          <div className="md:mt-1">
            <img src={dot} alt="" />
          </div>
          <div className="border border-dashed mt-1 w-[25%] bg-black"></div>
          <div className="md:mt-1">
            <img src={dot} alt="" />
          </div>
        </div>
        <div className="flex mt-2 flex-row gap-3 justify-between items-center p-3">
          <div>
            <p className="font-medium">{data?.branch?.name}</p>
            <p className="text-gray-500 text-sm">{data?.branch?.zone?.name}</p>
          </div>
          <div>
            <p
              className="bg-[#d3bed1] text-[#6E2F69] px-3 md:px-7 py-1  border border-dashed border-gray-400 rounded-3xl text-base  cursor-pointer font-medium"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Details
            </p>
          </div>
          <Modal
            show={isModalOpen}
            setShow={setIsModalOpen}
            disableBackClick={false}
            onBackClick={() => setIsModalOpen(false)}
          >
            <div className="bg-white w-[95vw]  md:w-[60vw]   max-h-[80vh] lg:w-[45vw]  xl:w-[40vw]  2xl:w-[35vw]  rounded-3xl">
              <div className="flex justify-between  px-5 py-2 md:p-4 bg-[#E8ECEE] rounded-t-3xl">
                <p className=" md:text-2xl md:px-3 font-medium">
                  Order Details
                </p>
                <img
                  src={cancel}
                  alt=""
                  className="w-5 md:w-8 cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                />
              </div>
              <div className="overflow-x-auto  max-h-[80vh] w-[100%] pb-5 rounded-b-3xl ">
                <div className="mt-5 px-7">
                  <div className="flex justify-between">
                    <p className="text-[#3582CD] font-extrabold uppercase tracking-widest">
                      ETA:{" "}
                      {data?.promised_delivery_eta
                        ? `${parseInt(data?.promised_delivery_eta)} mins`
                        : "NA"}
                    </p>
                    <div className="md:flex flex-col items-end mt-2">
                      <div className="mb-2  text-sm ">
                        <p>
                          {" "}
                          {moment(new Date(data?.created_at)).format(
                            "DD MMM YYYY"
                          )}
                        </p>
                      </div>
                      <p className=" text-[#8E9091] text-sm ">
                        {moment(new Date(data?.created_at)).format("hh:mm A")}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8f8f8]  py-2 md:py-3 mt-2 md:mt-4 rounded-xl flex  justify-center md:justify-between md:px-3 gap-4  md:gap-5">
                    <div className="flex flex-col items-center mt-1">
                      <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center md:ml-0`}
                      >
                        <img
                          src={
                            data?.is_order_cancelled
                              ? order_cancelled
                              : data?.driver_status === "assigned"
                              ? Assigned
                              : data?.driver_status === "arrived_in_restaurant"
                              ? ReachedPickup
                              : data?.driver_status === "delivery_started"
                              ? InDelivery
                              : data?.driver_status === "arrived_user_location"
                              ? InDelivery
                              : data?.driver_status === "completed"
                              ? Delivered
                              : data?.driver_status === "unassigned"
                              ? Unassigned
                              : null
                          }
                          alt=""
                        />
                      </div>
                      <p className="font-semibold text-sm md:text-base mt-1 ">
                        ₹ {parseInt(data?.order_price)}
                      </p>
                    </div>

                    <div className="flex flex-col items-center mt-2">
                      <div className=" mb-5 md:mb-4  font-semibold">
                        <p className="text-sm md:text-base ">Order ID</p>
                      </div>
                      <p className="font-semibold text-[#8E9091] text-sm md:text-base">
                        {data?.order_id}
                      </p>
                    </div>

                    <div className="flex flex-col items-center mt-2">
                      <div className="mb-5 md:mb-4 font-semibold">
                        <p className="text-sm md:text-base whitespace-nowrap">
                          {data?.branch?.name}
                        </p>
                      </div>
                      <p className=" text-[#8E9091] text-sm md:text-base">
                        {data?.zone?.name}
                      </p>
                    </div>

                    {/*   <div className="md:flex flex-col items-center mt-2 hidden">
                    <div className="mb-4 ml-2  ">
                      <p>
                        {" "}
                        {moment(
                          new Date(data?.created_at)?.toLocaleString()
                        ).format("D MMM YYYY")}
                      </p>
                    </div>
                    <p className=" text-[#8E9091] ">
                      {moment(
                        new Date(data?.created_at)?.toLocaleString()
                      ).format("hh:mm A")}
                    </p>
                  </div> */}
                  </div>

                  <div className="">
                    <Stepper
                      step={
                        data?.is_order_cancelled
                          ? 0
                          : data?.driver_status === "unassigned"
                          ? 0
                          : data?.driver_status === "assigned"
                          ? 1
                          : data?.driver_status === "arrived_in_restaurant"
                          ? 2
                          : data?.driver_status === "delivery_started"
                          ? 3
                          : data?.driver_status === "arrived_user_location"
                          ? 3
                          : data?.driver_status === "completed"
                          ? 4
                          : 0
                      }
                    />
                  </div>

                  <div className="flex items-center justify-center md:justify-end gap-8 mt-1 md:mt-10 ">
                    {data?.driver_status !== "completed" &&
                      !data?.is_order_cancelled && (
                        <p
                          className="bg-[#F9DBDE] text-[#EC3E3E] px-2 md:px-4 py-2 rounded-md text-sm md:text-lg font-semibold cursor-pointer"
                          onClick={() => {
                            CancelOrder();
                          }}
                        >
                          Cancel Order
                        </p>
                      )}
                    {data?.driver_status === "unassigned" &&
                      !data?.is_order_cancelled && (
                        <p
                          className="bg-[#D1EDE3] text-[#00A859] px-2 md:px-4 py-2 rounded-md text-sm md:text-lg font-semibold cursor-pointer"
                          onClick={async () => {
                            setIsDriverModalOpen(true);
                            setIsModalOpen(false);
                            await getOrdersForAssignment();
                          }}
                        >
                          Assign Driver
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            show={isDriverModalOpen}
            setShow={setIsDriverModalOpen}
            disableBackClick={false}
            onBackClick={() => setIsDriverModalOpen(false)}
          >
            <div className="bg-white w-[95vw] h-[80vw] md:h-[45vw] md:w-[60vw] lg:w-[50vw] lg:h-[35vw] xl:w-[40vw] xl:h-[27vw] 2xl:w-[35vw] 2xl:h-[23vw] rounded-3xl">
              <div className="flex justify-between p-4 bg-[#E8ECEE] rounded-t-3xl">
                <p className="text-2xl px-3 font-medium">Assign Drivers</p>
                <img
                  src={cancel}
                  alt=""
                  className="w-8"
                  onClick={() => {
                    setIsDriverModalOpen(false);
                  }}
                />
              </div>

              <div className="overflow-x-hidden max-h-[60vw] md:max-h-[33vw] lg:max-h-[26vw] xl:max-h-[20vw] 2xl:max-h-[18vw] md:mt-2">
                {drivers?.length > 0 ? (
                  drivers.map((driver, index) => (
                    <div
                      key={index}
                      className="bg-[#F2F7F9] flex justify-between items-center mt-2 md:mt-2 px-2 md:px-8 py-2 mx-3 rounded-lg"
                    >
                      <img
                        src={driver?.driver?.profile_image}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = Profile;
                        }}
                        className="w-10 md:w-16 min-w-[48px] rounded-full"
                      />
                      <p className="py-3 px-4 text-center text-[#666A6D] md:text-xl whitespace-nowrap">
                        {driver?.driver?.name}
                      </p>

                      <p className="py-3 px-4 text-center font-semibold text-[#FFA500] flex items-center md:text-xl gap-1">
                        {driver?.driver?.rating?.length === 0
                          ? "--"
                          : parseFloat(driver?.driver?.avg_rating)?.toFixed(
                              1
                            )}{" "}
                        <span>
                          <img src={star} className="w-4" />
                        </span>
                      </p>
                      <button
                        className="px-4 py-2 md:px-6 md:py-3 text-center font-semibold bg-[#2874F0] text-white rounded-md"
                        onClick={() => {
                          AssignOrder(driver?.driver?._id);
                        }}
                      >
                        Assign
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No drivers available</p>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>{" "}
    </>
  );
};

export default OrderDetails;
