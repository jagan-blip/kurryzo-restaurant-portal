import React, { useState } from "react";
import Profile from "../../../assets/driver_DP.svg";
import Drawer from "../../../components/Drawer/Drawer";
import DropDown from "../../../components/DropDown/DropDown";
import Modal from "../../../components/Modal/Modal";
import cancel from "../../../assets/cancel.svg";
import group from "../../../assets/Group.svg";
import map from "../../../assets/map.svg";
import phone from "../../../assets/phone.svg";
import maskMan from "../../../assets/maskman.svg";
import star from "../../../assets/star.svg";
import "./TableRow.css";
import getApiClient from "../../../axios/axios";
import PageLoading from "../../../components/PageLoading/PageLoading";

const TableRow = ({ driver, zones, refetch, openSnackBar }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const options = ["Anna nagar", "Avadi", "Ambattur"];
  const [selectedOption, setSelectedOption] = useState(driver?.zone?._id);
  const [aadarModalOpen, setAadarModalOpen] = useState(false);
  const [licenseModalOpen, setLicenseModalOpen] = useState(false);
  const [panModalOpen, setPanModalOpen] = useState(false);
  const [isOrderBased, setIsOrderBased] = useState(!driver?.is_salaried);
  const [isEditingLicense, setIsEditingLicense] = useState(false);
  const [licenseValue, setLicenseValue] = useState(driver?.license || "");
  const [isEditingPan, setIsEditingPan] = useState(false);
  const [panValue, setPanValue] = useState(driver?.pan || "");
  const [isEditingAadhar, setIsEditingAadhar] = useState(false);
  const [aadharValue, setAadharValue] = useState(driver?.aadhar || "");
  const [zoomlevel, setZoomlevel] = useState(10);

  const [zoneId, setZoneId] = useState(driver?.zone?._id);
  const [loading, setLoading] = useState(false);
  const handleOptionSelect = (option) => {
    let selected = zones?.filter((item) => item?.name === option);

    setSelectedOption(selected[0]?._id);
  };
  const saveLicenseChanges = () => {
    setIsEditingLicense(false);
    setLicenseModalOpen(false);
  };

  const cancelLicenseEditing = () => {
    setLicenseValue(driver?.license || "");
    setIsEditingLicense(false);
  };

  const startLicenseEditing = () => {
    setIsEditingLicense(true);
  };
  const savePanChanges = () => {
    setIsEditingPan(false);
    setPanModalOpen(false);
  };

  const cancelPanEditing = () => {
    setPanValue(driver?.pan || "");
    setIsEditingPan(false);
  };

  const startPanEditing = () => {
    setIsEditingPan(true);
  };
  const saveAadharChanges = () => {
    setIsEditingAadhar(false);
    setAadarModalOpen(false);
  };

  const cancelAadharEditing = () => {
    setAadharValue(driver?.aadhar || "");
    setIsEditingAadhar(false);
  };

  const startAadharEditing = () => {
    setIsEditingAadhar(true);
  };

  const updateDriver = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.put("/v1/driver/update", {
        driver_id: driver?._id,
        zone: selectedOption,
        is_salaried: !isOrderBased,
        aadhar: aadharValue,
        license: licenseValue,
        pan: panValue,
      });
      if (response?.data?.success === true) {
        setIsDrawerOpen(false);
        await refetch();
        openSnackBar("updated driver details", "success");
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

  const Payout = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.put("/v1/driver/payout", {
        driver_id: driver?._id,
      });
      if (response?.data?.success === true) {
        setIsDrawerOpen(false);
        await refetch();
        openSnackBar("payout successfull", "success");
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

  return (
    <>
      {loading && <PageLoading />}
      <tr
        key={driver?._id}
        className="border-b border-gray-400 border-dashed whitespace-nowrap"
      >
        <td className="py-3 px-4 text-center">
          <div className="flex ">
            <img
              src={driver?.profile_image || maskMan}
              alt={driver.name}
              className="w-5 md:w-14 min-w-[56px] rounded-full mx-auto"
              onError={(e) => {
                e.target.src = maskMan;
              }}
            />
          </div>
        </td>
        <td className="py-3 px-4 text-center font-bold">{driver?.driver_id}</td>
        <td className="py-3 px-4 text-center text-[#666A6D]">{driver?.name}</td>
        <td className="py-3 px-4 text-center text-[#666A6D]">
          {driver.mobile}
        </td>
        <td className="text-center font-normal">
          <p
            className={`py-2 rounded-xl ${
              driver.driver_status === "open_for_delivery"
                ? "bg-[#ccf5e7] text-[#00A859]"
                : "bg-[#F3E2EA] text-[#FA255E]"
            } `}
          >
            {driver.driver_status === "open_for_delivery"
              ? "ONLINE"
              : "OFFLINE"}
          </p>
        </td>
        <td className="py-3 px-4 flec text-center font-semibold text-[#FFA500] ">
          {driver?.rating?.length === 0
            ? "--"
            : parseFloat(driver?.avg_rating)?.toFixed(1)}
        </td>
        <td className="py-3 px-4 text-center">
          <button
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FA255E] to-[#6E2F69] text-white"
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            View
          </button>

          <Drawer
            show={isDrawerOpen}
            setShow={setIsDrawerOpen}
            disableBackClick={false}
            onBackClick={() => setIsDrawerOpen(false)}
          >
            <div className="bg-white relative h-screen w-screen md:w-[63vw] pb-20 lg:w-[50vw] xl:w-[40vw] 2xl:w-[30vw] overflow-auto">
              <div className="flex justify-between px-5 h-16 items-center bg-[#E8ECEE]">
                <h2 className="font-semibold text-2xl ">Driver Details</h2>
                <img
                  src={cancel}
                  alt=""
                  className="w-8"
                  onClick={() => {
                    setIsDrawerOpen(false);
                  }}
                />
              </div>
              <div className="flex flex-row px-5 justify-between items-center mt-5">
                <div className="flex gap-2 items-center">
                  <div className="flex items-center md:ml-0 md:min-w-[56px] w-16 square-div rounded-full">
                    <img
                      src={driver?.profile_image || maskMan}
                      alt={driver.name}
                      className="rounded-full"
                      onError={(e) => {
                        e.target.src = maskMan;
                      }}
                    />
                  </div>

                  <div className="">
                    <p className="text-xl md:text-2xl font-semibold">
                      {driver?.driver_id}
                    </p>
                    <p className="text-[#666A6D] text-lg font-medium">
                      {driver?.name}
                    </p>
                    <p
                      className="flex items-center gap-2 text-[#FA255E] cursor-pointer"
                      onClick={() => {
                        setIsOrderBased(
                          (prevIsOrderBased) => !prevIsOrderBased
                        );
                      }}
                    >
                      {isOrderBased ? "Order Based" : "Salary Based"}{" "}
                      <span className="">
                        <img src={group} alt="" style={{ cursor: "pointer" }} />
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-2 md:mt-0">
                  <div className=" text-gray-500 font-medium">
                    <button
                      className={`px-10 py-3 mt-4 rounded-md text-xl ${
                        driver?.driver_status === "open_for_delivery"
                          ? "bg-[#ccf5e7] text-[#00A859]"
                          : "bg-[#F3E2EA] text-[#FA255E]"
                      }`}
                    >
                      {driver?.driver_status === "open_for_delivery"
                        ? "ONLINE"
                        : "OFFLINE"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex px-5 justify-between items-center mt-5">
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="flex items-center md:ml-0 md:min-w-[26px] w-7 ">
                    <img src={phone} alt="" />
                  </div>
                  <div className="">
                    <p className="text-base md:text-xl font-semibold whitespace-nowrap">
                      {driver?.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex border py-2 md:py-6 rounded-lg px-1">
                  <div className="font-medium border-r border-dashed border-black ">
                    <p className="text-gray-500 md:mx-10 ">Wallet</p>
                    <p className="md:mx-10 font-semibold mr-2">
                      ₹{driver?.wallet?.amount || 0.0}
                    </p>
                  </div>
                  <div className="font-medium border-l border-dashed">
                    <p className="text-gray-500 whitespace-nowrap ml-2">
                      Floating Cash
                    </p>
                    <p className="font-semibold ml-2">
                      ₹{driver?.floating_cash}
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="flex flex-row px-5 justify-between items-center mt-4 ">
                <div className="flex items-center">
                  <div className="flex items-center min-w-[56px] ">
                    <img src={map} className="w-8" alt="" />
                  </div>

                  <div>
                    <DropDown
                      options={zones?.map((item) => item?.name)}
                      selected={
                        zones?.filter((item) => item?._id === selectedOption)[0]
                          ?.name
                      }
                      onSelect={handleOptionSelect}
                      style={{
                        width: "180px",
                        background: "#fff",
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        padding: "2px",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2 md:mt-0">
                  <div className="font-normal">
                    <button
                      onClick={() => {
                        Payout();
                      }}
                      className="bg-[#0066CC] px-3 md:px-4 md:py-1 rounded-full md:text-xl text-white"
                    >
                      PAYOUT
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-dashed border-gray-400 mx-7 mt-4"></div>

              <div className="mt-5 px-6">
                <h1 className="text-2xl text-[#666A6D]">
                  Bank account details
                </h1>
                <div className="mt-5">
                  <p className="font-semibold">NAME</p>
                  <div className="flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2">
                    <p>{driver?.bank_account_details?.name}</p>
                  </div>
                  <p className="font-semibold mt-3">ACCOUNT NUMBER</p>
                  <div className="flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2">
                    <p>{driver?.bank_account_details?.account_number}</p>
                  </div>
                  <p className="font-semibold mt-2">IFSC CODE</p>
                  <div className="flex bg-[#F6F6F6] h-12 rounded-md items-center px-3 mt-2">
                    <p>{driver?.bank_account_details?.ifsc_code}</p>
                  </div>
                </div>
              </div>

              <div className="border border-dashed border-gray-400 mx-7 mt-6"></div>

              <div className="mt-5 px-6">
                <p className="font-semibold">AADAR</p>
                <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                  <p className="text-[#2492ff]">{aadharValue}</p>
                  <p
                    className="text-[#2492ff] cursor-pointer"
                    onClick={() => {
                      setAadarModalOpen(true);
                    }}
                  >
                    VIEW
                  </p>
                </div>
                <Modal
                  show={aadarModalOpen}
                  setShow={setAadarModalOpen}
                  disableBackClick={false}
                  onBackClick={() => setAadarModalOpen(false)}
                >
                  <div className="bg-white w-[95vw] md:w-[60vw] max-h-[100vh] lg:w-[45vw] xl:w-[35vw] 2xl:w-[30vw] rounded-3xl">
                    <div className="flex justify-between p-4 bg-[#E8ECEE] rounded-t-3xl">
                      <p className="text-2xl px-3 font-medium">AADAR</p>
                      <img
                        src={cancel}
                        alt=""
                        className="w-8"
                        onClick={() => {
                          setAadarModalOpen(false);
                        }}
                      />
                    </div>
                    <div className="flex justify-center items-center p-5">
                      {isEditingAadhar ? (
                        <div className="flex items-center gap-10">
                          <input
                            type="text"
                            value={aadharValue}
                            className="text-[#2492ff] py-3 rounded-md font-medium border border-dashed border-[#2492ff]
                          whitespace-nowrap uppercase tracking-wider text-center"
                            onChange={(e) => setAadharValue(e.target.value)}
                          />
                          <div className="flex gap-5">
                            <button
                              onClick={saveAadharChanges}
                              className="px-4 bg-[#FA255E] text-white py-2 "
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelAadharEditing}
                              className="px-4 py-2 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p className="text-[#2492ff] px-20 py-3 rounded-md font-medium border border-dashed border-[#2492ff] whitespace-nowrap">
                            {aadharValue}
                          </p>
                          <p
                            className="px-2 cursor-pointer"
                            onClick={startAadharEditing}
                          >
                            Edit
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border h-[30vh] rounded-b-3xl">
                      <img
                        src={driver?.aadhar_proof}
                        className="w-full h-full rounded-3xl "
                        alt=""
                      />
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="mt-5 px-6">
                <p className="font-semibold">License</p>
                <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                  <p className="text-[#2492ff] uppercase tracking-wider">
                    {licenseValue}
                  </p>
                  <p
                    className="text-[#2492ff] cursor-pointer"
                    onClick={() => {
                      setLicenseModalOpen(true);
                    }}
                  >
                    VIEW
                  </p>
                </div>
                <Modal
                  show={licenseModalOpen}
                  setShow={setLicenseModalOpen}
                  disableBackClick={false}
                  onBackClick={() => setLicenseModalOpen(false)}
                >
                  <div className="bg-white w-[95vw] md:w-[60vw] max-h-[100vh] lg:w-[45vw] xl:w-[35vw] 2xl:w-[30vw] rounded-3xl">
                    <div className="flex justify-between p-4 bg-[#E8ECEE] rounded-t-3xl">
                      <p className="text-2xl px-3 font-medium">LICENSE</p>
                      <img
                        src={cancel}
                        alt=""
                        className="w-8"
                        onClick={() => {
                          setLicenseModalOpen(false);
                        }}
                      />
                    </div>
                    <div className="flex justify-center items-center p-3">
                      {isEditingLicense ? (
                        <div className="flex items-center gap-10">
                          <input
                            type="text"
                            value={licenseValue}
                            className="text-[#2492ff] py-3 rounded-md font-medium border border-dashed border-[#2492ff]
                          whitespace-nowrap uppercase tracking-wider text-center"
                            onChange={(e) => setLicenseValue(e.target.value)}
                          />
                          <div className="flex gap-5">
                            <button
                              onClick={saveLicenseChanges}
                              className="px-4 bg-[#FA255E] text-white py-2 "
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelLicenseEditing}
                              className="px-4 py-2 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p
                            className="text-[#2492ff] px-20 py-3 rounded-md font-medium border border-dashed border-[#2492ff]
        whitespace-nowrap uppercase tracking-wider"
                          >
                            {licenseValue}
                          </p>
                          <p
                            className="px-2 cursor-pointer"
                            onClick={startLicenseEditing}
                          >
                            Edit
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="border h-[30vh] rounded-b-3xl">
                      <img
                        src={driver?.license_proof}
                        className="w-full h-full rounded-3xl"
                        alt=""
                      />
                    </div>
                  </div>
                </Modal>
              </div>

              <div className="mt-5 px-6">
                <p className="font-semibold">PAN</p>
                <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                  <p className="text-[#2492ff]">{panValue}</p>
                  <p
                    className="text-[#2492ff] cursor-pointer"
                    onClick={() => {
                      setPanModalOpen(true);
                    }}
                  >
                    VIEW
                  </p>
                </div>
                <Modal
                  show={panModalOpen}
                  setShow={setPanModalOpen}
                  disableBackClick={false}
                  onBackClick={() => setPanModalOpen(false)}
                >
                  <div className="bg-white w-[95vw] md:w-[60vw] max-h-[100vh] lg:w-[45vw] xl:w-[35vw] 2xl:w-[30vw] rounded-3xl">
                    <div className="flex justify-between p-4 bg-[#E8ECEE] rounded-t-3xl">
                      <p className="text-2xl px-3 font-medium">PAN</p>
                      <img
                        src={cancel}
                        alt=""
                        className="w-8"
                        onClick={() => {
                          setPanModalOpen(false);
                        }}
                      />
                    </div>
                    <div className="flex justify-center items-center p-5">
                      {isEditingPan ? (
                        <div className="flex gap-5 items-center">
                          <input
                            type="text"
                            value={panValue}
                            className="text-[#2492ff] py-3 rounded-md font-medium border border-dashed border-[#2492ff]
                          whitespace-nowrap uppercase tracking-wider text-center"
                            onChange={(e) => setPanValue(e.target.value)}
                          />
                          <div className="flex gap-5">
                            <button
                              onClick={savePanChanges}
                              className="px-4 bg-[#FA255E] text-white py-2 "
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelPanEditing}
                              className="px-4 py-2 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p
                            className="text-[#2492ff] px-20 py-3 rounded-md font-medium border border-dashed border-[#2492ff]
        whitespace-nowrap uppercase tracking-wider"
                          >
                            {panValue}
                          </p>
                          <p
                            className="px-2 cursor-pointer"
                            onClick={startPanEditing}
                          >
                            Edit
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="border h-[30vh] rounded-b-3xl">
                      <img
                        src={driver?.pan_proof}
                        className="w-full h-full rounded-3xl"
                        alt=""
                      />
                    </div>
                  </div>
                </Modal>
              </div>

              {JSON.stringify({
                zone: selectedOption,
                is_salaried: !isOrderBased,
                aadhar: aadharValue,
                license: licenseValue,
                pan: panValue,
              }) !==
                JSON.stringify({
                  zone: driver?.zone?._id,
                  is_salaried: driver?.is_salaried,
                  aadhar: driver?.aadhar,
                  license: driver?.license,
                  pan: driver?.pan,
                }) && (
                <div className="mt-2 bottom-0 left-0 py-2 px-2 md:mt-0 flex justify-center border-t  fixed bg-white w-full">
                  <div className="flex justify-end gap-5 w-full ">
                    <button
                      className="bg-red-500  px-4 py-1 rounded-full text-xl text-white"
                      onClick={() => {
                        setSelectedOption(driver?.zone?._id);
                        setIsOrderBased(!driver?.is_salaried);
                        setAadharValue(driver?.aadhar);
                        setLicenseValue(driver?.license);
                        setPanValue(driver?.pan);
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      className="bg-[#0066CC] px-4 py-1 rounded-full text-xl text-white"
                      onClick={() => {
                        updateDriver();
                      }}
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Drawer>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
