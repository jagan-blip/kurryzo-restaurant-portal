import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import FilterDropDown from "../Drivers/Components/FilterDropDown";
import OrderDetails from "./Components/OrderDetails";
import Delivered from "../../assets/Delivered.svg";
import getApiClient from "../../axios/axios";
import rightPage from "../../assets/rightPage.svg";
import leftPage from "../../assets/leftPage.svg";
import CircularProgressBar from "../../components/CircularProgressBar/CircularProgressBar";
import { SocketContext } from "../../socket/SocketContext";
const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zones, setAllZones] = useState([]);
  const [zoneId, setZoneId] = useState();
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");
  const socket = useContext(SocketContext);
  const pageSize = 10;
  const driverPortal = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/order/portal/all", {
        page: currentPage,
        size: pageSize,
        zone: zoneId,
      });

      setResponseData(response.data.data);
      setTotalPages(response?.data?.data?.totalpages);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const getAllZones = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.get("/v1/zone");
      if (response?.data?.success === true) {
        let all_zones = response?.data?.data?.zones;

        setAllZones(all_zones);
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
  const getSearch = async () => {
    setSearchLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/order/search", {
        query: query,
        zone: zoneId,
      });
      if (response?.data?.success === true) {
        setResponseData(response?.data?.data);
      } else {
        openSnackBar(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      openSnackBar(
        err.response.data.error.message ?? "something went wrong",
        "error"
      );
    }
    setSearchLoading(false);
  };
  useEffect(() => {
    driverPortal();
  }, [currentPage, zoneId]);
  useEffect(() => {
    if (query !== "") {
      getSearch();
    } else {
      driverPortal();
    }
  }, [query]);
  useEffect(() => {
    getAllZones();
  }, []);
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
  useEffect(() => {
    socket?.on("order_change", async () => {
      await driverPortal();
    });
  }, [socket]);

  return (
    <MainLayout>
      <div className="min-h-[100vh] pb-10 relative">
        {loading && (
          <div className="h-[100vh] flex justify-center items-center fixed w-[90%]">
            <CircularProgressBar />
          </div>
        )}
        <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 ">
          <div className="relative flex sm:flex-col flex-col justify-between md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="block pl-10 w-[100%]  py-2 bg-white border rounded-full focus:ring-4 focus:ring-purple-600 focus:outline-none focus:ring-opacity-20 shadow-lg"
                placeholder="Search by Order Id"
              />
              <img
                src={search}
                className="absolute  mx-2 top-[50%] translate-y-[-50%]"
              />
              {searchLoading && (
                <div className="absolute right-2 top-[50%] translate-y-[-50%] ">
                  <CircularProgressBar
                    klass={"w-7 h-7"}
                    borderKlass={"border-t-secondary "}
                  />
                </div>
              )}
            </div>
            <div className=" text-right mr-2 ">
              <FilterDropDown data={zones} setZoneId={setZoneId} />
            </div>
          </div>
          <div className="mt-6 md:mt-10 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {responseData?.orders?.length > 0 ? (
              responseData?.orders?.map((item, index) => (
                <OrderDetails key={index} data={item} refetch={driverPortal} />
              ))
            ) : (
              <p>No orders found</p>
            )}
          </div>
          {/* Pagination */}
          {responseData?.orders?.length > 0 && query === "" && (
            <div className="flex justify-end mt-10 ">
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded-md cursor-pointer ${
                  currentPage === 1 ? "" : "bg-gray-200 hover:bg-gray-300"
                } text-gray-600`}
              >
                <img src={leftPage} alt="" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded-md cursor-pointer ${
                  currentPage === totalPages
                    ? ""
                    : "bg-gray-200 hover:bg-gray-300"
                } text-gray-600`}
              >
                <img src={rightPage} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Orders;
