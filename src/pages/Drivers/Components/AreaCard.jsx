import React, { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import cancel from '../../../assets/cancel.svg'
import MapInsideModal from "./MapInsideModal";

const AreaCard = ({ title, total, online, offline }) => {
  const onlineWidth = (online / total) * 100
  const offlineWidth = (offline / total) * 100
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  
  return (
    <div className="bg-[#F5F9FA] border border-dashed border-gray-500 md:rounded-2xl rounded-3xl">
      <p className="text-center  mt-2 md:text-2xl font-semibold  tracking-widest">
        {title}
      </p>
      <div className="mt-3 flex px-3">
        <div className="bg-[#d8f8e7] flex justify-between py-2 px-2 items-center  w-[100%] rounded-lg font-semibold  ">
          <p className="text-lg">TOTAL</p>
          <p className="w-20 md:w-20 py-1 md:py-2 text-center text-lg rounded-md font-medium bg-[#00A859] text-white ">
            {total}
          </p>
        </div>
      </div>
      <div className="flex px-3 mt-6 gap-1 md:gap-4  ">
        <div className="w-[90%] bg-[#ccddff] rounded md:rounded-md">
          <div
            className="h-[100%] flex items-center rounded bg-gradient-to-rfrom-[#256DFA] to-[#98BBF9] md:rounded-md "
            style={{ width: `${onlineWidth}%` }}
          >
            <p className=" text-white font-medium px-3 md:py-1 text-xs md:text-base">
              ONLINE
            </p>
          </div>
        </div>
        <p className="font-bold text-sm md:text-2xl w-[10%]">{online}</p>
      </div>

      <div className="flex px-3 mt-6 gap-1 md:gap-4 ">
        <div className=" w-[90%]  bg-[#F3E2EA] rounded md:rounded-md">
          <div
            className="h-[100%] flex items-center bg-gradient-to-r from-[#FA255E] to-[#D89FBE] rounded md:rounded-md "
            style={{ width: `${offlineWidth}%` }}
          >
            <p className=" text-white font-medium px-3 md:py-1 text-xs md:text-base">
              OFFLINE
            </p>
          </div>
        </div>
        <p className="font-bold text-sm md:text-2xl w-[10%]">{offline}</p>
      </div>

      <div className="text-center text-lg md:text-right px-3 mt-3 mb-3">
        <p className="text-[#FF6B00] cursor-pointer font-medium" onClick={() =>
          {setIsModalOpen(true)}}>
          View Details
        </p>
      </div>
          <Modal 
          show={isModalOpen}
          setShow={setIsModalOpen}
          disableBackClick={false}
          onBackClick={() => setIsModalOpen(false)}
          >
            <div className="bg-white h-[25vw] w-[40vw] rounded-3xl relative">
                {/* <img src={cancel} alt="" className="w-8" onClick={()=>{setIsModalOpen(false)}}/> */}
                <MapInsideModal isOpen={isMapModalOpen} onClose={closeMapModal} />
            </div>
            
          </Modal> 
    </div>
  );
};

export default AreaCard;
