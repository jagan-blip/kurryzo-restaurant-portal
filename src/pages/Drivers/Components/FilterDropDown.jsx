import React, { useState, useEffect, useRef } from "react";
import filter from "../../../assets/ci_slider-02.svg";

const FilterDropDown = ({ data, setZoneId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState("All");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="text-gray-600 bg-[#F5F9FA] h-8 md:h-[44px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-1  md:px-5 md:py-2.5 text-center inline-flex items-center "
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
      >
        <span>
          <img
            src={filter}
            className=" mr-2 md:mr-5 bg-white px-1 py-1 rounded-md"
            alt=""
          />
        </span>
        <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
          {selected}{" "}
        </p>

        <svg
          className={`w-2 h-2 md:w-3 md:h-3 ml-3 md:ml-12 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="z-10 absolute right-0 mt-2 bg-[#FCFBFF] divide-y rounded-lg shadow w-44 "
          id="dropdown"
        >
          <ul
            className="py-2 text-lg font-medium text-gray-700 d"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <p
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer select-none"
                onClick={() => {
                  setZoneId(null);
                  setSelected("All");
                  toggleDropdown();
                }}
              >
                All
              </p>
              {data?.map((item, index) => {
                return (
                  <p
                    key={index}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer select-none"
                    onClick={() => {
                      setZoneId(item?._id);
                      setSelected(item?.name);
                      toggleDropdown();
                    }}
                  >
                    {item?.name}
                  </p>
                );
              })}
            </li>
            {/* Add more dropdown options as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
