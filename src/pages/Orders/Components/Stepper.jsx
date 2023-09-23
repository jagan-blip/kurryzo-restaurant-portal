import React from 'react';
import { Stepper } from 'react-form-stepper';


const Stepper = () => {
  return (
    <ol className="flex items-center w-full">
      {/* Step 1 */}
      <div className="">
        <span className="text-base font-semibold whitespace-nowrap">Assigned</span>
        <li className="flex w-full items-center after:w-[5vw] after:border-[5px]">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-[#EF2560] to-[#9C226D] rounded-full lg:h-12 lg:w-12 shrink-0">
            <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4" aria-hidden="true" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        </li>
      </div>

      {/* Step 2 */}
      <div className="">
        <span className="text-base font-semibold whitespace-nowrap">Reached Pickup</span>
        <li className="flex w-full items-center after:w-[5vw] after:border-[5px] bg-gradient-to-b from-[#EF2560] to-[#9C226D]">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-[#EF2560] to-[#9C226D] rounded-full lg:h-12 lg:w-12 shrink-0">
            <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 " aria-hidden="true" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        </li>
      </div>

      {/* Step 3 */}
      <div className="">
        <span className="text-base font-semibold whitespace-nowrap">In-Delivery</span>
        <li className="flex w-full items-center after:w-[5vw] after:border-[5px]">
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-[#EF2560] to-[#9C226D] rounded-full lg:h-12 lg:w-12 shrink-0">
            <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 " aria-hidden="true" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        </li>
      </div>

      {/* Step 4 */}
      <div className="">
        <span className="text-base font-semibold whitespace-nowrap">Delivered</span>
       
          <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-[#EF2560] to-[#9C226D] rounded-full lg:h-12 lg:w-12 shrink-0">
            <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 " aria-hidden="true" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        
      </div>
    </ol>
  );
};

export default Stepper;
