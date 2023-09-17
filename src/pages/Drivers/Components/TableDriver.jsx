import React, { useEffect, useState } from 'react';
import Profile from '../../../assets/driver_DP.svg';
import getApiClient from '../../../axios/axios';
import rightPage from '../../../assets/rightPage.svg';
import leftPage from '../../../assets/leftPage.svg';

const TableDriver = () => {
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; 

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
                      src={Profile}
                      alt={driver.name}
                      className="w-5 md:w-14 min-w-[56px] rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-3 px-4 text-center font-bold">DE55005</td>
                  <td className="py-3 px-4 text-center text-[#666A6D]">
                    {driver.name}
                  </td>
                  <td className="py-3 px-4 text-center text-[#666A6D]">
                    +91-{driver.mobile}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <p
                      className={`py-2 rounded-xl ${
                        driver.driver_status === 'open_for_delivery'
                          ? 'bg-[#ccf5e7] text-[#00A859]'
                          : 'bg-[#F3E2EA] text-[#FA255E]'
                      } `}
                    >
                      {driver.driver_status === 'open_for_delivery' ? 'Online' : 'Offline'}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-[#FFA500]">
                    {driver.avg_rating}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FA255E] to-[#6E2F69] text-white">
                      View
                    </button>
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
