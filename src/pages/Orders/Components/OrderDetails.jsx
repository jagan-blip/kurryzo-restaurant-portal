import React from "react";
import Assigned from "../../../assets/vector.svg";
import dot from "../../../assets/dot.svg";

const OrderDetails = () => {
  return (
    <div className="bg-[#F5F9FA] border rounded-3xl ">
      <div className="flex flex-row px-3 justify-between items-center mt-6">
        <div className="flex gap-2 items-center">
          <div className="bg-[#00A859] w-10 h-10 rounded-full flex justify-center items-center md:ml-0 ">
            <img src={Assigned} alt="" />
          </div>
          <div className="text-gray-500 font-medium ">
            <p className="text-sm">Order ID</p>
            <p className=" text-black">#4589039</p>
          </div>
        </div>

        <div className="mt-2 md:mt-0">
          <div className=" text-gray-500 font-medium">
            <p className="text-sm">Price</p>
            <p className="text-sm text-black">₹257.00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between px-3 mt-5 mb-8">
        <div>
          <p className="font-medium text-gray-500 tracking-wider text-sm">
            21 Aug 2023
          </p>
          <p className="tracking-wider text-sm text-gray-500 mt-1">9:43 AM</p>
        </div>
        <div>
          <p className="bg-[#d4fae8] px-4  py-1  border border-dashed border-gray-400 rounded-lg text-sm  font-medium">
            Assigned
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 px-4">
        <div className=" md:mt-1">
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
          <p className="font-medium ">SS Hyderabad</p>
          <p className="text-gray-500 text-sm">Anna Nagar</p>
        </div>
        <div>
          <p className="bg-[#d3bed1] text-[#6E2F69] px-3 md:px-7 py-1  border border-dashed border-gray-400 rounded-3xl text-base  cursor-pointer font-medium">
            Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
