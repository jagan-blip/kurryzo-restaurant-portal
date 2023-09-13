import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import add from "../../assets/basil_add-solid.svg";
import AreaCard from "./Components/AreaCard";
import FilterDropDown from "./Components/FilterDropDown";
import getApiClient from "../../axios/axios";

const Drivers = () => {
  const [responseData, setReponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const axios = await getApiClient();
        const response = await axios.get('/v1/driver/area');
        console.log(response)
        setReponseData(response.data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="min-h-[100vh]">
        <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 md:px-14">
          <div className="relative flex sm:flex-col flex-col gap-10 justify-between md:flex-row gap-y-4">
            <input
              type="text"
              className="block pl-10 w-[100%] lg:w-[80%] pr-4 py-2 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-100 focus:outline-none focus:ring focus:ring-opacity-20 shadow-lg"
              placeholder="Search by Order ID, Name"
            />
            <img src={search} className="absolute mt-2 mx-2" alt="" />
            <div className="flex justify-between gap-4 lg:mr-5">
              <div className="flex items-center gap-5 md:gap-20 lg:gap-24">

                {/* This part is for "View as table" */}
                <p className="text-sm md:text-lg whitespace-nowrap cursor-pointer hover:text-[#FB3B6E] duration-300 ml-2">
                  View as table
                </p>
                {/* Checkbox */}
                <label className="flex items-center cursor-pointer">
                  <div className={`w-12 h-6  ${enabled ? 'bg-[#FED3DF]' : 'bg-[#FED3DF]'} rounded-full`}>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => {
                        setEnabled(!enabled);
                      }}
                      className="hidden"
                    />
                    <div className={`w-4 h-4 mt-1  ${enabled ? 'bg-[#FB3B6E] translate-x-6 ' : 'bg-[#FB3B6E] translate-x-1'} rounded-full shadow transition-transform`}></div>
                  </div>
                </label>
              </div>
              <div className="md:hidden">
                <FilterDropDown />
              </div>
            </div>
          </div>

          <div className="md:flex justify-between mt-7 hidden">
            <div className="md:flex gap-2 bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] w-[260px] h-[44px] rounded-md text-white text-lg whitespace-nowrap px-5">
              <button className="flex items-center px-2 gap-1">
                <span>
                  <img src={add} alt="" />
                </span>
                CREATE NEW DRIVER
              </button>
            </div>
            <FilterDropDown />
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-14 pb-10 relative">
            {responseData.map((item, index) => (
              <AreaCard
                key={item._id[0]._id}
                title={item._id[0].name}
                total={item.total_drivers}
                online={item.active_drivers}
                offline={item.inactive_drivers}
              />
            ))}
            <button
              className="bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] px-2 py-2 rounded-md md:hidden fixed"
              style={{
                bottom: '20vw',
                right: '7vw',
              }}
            >
              <img src={add} className="w-8" alt="" />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Drivers;
