import React, { useEffect, useState } from "react";
import Profile from "../../../assets/driver_DP.svg";
import getApiClient from "../../../axios/axios";
import rightPage from "../../../assets/rightPage.svg";
import leftPage from "../../../assets/leftPage.svg";
import Drawer from "../../../components/Drawer/Drawer";
import cancel from "../../../assets/cancel.svg";
import group from "../../../assets/Group.svg";
import map from "../../../assets/map.svg";
import phone from "../../../assets/phone.svg";
import DropDown from "../../../components/DropDown/DropDown";
import Modal from "../../../components/Modal/Modal";
import maskMan from "../../../assets/maskman.svg";
import star from "../../../assets/star.svg";
import TableRow from "./TableRow";

const TableDriver = ({
  driverData,
  zoneId,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
  pageSize,
  fetchData,
  fetchDataTable,
  query,
  zones,
  openSnackBar,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const options = ["Anna nagar", "Avadi", "Ambattur"];
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    fetchDataTable();
  }, [currentPage, zoneId]);
  const refetch = async () => {
    await fetchData();
    await fetchDataTable();
  };
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

  return (
    <div className="container mx-auto mt-10">
      {!loading && (
        <div className="overflow-x-auto">
          {driverData?.length > 0 ? (
            <table className="min-w-full bg-[#F2F7F9] text-lg md:text-2xl">
              <tbody>
                {driverData.map((driver, index) => {
                  return (
                    <TableRow
                      driver={driver}
                      zones={zones}
                      refetch={refetch}
                      openSnackBar={openSnackBar}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No drivers found</p>
          )}
        </div>
      )}

      {/* Pagination */}

      {driverData?.length > 0 && query === "" && (
        <div className="flex justify-end mt-10 pb-10 ">
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md cursor-pointer ${
              currentPage === 1 ? "" : "bg-gray-200 hover:bg-gray-300"
            } text-gray-600`}
          >
            <img src={leftPage} alt="" />
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md cursor-pointer ${
              currentPage === totalPages ? "" : "bg-gray-200 hover:bg-gray-300"
            } text-gray-600`}
          >
            <img src={rightPage} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TableDriver;
