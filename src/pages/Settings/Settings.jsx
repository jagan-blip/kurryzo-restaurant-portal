import React, { useEffect, useState } from "react";
import getApiClient from "../../axios/axios";
import MainLayout from "../../components/MainLayout/MainLayout";
import PageLoading from "../../components/PageLoading/PageLoading";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useSnackbar } from "../../components/SnackBar/useSnackBar";
import { ReactComponent as HotelIcon } from "../../assets/hotel.svg";
const Settings = () => {
  const [restaurant_details, setRestaurantDetails] = useState();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isActive, message, openSnackBar, type } = useSnackbar();
  const getAllBranch = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/restaurant/branch/all", {
        size: 100,
      });
      if (response?.data?.success === true) {
        setRestaurantDetails(response?.data?.data?.restaurant);
        setBranches(response?.data?.data?.branches);
      } else {
        openSnackBar(
          response?.data?.error?.message || "something went wrong",
          "error"
        );
      }
    } catch (err) {
      openSnackBar(
        err?.response?.data?.error?.message || "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllBranch();
  }, []);
  return (
    <>
      {loading && <PageLoading />}
      <SnackBar isActive={isActive} message={message} type={type} />
      <MainLayout>
        <div className="min-h-[100vh] flex flex-col p-2 pt-20 md:pt-2">
          <div className="bg-white p-2 shadow-md flex-1">
            <div className="flex items-center gap-2 pb-2 border-b">
              <HotelIcon />{" "}
              <p className="text-lg md:text-3xl font-medium">
                {restaurant_details?.name}
              </p>
            </div>
            <div className="mt-2">
              <p className="md:text-2xl">Outlets</p>
              <div className="border mt-2 border-[#8A8A8A] border-dashed p-2 rounded-lg w-max">
                {branches?.length > 0 ? (
                  branches?.map((item, index) => {
                    return <p className="text-text_high_emp">{item?.name}</p>;
                  })
                ) : (
                  <p>No outlets</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Settings;
