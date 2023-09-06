import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as OrderLogo } from "../../assets/orders.svg";
import { ReactComponent as DriverLogo } from "../../assets/driver.svg";
import { ReactComponent as AreaLogo } from "../../assets/area.svg";
import { ReactComponent as SettingsLogo } from "../../assets/settings.svg";
import { ReactComponent as LogoutLogo } from "../../assets/logout.svg";
import logo from "../../assets/kurryzo-logo.png";
import { CSSTransition } from "react-transition-group";
import * as Unicons from "@iconscout/react-unicons";
import Drawer from "../Drawer/Drawer";
import getApiClient from "../../axios/axios";
import { useDispatch } from "react-redux";
import {
  setAuthenticated,
  setStoreDetails,
} from "../../redux/slices/authSlice";
import PageLoading from "../PageLoading/PageLoading";
import { useSnackbar } from "../SnackBar/useSnackBar";
import SnackBar from "../SnackBar/SnackBar";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isActive, message, openSnackBar, type } = useSnackbar();
  const dispatch = useDispatch();
  const onResize = (e) => {
    let height = window?.innerHeight;
    let width = window?.innerWidth;

    if (!window?.matchMedia("(max-width:768px)")?.matches) {
      setOpen(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    const axios = await getApiClient();
    const response = await axios.get("/v1/restaurant/logout");
    if (response?.data?.success === true) {
      dispatch(setAuthenticated(false));
      dispatch(setStoreDetails(null));
      localStorage.clear();
      navigate("/login");
      setLoading(false);
    } else {
      setLoading(false);
      /* setSnack(prev => ({
        ...prev,
        show: true,
        type: 'error',
        message: 'something went wrong',
      })); */
    }
  };
  useEffect(() => {
    window?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      {loading && <PageLoading />}
      <SnackBar isActive={isActive} message={message} type={type} />
      {/* desktop nav */}
      <div className=" bg-[#F5F9FA] hidden h-full fixed left-0 top-0 md:w-[15vw] md:flex flex-col ">
        <div className=" px-3 mt-8 mb-14">
          <img src={logo} className="w-auto" />
        </div>

        <div
          className={`mb-10  ${
            location.pathname === "/dashboard/orders" ? "nav-link-selected" : ""
          } nav-link cursor-pointer`}
          onClick={() => {
            navigate("/dashboard/orders");
          }}
        >
          <OrderLogo
            color={
              location.pathname === "/dashboard/orders" ? "#fff" : "#8E9091"
            }
            width={25}
            className={"mr-[12.5px]"}
          />
        </div>

        <div
          className={`mb-10  ${
            location.pathname === "/dashboard/drivers"
              ? "nav-link-selected"
              : ""
          } nav-link cursor-pointer`}
          onClick={() => {
            navigate("/dashboard/drivers");
          }}
        >
          <DriverLogo
            color={
              location.pathname === "/dashboard/drivers" ? "#fff" : "#8E9091"
            }
            width={30}
            className={"mr-[10px]"}
          />
        </div>

        <div
          className={`mb-10  ${
            location.pathname === "/dashboard/areas" ? "nav-link-selected" : ""
          } nav-link cursor-pointer`}
          onClick={() => {
            navigate("/dashboard/areas");
          }}
        >
          <AreaLogo
            color={
              location.pathname === "/dashboard/areas" ? "#fff" : "#8E9091"
            }
            width={30}
            className={"mr-[10px]"}
          />
        </div>
        <div
          className={`mb-10  ${
            location.pathname === "/dashboard/settings"
              ? "nav-link-selected"
              : ""
          } nav-link cursor-pointer`}
          onClick={() => {
            /*     navigate("/dashboard/settings"); */
            openSnackBar("showing snackbar", "error");
          }}
        >
          <SettingsLogo
            color={
              location.pathname === "/dashboard/settings" ? "#fff" : "#8E9091"
            }
            width={30}
            className={"mr-[10px]"}
          />
        </div>
        <div
          className="mb-10 bg-[#E8ECEE] cursor-pointer 4 w-[50px] h-[50px] flex justify-center items-center mx-auto rounded-full"
          onClick={() => {
            /*   logout(); */
            openSnackBar("showing snackbar", "neutral");
          }}
        >
          <LogoutLogo color={"#8E9091"} width={25} />
        </div>
      </div>

      {/* mobile nav */}
      <div className="bg-[#F5F9FA] m-nav-shadow md:hidden fixed flex justify-between items-center p-3 top-0 w-full">
        <div className="">
          <img src={logo} className="w-[40%]" />
        </div>
        <div
          className="select-none cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="block primary-gradient select-none w-[10vw] h-[3px] mb-[5px]"></span>
          <span className="block primary-gradient select-none w-[10vw] h-[3px] mb-[5px]"></span>
          <span className="block primary-gradient select-none w-[10vw] h-[3px]"></span>
        </div>
      </div>
      <div className="bg-white p-3 flex justify-between content-center px-6 fixed bottom-0 w-full md:hidden">
        <div
          className={`  ${
            location.pathname === "/dashboard/orders"
              ? "primary-gradient"
              : "bg-[#E8ECEE]"
          }  cursor-pointer w-[40px] h-[40px]  flex justify-center items-center rounded-full`}
          onClick={() => {
            navigate("/dashboard/orders");
          }}
        >
          <OrderLogo
            color={
              location.pathname === "/dashboard/orders" ? "#fff" : "#8E9091"
            }
            width={20}
            className={""}
          />
        </div>

        <div
          className={`  ${
            location.pathname === "/dashboard/drivers"
              ? "primary-gradient"
              : "bg-[#E8ECEE]"
          }  cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full`}
          onClick={() => {
            navigate("/dashboard/drivers");
          }}
        >
          <DriverLogo
            color={
              location.pathname === "/dashboard/drivers" ? "#fff" : "#8E9091"
            }
            width={25}
            className={""}
          />
        </div>
        <div
          className={`  ${
            location.pathname === "/dashboard/areas"
              ? "primary-gradient"
              : "bg-[#E8ECEE]"
          }  cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full`}
          onClick={() => {
            navigate("/dashboard/areas");
          }}
        >
          <AreaLogo
            color={
              location.pathname === "/dashboard/areas" ? "#fff" : "#8E9091"
            }
            width={25}
            className={""}
          />
        </div>
        <div
          className={`  ${
            location.pathname === "/dashboard/settings"
              ? "primary-gradient"
              : "bg-[#E8ECEE]"
          }  cursor-pointer w-[40px] h-[40px] flex justify-center items-center rounded-full`}
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <SettingsLogo
            color={
              location.pathname === "/dashboard/settings" ? "#fff" : "#8E9091"
            }
            width={25}
            className={""}
          />
        </div>
      </div>
      <Drawer show={open} setShow={setOpen}>
        <div className=" bg-white h-[100vh]  w-[80vw] flex flex-col relative overflow-auto ">
          <div className="  flex justify-end items-center px-2 py-2">
            {/*      <p className=" text-primary font-medium ">Updated store status</p> */}
            <div
              className=" cursor-pointer w-8 h-8 flex items-center justify-center rounded-full primary-gradient "
              onClick={() => {
                setOpen(false);
              }}
            >
              <Unicons.UilMultiply size={24} color={"#fff"} />
            </div>
          </div>
          <div
            className="px-3 flex gap-5 items-center cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            <div className=" bg-[#E8ECEE]  4 w-[50px] h-[50px] flex justify-center items-center  rounded-full">
              <LogoutLogo color={"#8E9091"} width={25} />
            </div>
            <h1 className="text-text_low_emp text-xl">Logout</h1>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
