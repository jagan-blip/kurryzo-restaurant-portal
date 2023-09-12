import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg"
import add from "../../assets/basil_add-solid.svg"
import { useState } from "react";
import AreaCard from "./Components/AreaCard";
import FilterDropDown from "./Components/FilterDropDown";


const Drivers = () => {
  const [enabled, setEnabled] = useState(false);
  const cardData = [
    {
      title: "Anna Nagar",
      total: 20,
      online: 12,
      offline: 8,
    },
    {
      title: "T-Nagar",
      total: 99,
      online: 50,
      offline: 50,
    },
    {
      title: "Thirumullaivoyal",
      total: 14,
      online: 12,
      offline: 8,
    },
    {
      title: "Avadi",
      total: 20,
      online: 12,
      offline: 8,
    },
    {
      title: "omr",
      total: 20,
      online: 12,
      offline: 8,
    },
    {
      title: "shenoy nagar",
      total: 20,
      online: 12,
      offline: 8,
    }]

  return (
    <MainLayout>
      <div className="min-h-[100vh]">
        <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 md:px-14">
          <div className="relative flex sm:flex-col flex-col gap-10 justify-between md:flex-row gap-y-4">
            <input
              type="text"
              className="block pl-10 w-[100%] lg:w-[80%] pr-4 py-2 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-100 focus:outline-none focus:ring focus:ring-opacity-20 shadow-lg"
              placeholder="Search by Order ID, Name"/>
              <img src={search} className="absolute mt-2 mx-2" alt="" />
              <div className= "flex justify-between gap-4 lg:mr-5">
                <div className="flex items-center gap-5 md:gap-20 lg:gap-24">
                  <p className="text-sm md:text-lg whitespace-nowrap cursor-pointer hover:text-[#FB3B6E] duration-300 ml-2">View as table</p>
                  <label className="flex items-center cursor-pointer  ">
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
                <FilterDropDown  />
              </div>
            </div>
          </div>
          
          <div className="md:flex justify-between mt-7 hidden">
            <div className="md:flex gap-2 bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] w-[260px] h-[44px] rounded-md text-white text-lg whitespace-nowrap px-5  ">
              <button className="flex items-center px-2 gap-1"><span><img src={add}alt="" /></span>CREATE NEW DRIVER</button>
            </div>
            <FilterDropDown />
          </div>
          
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-14 pb-10 relative">
            {cardData.map((data,index) => (
              <AreaCard
                key={index}
                title={data.title}
                total={data.total}
                online={data.online}
                offline={data.offline}
              />
            ))}
           <button className="bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] px-2 py-2 rounded-md md:hidden fixed"
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
  )
};

export default Drivers;