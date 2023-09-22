import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import add from "../../assets/basil_add-solid.svg";
import cancel from "../../assets/cancel.svg";
import maskman from "../../assets/maskman.svg";
import map from "../../assets/map.svg";
import AreaCard from "./Components/AreaCard";
import FilterDropDown from "./Components/FilterDropDown";
import getApiClient from "../../axios/axios";
import TableDriver from "./Components/TableDriver";
import Drawer from "../../components/Drawer/Drawer";
import DropDown from "../../components/DropDown/DropDown";
import Input from "../../components/Input/Input";

const Drivers = () => {
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const options = ['Anna nagar', 'Avadi', 'Ambattur'];
  const [selectedOption, setSelectedOption] = useState(options[2]);
  // const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

 

  const fetchData = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.get('/v1/driver/area');
      console.log(response);
      setResponseData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
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
                  <p className="text-sm md:text-lg whitespace-nowrap cursor-pointer hover:text-[#FB3B6E] duration-300 ml-2">
                    View as table
                  </p>
                  <label className="flex items-center cursor-pointer  ">
                    <div
                      className={`w-12 h-6  ${
                        enabled ? "bg-[#FED3DF]" : "bg-[#FED3DF]"
                      } rounded-full`}
                    >
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => {
                          setEnabled(!enabled);
                        }}
                        className="hidden"
                      />
                      <div
                        className={`w-4 h-4 mt-1  ${
                          enabled
                            ? "bg-[#FB3B6E] translate-x-6 "
                            : "bg-[#FB3B6E] translate-x-1"
                        } rounded-full shadow transition-transform`}
                      ></div>
                    </div>
                  </label>
                </div>
                <div className="md:hidden">
                  <FilterDropDown />
                </div>
              </div>
            </div>

            <div className="md:flex justify-between mt-7 hidden">
              <div className="md:flex gap-2 bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] w-[260px] h-[44px] rounded-md text-white text-lg whitespace-nowrap px-5  ">

                <button className="flex items-center px-2 gap-1" onClick={()=>{setIsDrawerOpen(true)}}>
                  <span>
                    <img src={add} alt="" />
                  </span>
                  CREATE NEW DRIVER
                </button>
              </div>
              <FilterDropDown />
            </div>

          {enabled ? (
            <div>
              <TableDriver />
              <button
                className="bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] px-2 py-2 rounded-md md:hidden fixed"
                style={{
                  bottom: "20vw",
                  right: "7vw",
                }}
                onClick={()=>{setIsDrawerOpen(true)}}
              >
                <img src={add} className="w-8" alt="" />
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10 relative">
              {responseData.map((item) => (
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
                  bottom: "20vw",
                  right: "7vw",
                }}
                onClick={()=>{setIsDrawerOpen(true)}}
              >
                <img src={add} className="w-8" alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
          <Drawer
            show={isDrawerOpen}
            setShow={setIsDrawerOpen}
            disableBackClick={false} 
            onBackClick={() => setIsDrawerOpen(false)} 
          >
            <div className="bg-white h-screen w-screen md:h-[150vw] md:w-[65vw] lg:w-[55vw] xl:w-[45vw] 2xl:w-[35vw] overflow-auto">
              <div className="flex justify-between px-5 h-16 items-center bg-[#E8ECEE]">
                <h2 className="font-semibold text-2xl ">Create New Driver</h2>
                <img src={cancel} alt="" className="w-8" onClick={()=>{setIsDrawerOpen(false)}}/>
              </div>

              <div className="flex justify-between p-5">
                <img src={maskman} className="min-w-[26px]" alt="" />
                <div className="flex items-center gap-5">
                  <img src={map} alt="" />
                  <DropDown
                    options={options}
                    selected={selectedOption}
                    onSelect={handleOptionSelect}
                    style={{ }} // Example style
                    dropdown_style={{  }} // Example dropdown_style
                  />
               </div>
              </div>
              
              <div className='px-5'>
                <h1 className='text-2xl text-[#666A6D]'>Personel details</h1>
                <div className='mt-5'>
                  <p className='font-semibold mb-2'>NAME</p>
                  <Input
                  placeholder="Enter driver name" />
                  <p className='font-semibold mt-3 mb-2'>MOBILE NUMBER</p>
                  <Input
                  placeholder="Enter mobile number" />
                  
                </div>
              </div>
              <div className='border border-dashed border-gray-400 mx-7 mt-4'></div>

              <div className='mt-6 px-5'>
                <h1 className='text-2xl text-[#666A6D]'>Personel details</h1>
                <div className='mt-5'>
                  <p className='font-semibold mb-2'>NAME</p>
                  <Input
                  placeholder="Enter account holder name" />
                  <p className='font-semibold mt-3 mb-2'>ACCOUNT NUMBER</p>
                  <Input
                  placeholder="Enter account number" />
                  <p className='font-semibold mt-3 mb-2'>IFSC CODE</p>
                  <Input
                  placeholder="Enter ifsc code" />
                </div>
              </div>
              <div className='border border-dashed border-gray-400 mx-7 mt-4'></div>
              <div className='mt-5 px-6'>
                <p className='font-semibold'>AADAR</p>
                <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                  <p className='text-[#2492ff]'>Add Aadar</p>
                  <p className='text-[#2492ff] cursor-pointer'>Remove</p>
                </div>
              </div>
              <div className='mt-5 px-6'>
                <p className='font-semibold'>LICENSE</p>
                <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                  <p className='text-[#2492ff]'>Add License</p>
                  <p className='text-[#2492ff] cursor-pointer'>Remove</p>
                </div>
              </div>
              <div className='mt-5 px-6'>
                <p className='font-semibold'>PAN</p>
                <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                  <p className='text-[#2492ff]'>Add Pan</p>
                  <p className='text-[#2492ff] cursor-pointer'>Remove</p>
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex justify-center mb-10">
                <div className="font-normal">
                  <button className='bg-[#0066CC] px-4 py-1 mt-4 rounded-full text-xl text-white'>Submit</button>
                </div>
              </div>
            </div>
          </Drawer>
      
    </MainLayout>
  );
};

export default Drivers;
