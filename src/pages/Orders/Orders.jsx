import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import FilterDropDown from "../Drivers/Components/FilterDropDown";
import OrderDetails from "./Components/OrderDetails";
import Delivered from '../../assets/Delivered.svg';
import getApiClient from "../../axios/axios";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);

  const driverPortal = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post('/v1/order/portal/all');
      console.log(response);
      setResponseData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    driverPortal();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const formatETA = (etaInSeconds) => {
    const minutes = Math.floor(etaInSeconds / 60);
    return `${minutes} MINS`;
  };

  return (
    <MainLayout>
      <div className="min-h-[100vh] pb-10">
        <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 ">
          <div className="relative flex sm:flex-col flex-col justify-between md:flex-row gap-3">
            <input
              type="text"
              className="block pl-10 w-[100%] lg:w-[85%] py-2 bg-white border rounded-full focus:ring-4 focus:ring-purple-600 focus:outline-none focus:ring-opacity-20 shadow-lg"
              placeholder="Search by Order ID, Name"
            />
            <img src={search} className="absolute mt-2 mx-2" />
            <div className=" text-right mr-2">
              <FilterDropDown />
            </div>
          </div>
          <div className="mt-6 md:mt-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {responseData?.orders?.map((item, index) => (
              <OrderDetails
                key={index}
                imageSrc={Delivered}
                orderID={item?.order_id}
                price={`₹${item?.order_price}`}
                date={formatTimestamp(item?.created_at)}
                time={formatTime(item?.created_at)}
                driverStatus={item?.driver_status}
                restaurantName={item?.branch?.name}
                restaurantLocation={item?.zone?.name}
                etaTime={formatETA(item?.eta_in_seconds)}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
