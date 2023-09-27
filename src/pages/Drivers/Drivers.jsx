import React, { useEffect, useState, useRef } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import search from "../../assets/lucide_search.svg";
import add from "../../assets/basil_add-solid.svg";
import cancel from "../../assets/cancel.svg";
import maskMan from "../../assets/maskman.svg";
import map from "../../assets/map.svg";
import AreaCard from "./Components/AreaCard";
import FilterDropDown from "./Components/FilterDropDown";
import getApiClient from "../../axios/axios";
import TableDriver from "./Components/TableDriver";
import Drawer from "../../components/Drawer/Drawer";
import DropDown from "../../components/DropDown/DropDown";
import Input from "../../components/Input/Input";
import CircularProgressBar from "../../components/CircularProgressBar/CircularProgressBar";
import * as Yup from "yup";
import "./drivers.css";
import { FileUpload } from "../../utils/FileUpload";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useSnackbar } from "../../components/SnackBar/useSnackBar";
import Modal from "../../components/Modal/Modal";
import * as Unicons from "@iconscout/react-unicons";
import OtpInput from "../../components/OtpInput/OtpInput";
import moment from "moment";
import PageLoading from "../../components/PageLoading/PageLoading";

const Drivers = () => {
  const [responseData, setResponseData] = useState([]);
  const { isActive, message, openSnackBar, type } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const options = [""];
  const [selectedOption, setSelectedOption] = useState(options[2]);
  const [selectedAadarImage, setSelectedAadarImage] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const labelAadar = selectedAadarImage
    ? "text-green-600 cursor-pointer"
    : "text-[#2492ff] cursor-pointer";
  const [selectedLicenseImage, setSelectedLicenseImage] = useState(null);
  const labelLicense = selectedLicenseImage
    ? "text-green-600 cursor-pointer"
    : "text-[#2492ff] cursor-pointer";
  const [selectedPanImage, setSelectedPanImage] = useState(null);
  const labelPan = selectedPanImage
    ? "text-green-600 cursor-pointer"
    : "text-[#2492ff] cursor-pointer";
  const [selectedVehicleImage, setSelectedVehicleImage] = useState(null);
  const labelVehicle = selectedVehicleImage
    ? "text-green-600 cursor-pointer"
    : "text-[#2492ff] cursor-pointer";
  const [searchLoading, setSearchLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [zones, setAllZones] = useState([]);
  const [zoneId, setZoneId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60);
  const [formattedTime, setFormattedTime] = useState("1: 00");
  const [error, setError] = useState();
  const [otpError, setOtpError] = useState();
  const [otpToken, setOtpToken] = useState();
  /* ========== profile image ========== */
  const [profileImage, setProfileImage] = useState(maskMan);

  const handleProfileImage = async (e) => {
    const response = await FileUpload(e);
    setProfileImage(response?.location);
    setFormValues({
      ...formValues,
      profileImage: response?.location,
    });
    if (validationErrors.profileImage) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors.profileImage;
      setValidationErrors(updatedErrors);
    }
  };

  /* ========== Profile image ========== */

  const handleAadarImage = async (e) => {
    const response = await FileUpload(e);
    const file = e.target.files[0];
    setSelectedAadarImage(response?.location);
    setFormValues({
      ...formValues,
      aadharImage: response?.location,
    });
    if (validationErrors.aadharImage) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors.aadharImage;
      setValidationErrors(updatedErrors);
    }
  };

  const handleAadarRemove = () => {
    setSelectedAadarImage(null);
    setFormValues({ ...formValues, aadharImage: null });
  };

  const handleLicenseImage = async (e) => {
    const response = await FileUpload(e);
    const file = e.target.files[0];
    setSelectedLicenseImage(response?.location);
    setFormValues({
      ...formValues,
      licenseImage: response?.location,
    });
    if (validationErrors.licenseImage) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors.licenseImage;
      setValidationErrors(updatedErrors);
    }
  };

  const handleLicenseRemove = () => {
    setSelectedLicenseImage(null);
    setFormValues({ ...formValues, licenseImage: null });
  };

  const handlePanImage = async (e) => {
    const response = await FileUpload(e);
    const file = e.target.files[0];
    setSelectedPanImage(response?.location);
    setFormValues({
      ...formValues,
      panImage: response?.location,
    });
    if (validationErrors.panImage) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors.panImage;
      setValidationErrors(updatedErrors);
    }
  };

  const handlePanRemove = () => {
    setSelectedPanImage(null);
    setFormValues({ ...formValues, panImage: null });
  };

  const handleVehicleImage = async (e) => {
    const response = await FileUpload(e);
    const file = e.target.files[0];
    setSelectedVehicleImage(response?.location);
    setFormValues({
      ...formValues,
      vehicleImage: response?.location,
    });
    if (validationErrors.vehicleImage) {
      const updatedErrors = { ...validationErrors };
      delete updatedErrors.vehicleImage;
      setValidationErrors(updatedErrors);
    }
  };

  const handleVehicleRemove = () => {
    setSelectedVehicleImage(null);
    setFormValues({ ...formValues, vehicleImage: null });
  };
  /* ========== Yup Validation ========== */

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    mobileNumber: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Mobile number is invalid"),
    // accountHolderName: Yup.string().required("Account Holder Name is required"),
    // accountNumber: Yup.string().required("Account number is required"),
    // ifscCode: Yup.string().required("IFSC code is required"),
    profileImage: Yup.string().required("Profile image is required"),

    aadharNumber: Yup.string()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .matches(
        /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
        "Aadhar number is not valid"
      )
      .required("Aadhar number is required"),
    aadharImage: Yup.string().required("Aadhar image is required"),

    licenseNumber: Yup.string().required("License number is required"),
    licenseImage: Yup.string().required("License image is required"),

    panNumber: Yup.string()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .matches(/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/, "Pan number is not valid")
      .required("Pan number is required"),
    panImage: Yup.string().required("PAN image is required"),
    /*  vehicleNumber: Yup.string().required("Vehicle Number is required"),
    vehicleImage: Yup.string().required("Vehicle Image is required"), */
    is_salaried: Yup.boolean().required("please select if driver is salaried"),
  });

  const [formValues, setFormValues] = useState({
    name: "",
    mobileNumber: "",
    accountNumber: "",
    ifscCode: "",
    profileImage: null,
    aadharNumber: "",
    aadharImage: null,
    licenseNumber: "",
    licenseImage: null,
    panNumber: "",
    panImage: null,
    /*  vehicleNumber: "",
    vehicleImage: null, */
    is_salaried: null,
  });

  const handleOptionSelect = (option) => {
    let value = zones.filter((item) => {
      return item?.name === option;
    });
    setSelectedOption(value[0]?._id);
  };

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async () => {
    setValidationErrors({});
    try {
      await validationSchema.validate(formValues, {
        abortEarly: false,
      });
      const driverData = {
        name: formValues.name,
        profile_image: formValues.profileImage,
        mobile: formValues.mobileNumber,
        address: "X <-> twitter headoffice",
        address_proof: "X-RC",
        aadhar: formValues.aadharNumber,
        aadhar_proof: formValues.aadharImage,
        pan: formValues.panNumber,
        pan_proof: formValues.panImage,
        license: formValues.licenseNumber,
        license_proof: formValues.licenseImage,
        zone: selectedOption,
        vehicle_no: "asd",
        vehicle_proof: "asd",
      };
      setNewLoading(true);
      try {
        const axios = await getApiClient();
        const response = await axios.post("/v1/driver/create", driverData);
        if (response?.data?.success === true) {
          openSnackBar(
            response?.data?.data?.message || "Otp Sent Successfully",
            "success"
          );
          setIsModalOpen(true);
          setOtpToken(response?.data?.data?.verification_key);
        } else {
          openSnackBar(
            response?.data?.error?.message || "something Went wrong",
            "error"
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        openSnackBar(
          error.response?.data?.error?.message || "something Went wrong",
          "error"
        );
      }
      setNewLoading(false);
    } catch (errors) {
      const errorsObj = {};
      errors?.inner.forEach((error) => {
        errorsObj[error.path] = error.message;
      });

      setValidationErrors(errorsObj);
    }
  };

  /* ========== Yup Validation ========== */

  const fetchData = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/driver/area", {
        zone: zoneId,
      });

      setResponseData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const fetchDataTable = async () => {
    setTableLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/driver/portal/all", {
        page: currentPage,
        size: pageSize,
        zone: zoneId,
      });

      if (response.data.success) {
        setDriverData(response.data.data.drivers);
        setTotalPages(response.data.data.totalpages);
        setTableLoading(false);
      } else {
        openSnackBar("something went wrong", "error");
        setTableLoading(false);
      }
    } catch (err) {
      openSnackBar("something went wrong", "error");
      setTableLoading(false);
    }
  };
  const getSearch = async () => {
    setSearchLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/driver/search", {
        query: query,
        zone: zoneId,
      });
      if (response?.data?.success === true) {
        setDriverData(response?.data?.data?.drivers);
      } else {
        openSnackBar(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      openSnackBar(
        err.response.data.error.message ?? "something went wrong",
        "error"
      );
    }
    setSearchLoading(false);
  };

  const getAllZones = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.get("/v1/zone");
      if (response?.data?.success === true) {
        let all_zones = response?.data?.data?.zones;

        setAllZones(all_zones);
        setSelectedOption(all_zones[0]?._id);
      } else {
        openSnackBar(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      openSnackBar(
        err.response.data.error.message ?? "something went wrong",
        "error"
      );
    }
    setLoading(false);
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post(
        "/v1/driver/verify-otp",
        {
          otp: otp,
        },
        {
          headers: {
            "x-verify": otpToken,
          },
        }
      );
      if (response?.data?.success === true) {
        setIsModalOpen(false);
        setIsDrawerOpen(false);
        openSnackBar("created driver", "success");
        await fetchData();
        await fetchDataTable();
      } else {
        setOtpError(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      setOtpError(err.response.data.error.message ?? "something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [zoneId]);

  useEffect(() => {
    if (query !== "") {
      getSearch();
    } else {
      fetchDataTable();
    }
  }, [query]);
  useEffect(() => {
    getAllZones();
  }, []);
  useEffect(() => {
    setFormValues({
      ...formValues,
      name: "",
      mobileNumber: "",
      accountNumber: "",
      ifscCode: "",
      profileImage: null,
      aadharNumber: "",
      aadharImage: null,
      licenseNumber: "",
      licenseImage: null,
      panNumber: "",
      panImage: null,
      /* vehicleNumber: "",
      vehicleImage: null, */
      is_salaried: null,
    });
    setProfileImage(null);
    setSelectedAadarImage(null);
    setSelectedLicenseImage(null);
    setSelectedPanImage(null);
    setSelectedVehicleImage(null);
  }, [isDrawerOpen]);
  /*  useEffect(() => {
    let interval;

    if (counter > 0) {
      interval = setInterval(() => {
        setCounter(counter - 1);
        getFormattedTime(counter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter]); */

  return (
    <>
      {(loading || newLoading) && <PageLoading />}
      <SnackBar isActive={isActive} message={message} type={type} />
      <MainLayout>
        <div className="min-h-[100vh]">
          {/*  {!loading && (
            <div className="h-[100vh] flex justify-center items-center fixed w-[90%]">
              <CircularProgressBar />
            </div>
          )} */}
          <div className="pt-20 px-6 sm:pt-24 sm:px-8 md:pt-7 md:px-14">
            <div className="relative flex sm:flex-col flex-col gap-10 justify-between md:flex-row gap-y-4">
              {enabled && (
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                    }}
                    className="block pl-10 w-[100%] py-2 bg-white border rounded-full focus:ring-4 focus:ring-purple-600 focus:outline-none focus:ring-opacity-20 shadow-lg"
                    placeholder="Search by Driver ID, Name or Mobile"
                  />
                  <img
                    src={search}
                    className="absolute  mx-2 top-[50%] translate-y-[-50%]"
                    alt=""
                  />
                  {searchLoading && (
                    <div className="absolute right-2 top-[50%] translate-y-[-50%] ">
                      <CircularProgressBar
                        klass={"w-7 h-7"}
                        borderKlass={"border-t-secondary "}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between gap-4  ml-auto">
                <div className="flex items-center gap-5 md:gap-20 lg:gap-24">
                  <p className="text-sm md:text-lg whitespace-nowrap cursor-pointer hover:text-[#FB3B6E] duration-300 ml-2">
                    View as table
                  </p>
                  <label className="flex items-center cursor-pointer  ">
                    <div
                      className={`w-12 h-6  ${
                        enabled ? "bg-[#FED3DF]" : "bg-[#FED3DF]"
                      } rounded-full`}
                    >
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => {
                          setEnabled(!enabled);
                        }}
                        className="hidden"
                      />
                      <div
                        className={`w-4 h-4 mt-1  ${
                          enabled
                            ? "bg-[#FB3B6E] translate-x-6 "
                            : "bg-[#FB3B6E] translate-x-1"
                        } rounded-full shadow transition-transform`}
                      ></div>
                    </div>
                  </label>
                </div>
                <div className="md:hidden">
                  <FilterDropDown data={zones} setZoneId={setZoneId} />
                </div>
              </div>
            </div>

            <div className="md:flex justify-between mt-7 hidden">
              <div
                className="md:flex gap-2 cursor-pointer bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] w-[260px] h-[44px] rounded-md text-white text-lg whitespace-nowrap px-5"
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              >
                <button className="flex items-center px-2 gap-1">
                  <span>
                    <img src={add} alt="" />
                  </span>
                  CREATE NEW DRIVER
                </button>
              </div>
              <FilterDropDown data={zones} setZoneId={setZoneId} />
            </div>

            {enabled ? (
              <div>
                <TableDriver
                  driverData={driverData}
                  zoneId={zoneId}
                  loading={tableLoading}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  fetchData={fetchDataTable}
                  query={query}
                  zones={zones}
                  openSnackBar={openSnackBar}
                />
                <button
                  className="bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] px-2 py-2 rounded-md md:hidden fixed"
                  style={{
                    bottom: "20vw",
                    right: "7vw",
                  }}
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                >
                  <img src={add} className="w-8" alt="" />
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 pb-10 relative">
                {responseData?.length > 0 ? (
                  responseData?.map((item) => (
                    <AreaCard
                      key={item._id[0]._id}
                      title={item._id[0].name}
                      total={item.total_drivers}
                      online={item.active_drivers}
                      offline={item.inactive_drivers}
                      data={item}
                    />
                  ))
                ) : (
                  <p>No drivers found</p>
                )}
                <button
                  className="bg-gradient-to-r from-[#0B9088] to-[#2F6A6E] px-2 py-2 rounded-md md:hidden fixed"
                  style={{
                    bottom: "20vw",
                    right: "7vw",
                  }}
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                >
                  <img src={add} className="w-8" alt="" />
                </button>
              </div>
            )}
          </div>
        </div>
        <Drawer
          show={isDrawerOpen}
          setShow={setIsDrawerOpen}
          disableBackClick={true}
          /*      onBackClick={() => setIsDrawerOpen(false)} */
        >
          <div className="bg-white h-screen w-screen md:w-[65vw] lg:w-[55vw] xl:w-[45vw] 2xl:w-[35vw] overflow-auto">
            <div className="flex justify-between px-5 h-16 items-center bg-[#E8ECEE]">
              <h2 className="font-semibold text-2xl">Create New Driver</h2>
              <img
                src={cancel}
                alt=""
                className="w-8"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              />
            </div>

            <div className="flex justify-between p-5">
              <div className="relative inline-block">
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img
                      src={profileImage || maskMan}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (validationErrors.profileImage) {
                        const updatedErrors = { ...validationErrors };
                        delete updatedErrors.profileImage;
                        setValidationErrors(updatedErrors);
                      }
                      handleProfileImage(e);
                    }
                  }}
                />
                {validationErrors.profileImage && (
                  <p className="text-red-500">
                    {validationErrors.profileImage}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-5">
                <img src={map} alt="" />
                {/* {console.log(zones?.filter((item) =>{
                  return item._id === selectedOption

                })[0]?.name )} */}
                <DropDown
                  options={zones?.map((item) => {
                    return item.name;
                  })}
                  selected={
                    zones?.filter((item) => {
                      return item._id === selectedOption;
                    })[0]?.name
                  }
                  onSelect={handleOptionSelect}
                  style={{
                    width: "180px",
                    background: "#fff",
                    fontSize: "1.5rem",
                    fontWeight: "400",
                  }}
                />
              </div>
            </div>

            <div className="px-5">
              <h1 className="text-2xl text-[#666A6D]">Personal details</h1>
              <div className="mt-5">
                <p className="font-semibold mb-2">NAME</p>
                <Input
                  placeholder="Enter driver name"
                  value={formValues.name}
                  onChange={(e) => {
                    if (validationErrors.name) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.name;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({ ...formValues, name: e.target.value });
                  }}
                />
                {validationErrors.name && (
                  <p className="text-red-500">{validationErrors.name}</p>
                )}
                <p className="font-semibold mt-3 mb-2">MOBILE NUMBER</p>
                <Input
                  placeholder="Enter mobile number"
                  value={formValues.mobileNumber}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/\D/g, "");
                    if (inputValue.length > 10) {
                      return;
                    }
                    if (validationErrors.mobileNumber) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.mobileNumber;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({ ...formValues, mobileNumber: inputValue });
                  }}
                />

                {validationErrors.mobileNumber && (
                  <p className="text-red-500">
                    {validationErrors.mobileNumber}
                  </p>
                )}
              </div>
              <p className="font-semibold ">Is salaried ?</p>

              <div className="mt-3 mb-2 flex flex-row items-center gap-2">
                <p>YES</p>
                <input
                  checked={formValues?.is_salaried === true}
                  type={"checkbox"}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      is_salaried: true,
                    });
                  }}
                />
                <p>NO</p>
                <input
                  checked={formValues?.is_salaried === false}
                  type={"checkbox"}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      is_salaried: false,
                    });
                  }}
                />
              </div>
              {validationErrors.is_salaried && (
                <p className="text-red-500">{validationErrors.is_salaried}</p>
              )}
            </div>

            <div className="border border-dashed border-gray-400 mx-7 mt-4"></div>

            {/* <div className="mt-6 px-5">
            <h1 className="text-2xl text-[#666A6D]">Bank Account details</h1>
            <div className="mt-5">
              <p className="font-semibold mb-2">ACCOUNT HOLDER NAME</p>
              <Input
                placeholder="Enter account holder name"
                onChange={(e) => {
                  if (validationErrors.accountHolderName) {
                    const updatedErrors = { ...validationErrors };
                    delete updatedErrors.accountHolderName;
                    setValidationErrors(updatedErrors);
                  }
                  setFormValues({ ...formValues, accountHolderName: e.target.value });
                }}
              />
              {validationErrors.accountHolderName && (
                <p className="text-red-500">{validationErrors.accountHolderName}</p>
              )}
              <p className="font-semibold mt-3 mb-2">ACCOUNT NUMBER</p>
              <Input
                placeholder="Enter account number"
                value={formValues.accountNumber}
                onChange={(e) => {
                  if (validationErrors.accountNumber) {
                    const updatedErrors = { ...validationErrors };
                    delete updatedErrors.accountNumber;
                    setValidationErrors(updatedErrors);
                  }
                  setFormValues({ ...formValues, accountNumber: e.target.value });
                }}
              />
              {validationErrors.accountNumber && (
                <p className="text-red-500">{validationErrors.accountNumber}</p>
              )}
              <p className="font-semibold mt-3 mb-2">IFSC CODE</p>
              <Input
                placeholder="Enter ifsc code"
                value={formValues.ifscCode}
                onChange={(e) => {
                  if (validationErrors.ifscCode) {
                    const updatedErrors = { ...validationErrors };
                    delete updatedErrors.ifscCode;
                    setValidationErrors(updatedErrors);
                  }
                  setFormValues({ ...formValues, ifscCode: e.target.value });
                }}
              />
              {validationErrors.ifscCode && (
                <p className="text-red-500">{validationErrors.ifscCode}</p>
              )}
            </div>
          </div>
          <div className="border border-dashed border-gray-400 mx-7 mt-4"></div> */}

            <div className="mt-5 px-6">
              <p className="font-semibold">AADAR</p>
              <div className="mt-4 mb-5">
                <Input
                  placeholder="Enter Aadhar number"
                  value={formValues.aadharNumber}
                  onChange={(e) => {
                    if (validationErrors.aadharNumber) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.aadharNumber;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({
                      ...formValues,
                      aadharNumber: e.target.value,
                    });
                  }}
                />
                {validationErrors.aadharNumber && (
                  <p className="text-red-500">
                    {validationErrors.aadharNumber}
                  </p>
                )}
              </div>
              <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                <label className={labelAadar}>
                  {selectedAadarImage
                    ? "Image uploaded Successfully"
                    : `Add AADAR Photo`}
                  <input
                    type="file"
                    accept="image/*"
                    id="aadhar-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (validationErrors.aadharImage) {
                          const updatedErrors = { ...validationErrors };
                          delete updatedErrors.aadharImage;
                          setValidationErrors(updatedErrors);
                        }
                        handleAadarImage(e);
                      }
                    }}
                  />
                </label>
                {validationErrors.aadharImage && (
                  <p className="text-red-500">{validationErrors.aadharImage}</p>
                )}
                {selectedAadarImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedAadarImage}
                      alt="Aadhar"
                      className="w-10 h-10"
                      id="Aadar-file-input"
                    />
                    <p
                      className="text-[#2492ff] cursor-pointer"
                      onClick={handleAadarRemove}
                    >
                      Remove
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 px-6">
              <p className="font-semibold">LICENSE</p>
              <div className="mt-4 mb-5">
                <Input
                  placeholder="Enter License number"
                  value={formValues.licenseNumber}
                  onChange={(e) => {
                    if (validationErrors.licenseNumber) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.licenseNumber;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({
                      ...formValues,
                      licenseNumber: e.target.value,
                    });
                  }}
                />
                {validationErrors.licenseNumber && (
                  <p className="text-red-500">
                    {validationErrors.licenseNumber}
                  </p>
                )}
              </div>
              <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                <label className={labelLicense}>
                  {selectedLicenseImage
                    ? "Image uploaded Successfully"
                    : `Add LICENSE Photo`}
                  <input
                    type="file"
                    accept="image/*"
                    id="license-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (validationErrors.licenseImage) {
                          const updatedErrors = { ...validationErrors };
                          delete updatedErrors.licenseImage;
                          setValidationErrors(updatedErrors);
                        }
                        handleLicenseImage(e);
                      }
                    }}
                  />
                </label>
                {validationErrors.licenseImage && (
                  <p className="text-red-500">
                    {validationErrors.licenseImage}
                  </p>
                )}
                {selectedLicenseImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedLicenseImage}
                      alt="Aadhar"
                      className="w-10 h-10"
                    />
                    <p
                      className="text-[#2492ff] cursor-pointer"
                      onClick={handleLicenseRemove}
                    >
                      Remove
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 px-6">
              <p className="font-semibold">PAN</p>
              <div className="mt-4 mb-5">
                <Input
                  placeholder="Enter Pan number"
                  value={formValues.panNumber}
                  onChange={(e) => {
                    if (validationErrors.panNumber) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.panNumber;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({
                      ...formValues,
                      panNumber: e.target.value,
                    });
                  }}
                />
                {validationErrors.panNumber && (
                  <p className="text-red-500">{validationErrors.panNumber}</p>
                )}
              </div>
              <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                <label className={labelPan}>
                  {selectedPanImage
                    ? "Image uploaded Successfully"
                    : `Add PAN Photo`}
                  <input
                    type="file"
                    accept="image/*"
                    id="Pan-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        if (validationErrors.panImage) {
                          const updatedErrors = { ...validationErrors };
                          delete updatedErrors.panImage;
                          setValidationErrors(updatedErrors);
                        }
                        handlePanImage(e);
                      }
                    }}
                  />
                </label>
                {validationErrors.panImage && (
                  <p className="text-red-500">{validationErrors.panImage}</p>
                )}
                {selectedPanImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedPanImage}
                      alt="Aadhar"
                      className="w-10 h-10"
                    />
                    <p
                      className="text-[#2492ff] cursor-pointer"
                      onClick={handlePanRemove}
                    >
                      Remove
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* <div className="mt-5 px-6">
              <p className="font-semibold">VEHICLE DETAILS</p>
              <div className="mt-4 mb-5">
                <Input
                  placeholder="Enter Vehicle Registration number"
                  value={formValues.vehicleNumber}
                  onChange={(e) => {
                    if (validationErrors.vehicleNumber) {
                      const updatedErrors = { ...validationErrors };
                      delete updatedErrors.vehicleNumber;
                      setValidationErrors(updatedErrors);
                    }
                    setFormValues({
                      ...formValues,
                      vehicleNumber: e.target.value,
                    });
                  }}
                />
                {validationErrors.vehicleNumber && (
                  <p className="text-red-500">
                    {validationErrors.vehicleNumber}
                  </p>
                )}
              </div>
              <div className="bg-[#e0f0ff] flex justify-between items-center h-14 px-5 mt-2 rounded-md font-medium border border-dashed border-[#2492ff]">
                <label className={labelAadar}>
                  {selectedVehicleImage
                    ? "Image uploaded Successfully"
                    : `Add Vehicle Photo`}
                  <input
                    type="file"
                    accept="image/*"
                    id="vehicle-file-input"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleVehicleImage(e);
                    }}
                  />
                </label>
                {validationErrors.vehicleImage && (
                  <p className="text-red-500">
                    {validationErrors.vehicleImage}
                  </p>
                )}
                {selectedVehicleImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedVehicleImage}
                      alt="Vehicle"
                      className="w-10 h-10"
                    />
                    <p
                      className="text-[#2492ff] cursor-pointer"
                      onClick={handleVehicleRemove}
                    >
                      Remove
                    </p>
                  </div>
                )}
              </div>
            </div> */}

            <div className="mt-2 md:mt-0 flex justify-center mb-10">
              <div className="font-normal">
                <button
                  className="bg-[#0066CC] px-4 py-1 mt-4 rounded-full text-xl text-white"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            <Modal
              show={isModalOpen}
              setShow={setIsModalOpen}
              disableBackClick={false}
              onBackClick={() => setIsModalOpen(false)}
            >
              <div className="bg-white flex flex-col rounded-md login-shadow p-6 pb-12 md:pb-6 md:px-6  w-[100vw] h-[100vh]  md:max-h-[40vh]  md:max-w-[500px]">
                <div className="mt-3 flex gap-2 items-center">
                  <Unicons.UilArrowLeft
                    size={30}
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    className="cursor-pointer"
                  />
                  <h1 className=" text-xl select-none uppercase font-medium text-text_high_emp">
                    Verify otp
                  </h1>
                </div>

                <form
                  onSubmit={formSubmit}
                  className="flex flex-1 flex-col w-[100%] max-w-[500px] mx-auto "
                >
                  <div className="mt-16 md:mt-6 flex flex-col justify-center items-center">
                    {/*  <p className="select-none text-center text-sm md:text-base">
                      otp sent to <span className="text-primary"> </span>
                    </p> */}
                    <div className="text-center flex flex-col justify-center items-center mt-4">
                      <OtpInput value={otp} onChange={setOtp} />
                      {/*  <p className="text-sm font-light mt-3 self-start mr-auto">
                        {counter === 0 ? (
                          <>
                            {" "}
                            Didn't receive the code ?{" "}
                            <span
                              className="text-tertiary cursor-pointer "
                              onClick={() => {
                                resendOtp();
                              }}
                            >
                              Resend
                            </span>
                          </>
                        ) : (
                          formattedTime
                        )}
                      </p> */}
                    </div>

                    {/* <Input
              value={otp}
              type="text"
              placeholder="enter your otp"
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              styles="mt-3"
            /> */}
                  </div>
                  {otpError && (
                    <p className="mt-1 text-red-600  text-sm">{otpError}</p>
                  )}
                  <div className="text-center mt-[30vh] md:mt-6  mb-2">
                    <button
                      type="submit"
                      className="hover:opacity-80 mx-auto flex justify-center items-center duration-200 select-none primary-gradient text-white uppercase font-medium px-5 py-1 w-full md:w-40 h-10 rounded-md"
                    >
                      {loading ? (
                        <CircularProgressBar
                          klass={"w-7 h-7"}
                          borderKlass={"border-primary border-t-white "}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </Drawer>
      </MainLayout>
    </>
  );
};

export default Drivers;
