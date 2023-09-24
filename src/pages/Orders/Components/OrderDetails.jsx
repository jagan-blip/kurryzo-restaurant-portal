import React, { useEffect } from "react";
import { useState } from "react";
import dot from "../../../assets/dot.svg";
import Assigned from '../../../assets/vector.svg'
import reached from '../../../assets/reached.svg'
import order from '../../../assets/orderPicked.svg'
import indelivery from '../../../assets/indelivery.svg'
import Delivered from '../../../assets/Delivered.svg'
import cancel from '../../../assets/cancel.svg'
import Modal from "../../../components/Modal/Modal";
import Profile from '../../../assets/driver_DP.svg'
import star from '../../../assets/star.svg'
import { Stepper } from 'react-form-stepper';

const OrderDetails = (props) => {
  const {etaTime, imageSrc, orderID, price, date, time, driverStatus, restaurantName, restaurantLocation} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const driversList = [
    { name: 'Test Driver 1', rating: 4.2 },
    
  ]
 
  
  return (
    <div className={`bg-[#F5F9FA]  rounded-3xl`}>
      <div className="flex flex-row px-3 justify-between items-center mt-6">
        <div className="flex gap-2 items-center">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center md:ml-0`} style={{ 
          backgroundColor: 
          imageSrc === Assigned ? '#00A859' :
          imageSrc === reached ? '#0066CC' :
          imageSrc === order ? '#FFA500' :
          imageSrc === indelivery ? '#FF6B00' : 
          imageSrc === Delivered ? '#32BAA9' :
          ''
        }}>
          <img src={imageSrc} alt="" />
        </div>

          <div className="text-gray-500 font-medium">
            <p className="text-sm">Order ID</p>
            <p className="text-black">{orderID}</p>
          </div>
        </div>

        <div className="mt-2 md:mt-0">
          <div className="text-gray-500 font-medium">
            <p className="text-sm">Price</p>
            <p className="text-sm text-black">{price}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-3 mt-5 mb-8">
        <div>
          <p className="font-medium text-gray-500 tracking-wider text-sm">
            {date}
          </p>
          <p className="tracking-wider text-sm text-gray-500 mt-1">{time}</p>
        </div>
        <div>
          <p
            className={`px-8 py-2 border border-dashed border-gray-400 rounded-lg font-medium`}
            style={{
              backgroundColor:
                driverStatus.includes("unassigned") ? "#C9EADE" :
                driverStatus === "assigned" ? "#C9DEF2" :
                driverStatus === "arrived_in_restaurant" ? "#F4E9CF" :
                driverStatus === "delivery_started" ? "#F4DFCF" :
                driverStatus === "completed" ? "#D1EDEC" :
                ""
            }}
          >
            {driverStatus}
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
          <p className="font-medium">{restaurantName}</p>
          <p className="text-gray-500 text-sm">{restaurantLocation}</p>
        </div>
        <div>
          <p className="bg-[#d3bed1] text-[#6E2F69] px-3 md:px-7 py-1  border border-dashed border-gray-400 rounded-3xl text-base  cursor-pointer font-medium" onClick={() => {setIsModalOpen(true)}}>
            Details
          </p>
        </div>
        <Modal 
         show={isModalOpen}
         setShow={setIsModalOpen}
         disableBackClick={false}
         onBackClick={() => setIsModalOpen(false)}
         >
          <div className="bg-white w-[95vw] h-[80vw] md:h-[45vw] md:w-[60vw] lg:w-[45vw] lg:h-[35vw] xl:w-[40vw] xl:h-[30vw] 2xl:w-[35vw] 2xl:h-[25vw] rounded-3xl">
            <div className="flex justify-between px-5 py-2 md:p-4 bg-[#E8ECEE] rounded-t-3xl"> 
              <p className=' md:text-2xl md:px-3 font-medium'>Order Details</p>
               <img src={cancel} alt="" className="w-5 md:w-8" onClick={()=>{setIsModalOpen(false)}}/>
             </div>
             <div className="mt-5 px-7">
              <p className="text-[#3582CD] font-extrabold tracking-widest">ETA: {etaTime}</p>
              
              <div className="bg-[#f8f8f8] py-2 md:py-3 mt-2 md:mt-4 rounded-xl flex justify-center md:justify-between md:px-3 gap-8 md:gap-5">
                <div className="flex flex-col items-center mt-">
                  <div className="bg-[#FFA500] w-10 h-10 rounded-full flex justify-center items-center font-semibold mb-2 md:mb-3">
                    <img src={order} alt="" />
                  </div>
                  <p className="font-semibold text-sm md:text-base ml-2">{price}</p>
                </div>

                <div className="flex flex-col items-center mt-2">
                  <div className=" mb-5 md:mb-4 ml-2 font-semibold">
                    <p className="text-sm md:text-base ">Order ID</p>
                  </div>
                  <p className="font-semibold text-[#8E9091] text-sm md:text-base">{orderID}</p>
                </div>

                <div className="flex flex-col items-center mt-2">
                  <div className="mb-5 md:mb-4 font-semibold">
                    <p className="text-sm md:text-base whitespace-nowrap">{restaurantName}</p>
                  </div>
                  <p className="font-semibold text-[#8E9091] text-sm md:text-base">{restaurantLocation}</p>
                </div>

                <div className="flex flex-col items-center mt-2">
                  <div className="mb-4 ml-2 font-semibold hidden md:block">
                    <p>{date}</p>
                  </div>
                  <p className="font-semibold text-[#8E9091] hidden md:block">{time}</p>
                </div>
              </div>

              <div className="px-10 mt-4">
              <Stepper
                steps={[
                  { label: 'Assigned' },
                  { label: 'Reached' },
                  { label: 'In-Delivery' },
                  { label: 'Delivered' }
                ]}
                activeStep={2}
                
              />
              
              </div>
              
              
                <div className="flex items-center justify-center md:justify-end gap-8 mt-1 md:mt-10 px-5 ">
                  <p className="bg-[#F9DBDE] text-[#EC3E3E] px-2 md:px-4 py-2 rounded-md text-sm md:text-lg font-semibold cursor-pointer">Cancel Order</p>
                  <p className="bg-[#D1EDE3] text-[#00A859] px-2 md:px-4 py-2 rounded-md text-sm md:text-lg font-semibold cursor-pointer" 
                  onClick={() => {
                    setIsDriverModalOpen(true);
                    setIsModalOpen(false);
                    }}>Assign Driver</p>
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
            <p className='text-2xl px-3 font-medium'>Assign Drivers</p>
            <img src={cancel} alt="" className="w-8" onClick={()=>{setIsDriverModalOpen(false)}}/>
        </div>

       
          <div className="overflow-x-hidden max-h-[60vw] md:max-h-[33vw] lg:max-h-[26vw] xl:max-h-[20vw] 2xl:max-h-[18vw] md:mt-2"> 
            {driversList.map((driver, index) => (
              <div key={index} className="bg-[#F2F7F9] flex justify-between items-center mt-2 md:mt-2 px-2 md:px-8 py-2 mx-3 rounded-lg">
                <img src={Profile} className="w-10 md:w-16 min-w-[48px] rounded-full" />
                <p className="py-3 px-4 text-center text-[#666A6D] md:text-xl whitespace-nowrap">{driver.name}</p>
                <p className="py-3 px-4 text-center font-semibold text-[#FFA500] flex items-center md:text-xl gap-1">{driver.rating} <span><img src={star} className="w-4" /></span></p>
                <button className="px-4 py-2 md:px-6 md:py-3 text-center font-semibold bg-[#2874F0] text-white rounded-md">Assign</button>
              </div>
            ))}
          </div>


        
      </div>
      </Modal> 
      </div>
    </div>
  );
};

export default OrderDetails;
