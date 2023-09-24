import React from "react";
import "../../../App.css";
const Stepper = ({ step }) => {
  return (
    <>
      {/*   <div className="flex items-center w-full mb-2 ">
        <p className="font-semibold w-[25%] bg-red-400">Assigned</p>
        <p className="font-semibold w-[25%]">Reached Pickup</p>
        <p className="font-semibold w-[25%]">In Delivery</p>
        <p className="font-semibold w-[25%]">Delivered</p>
      </div> */}
      <div className="flex items-center w-full md:px-4  mt-14">
        <div
          className={`w-6 h-6 flex justify-center items-center  rounded-full ${
            step >= 1 ? "stepper-gradient" : "stepper-bg"
          } z-10`}
        >
          <p className="font-semibold -translate-y-8 absolute text-xs md:text-base">
            Assigned
          </p>
          {step >= 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="z-10"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                fill="#fff"
              />
            </svg>
          )}
        </div>
        <div
          className={`w-[30%] h-3 -ml-1 ${
            step >= 2 ? "stepper-gradient" : "stepper-bg"
          } `}
        ></div>
        <div
          className={`w-6 h-6 flex justify-center items-center -ml-1  rounded-full ${
            step >= 2 ? "stepper-gradient" : "stepper-bg"
          } z-10`}
        >
          <p className="font-semibold -translate-y-8 absolute text-xs md:text-base">
            Reached Pickup
          </p>
          {step >= 2 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                fill="#fff"
              />
            </svg>
          )}
        </div>
        <div
          className={`w-[30%] h-3 -ml-1 ${
            step >= 3 ? "stepper-gradient" : "stepper-bg"
          } `}
        ></div>
        <div
          className={`w-6 h-6 flex justify-center items-center -ml-1 rounded-full ${
            step >= 3 ? "stepper-gradient" : "stepper-bg"
          } z-10`}
        >
          <p className="font-semibold -translate-y-8 absolute text-xs md:text-base">
            In Delivery
          </p>
          {step >= 3 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                fill="#fff"
              />
            </svg>
          )}
        </div>
        <div
          className={`w-[30%] h-3 -ml-1 ${
            step >= 4 ? "stepper-gradient" : "stepper-bg"
          } `}
        ></div>
        <div
          className={`w-6 h-6 flex justify-center items-center -ml-1 rounded-full ${
            step >= 4 ? "stepper-gradient" : "stepper-bg"
          } z-10`}
        >
          <p className="font-semibold -translate-y-8 absolute text-xs md:text-base">
            Delivered
          </p>
          {step >= 4 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                fill="#fff"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Stepper;
