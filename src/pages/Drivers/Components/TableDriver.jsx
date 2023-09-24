import React, { useEffect, useState } from 'react';
import Profile from '../../../assets/driver_DP.svg';
import getApiClient from '../../../axios/axios';
import rightPage from '../../../assets/rightPage.svg';
import leftPage from '../../../assets/leftPage.svg';
import Drawer from '../../../components/Drawer/Drawer';
import cancel from '../../../assets/cancel.svg'
import group from '../../../assets/Group.svg'
import map from '../../../assets/map.svg'
import phone from '../../../assets/phone.svg'
import DropDown from '../../../components/DropDown/DropDown';
import Modal from '../../../components/Modal/Modal';
import maskMan from "../../../assets/maskman.svg"
import star from '../../../assets/star.svg'


const TableDriver = () => {
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const options = ['Anna nagar', 'Avadi', 'Ambattur'];
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const fetchData = async () => {
    try {
      const axios = await getApiClient();
      const response = await axios.post('/v1/driver/portal/all', {
        page: currentPage,
        size: pageSize,
      });
      console.log(response);

      if (response.data.success) {
        setDriverData(response.data.data.drivers);
        setTotalPages(response.data.data.totalpages);
        setLoading(false);
      } else {
        console.error('API Error:', response.data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('API Error:', err);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

  const [isOrderBased, setIsOrderBased] = useState(true);

  const handleClick = () => {
    setIsOrderBased((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto mt-10">
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#F2F7F9] text-lg md:text-2xl">
            <tbody>
              {driverData.map((driver) => (
                <tr
                  key={driver._id}
                  className="border-b border-gray-400 border-dashed whitespace-nowrap"
                >
                  <td className="py-3 px-4 text-center">
                  <img
                    src={driver.profile_image || maskMan}
                    alt={driver.name}
                    className="w-5 md:w-14 min-w-[56px] rounded-full mx-auto"
                    onError={(e) => {
                      e.target.src = maskMan;
                    }}
                  />
                  </td>
                  <td className="py-3 px-4 text-center font-bold">{driver._id}</td>
                  <td className="py-3 px-4 text-center text-[#666A6D]">
                    {driver.name}
                  </td>
                  <td className="py-3 px-4 text-center text-[#666A6D]">
                    +91-{driver.mobile}
                  </td>
                  <td className= "text-center font-normal">
                    <p
                      className={`py-2 rounded-xl ${
                        driver.driver_status === 'open_for_delivery'
                          ? 'bg-[#ccf5e7] text-[#00A859]'
                          : 'bg-[#F3E2EA] text-[#FA255E]'
                      } `}
                    >
                      {driver.driver_status === 'open_for_delivery' ? 'ONLINE' : 'OFFLINE'}
                    </p>
                  </td>
                  <td className="py-3 px-4 flec text-center font-semibold text-[#FFA500] ">
                    {driver.avg_rating}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FA255E] to-[#6E2F69] text-white" onClick={() => {
                      setIsDrawerOpen(true)
                    }}>
                      View
                    </button>

                    <Drawer
                      show={isDrawerOpen}
                      setShow={setIsDrawerOpen}
                      disableBackClick={false} 
                      onBackClick={() => setIsDrawerOpen(false)} 
                    >
                      <div className="bg-white h-screen w-screen md:h-[150vw] md:w-[63vw] lg:w-[50vw] xl:w-[40vw] 2xl:w-[30vw] overflow-auto">
                        <div className="flex justify-between px-5 h-16 items-center bg-[#E8ECEE]">
                          <h2 className="font-semibold text-2xl ">Driver Details</h2>
                          <img src={cancel} alt="" className="w-8" onClick={()=>{setIsDrawerOpen(false)}}/>
                        </div>
                        <div className="flex flex-row px-5 justify-between items-center mt-5">
                          <div className="flex gap-2 items-center">
                            <div className="flex items-center md:ml-0 md:min-w-[56px] w-16 ">
                              <img src={Profile} alt="" />
                            </div>
                            <div className="">
                              <p className="text-xl md:text-2xl font-semibold">{13515658}</p>
                              <p className="text-[#666A6D] text-lg font-medium">Test Driver 7</p>
                              <p
                                className="flex items-center gap-2 text-[#FA255E] cursor-pointer"
                                onClick={handleClick}
                              >
                                {isOrderBased ? "Order Based" : "Salary Based"}{" "}
                                <span className="">
                                  <img
                                    src={group}
                                    alt=""
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                  />
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 md:mt-0">
                            <div className=" text-gray-500 font-medium">
                              <button className='bg-[#ccf5e7] text-[#00A859] px-10 py-3 mt-4 rounded-md text-xl'>ONLINE</button>
                            </div>
                          </div>
                        </div>

                        <div className="flex px-5 justify-between items-center mt-5">
                          <div className="flex gap-2 md:gap-4 items-center">
                            <div className="flex items-center md:ml-0 md:min-w-[26px] w-7 ">
                              <img src={phone} alt="" />
                            </div>
                            <div className="">
                              <p className="text-base md:text-xl font-semibold whitespace-nowrap">+91-{7358191612}</p>
                              
                            </div>
                          </div>

                          <div className="flex border py-2 md:py-6 rounded-lg px-1">
                            <div className="font-medium border-r border-dashed border-black ">
                              <p className='text-gray-500 md:mx-10 '>Wallet</p>
                              <p className='md:mx-10 font-semibold mr-2'>₹{45478.00}</p>
                            </div>
                            <div className='font-medium border-l border-dashed'>
                              <p className='text-gray-500 whitespace-nowrap ml-2'>Floating Cash</p>
                              <p className='font-semibold ml-2'>₹{95478.00}</p>
                            </div>
                           <div>

                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row px-5 justify-between items-center mt-4 ">
                          <div className="flex items-center">
                            <div className="flex items-center min-w-[56px] ">
                              <img src={map} className='w-8' alt="" />
                            </div>

                              <div>
                                <DropDown
                                  options={options}
                                  selected={selectedOption}
                                  onSelect={handleOptionSelect}
                                  style={{  }} // Example style
                                  dropdown_style={{  }} // Example dropdown_style
                                />
                              </div>
                            </div>
                          

                          <div className="mt-2 md:mt-0">
                            <div className="font-normal">
                              <button className='bg-[#0066CC] px-3 md:px-4 md:py-1 rounded-full md:text-xl text-white'>PAYOUT</button>
                            </div>
                          </div>
                        </div>

                        <div className='border border-dashed border-gray-400 mx-7 mt-4'></div>

                        {/* <div className='mt-5 px-6'>
                          <h1 className='text-2xl text-[#666A6D]'>Bank account details</h1>
                          <div className='mt-5'>
                            <p className='font-semibold'>NAME</p>
                            <div className='flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2'>
                              <p>Test Driver 7</p>
                            </div>
                            <p className='font-semibold mt-3'>ACCOUNT NUMBER</p>
                              <div className='flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2'>
                                <p>216354196165165</p>
                              </div>
                            <p className='font-semibold mt-2'>IFSC CODE</p>
                              <div className='flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2'>
                                <p>IN0000899783D</p>
                              </div>
                          </div>
                       </div> */}

                      {/* <div className='border border-dashed border-gray-400 mx-7 mt-6'></div>    */}

                      <div className='mt-5 px-6'>
                        <p className='font-semibold'>AADAR</p>
                        <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                          <p className='text-[#2492ff]'>3434 3434 4343 3434</p>
                          <p className='text-[#2492ff] cursor-pointer' onClick={() => {setIsModalOpen(true)}}>VIEW</p>
                        </div>
                        <Modal 
                          show={isModalOpen}
                          setShow={setIsModalOpen}
                          disableBackClick={false}
                          onBackClick={() => setIsModalOpen(false)}
                          >
                            <div className="bg-white w-[100vw] h-screen md:h-[45vw] md:w-[55vw] lg:w-[40vw] lg:h-[30vw] xl:w-[30vw] xl:h-[30vw] 2xl:w-[30vw] 2xl:h-[25vw] rounded-3xl">
                              <div className="flex justify-between p-4 bg-[#E8ECEE] rounded-t-3xl">
                                <p className='text-2xl px-3 font-medium'>AADAR</p>
                                <img src={cancel} alt="" className="w-8" onClick={()=>{setIsModalOpen(false)}}/>
                              </div>
                              <div className='flex justify-between items-center p-5 '>
                                <p className='text-[#2492ff] px-20 py-3 rounded-md font-medium border border-dashed border-[#2492ff]
                                whitespace-nowrap'>6256 6549 4593 4651</p>
                                <p className='px-2 cursor-pointer'>Edit</p>
                              </div>
                            </div>
                          </Modal>
                      </div> 

                      <div className='mt-5 px-6'>
                        <p className='font-semibold'>License</p>
                        <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                          <p className='text-[#2492ff]'>TN12A893423</p>
                          <p className='text-[#2492ff] cursor-pointer'>VIEW</p>
                        </div>
                        
                      </div> 

                      <div className='mt-5 px-6'>
                        <p className='font-semibold'>PAN</p>
                        <div className='bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]'>
                          <p className='text-[#2492ff]'>9878 8452 2155 8956</p>
                          <p className='text-[#2492ff] cursor-pointer'>VIEW</p>
                        </div>
                      </div> 

                      <div className="mt-2 md:mt-0 flex justify-center mb-10">
                          <div className="font-normal">
                            <button className='bg-[#0066CC] px-4 py-1 mt-4 rounded-full text-xl text-white'>SAVE</button>
                          </div>
                        </div>

                      </div>
                    </Drawer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-10 ">
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md cursor-pointer ${
            currentPage === 1 ? '' : 'bg-gray-200 hover:bg-gray-300'
          } text-gray-600`}
        >
          <img src={leftPage} alt="" />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded-md cursor-pointer ${
            currentPage === totalPages
              ? '' : 'bg-gray-200 hover:bg-gray-300'
          } text-gray-600`}
        >
          <img src={rightPage} alt="" />
        </button>
      </div>
    </div>
  );
};

export default TableDriver;
