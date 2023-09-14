import React, { useEffect, useState } from "react";
import logo from "../../assets/kurryzo-logo.png";
import getApiClient from "../../axios/axios";
import Input from "../../components/Input/Input";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setLoginData } from "../../redux/slices/authSlice";
import CircularProgressBar from "../../components/CircularProgressBar/CircularProgressBar";
import OTPInput from "react-otp-input";
import OtpInput from "../../components/OtpInput/OtpInput";
const VerifyOtp = () => {
  const email = useSelector((state) => state.auth.login_email);
  const password = useSelector((state) => state.auth.login_password);
  const otp_token = useSelector((state) => state.auth.login_otp_token);
  const [otp, setOtp] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [counter, setCounter] = useState(60);
  const [formattedTime, setFormattedTime] = useState("1: 00");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const axios = await getApiClient();
      const response = await axios.post("");
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post(
        "/v1/restaurant/verify-otp",
        {
          otp: otp,
        },
        {
          headers: {
            "x-verify": otp_token,
          },
        }
      );
      if (response?.data?.success === true) {
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(setAuthenticated(true));
        navigate("/dashboard/orders");
      } else {
        setError(response?.data?.error?.message ?? "something went wrong");
      }
    } catch (err) {
      setError(err.response.data.error.message ?? "something went wrong");
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      const axios = await getApiClient();
      const response = await axios.post("/v1/restaurant/login", {
        email: email,
        password: password,
      });
      if (response?.data?.success === true) {
        dispatch(
          setLoginData({
            email: email,
            password: password,
            token: response?.data?.data?.verification_key,
          })
        );
        /*   navigate(`/login/verify-otp`); */
        setCounter(60);
      } else {
        setError(response.data.error.message ?? "something went wrong");
      }
    } catch (err) {
      setError(err.response.data.error.message ?? "something went wrong");
    }
    setLoading(false);
  };
  const getFormattedTime = (seconds) => {
    let timeString = moment.utc(seconds * 1000).format("m: ss");

    setFormattedTime(timeString);
  };

  useEffect(() => {
    let interval;

    if (counter > 0) {
      interval = setInterval(() => {
        setCounter(counter - 1);
        getFormattedTime(counter - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [counter]);
  useEffect(() => {
    /*     if (!email || !password || !otp_token) {
      navigate("/login");
    } */
    if (localStorage.getItem("token")) {
      navigate("/dashboard/orders");
    }
  }, []);

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex justify-center items-center bg-bg_secondary">
      <div className="bg-white flex flex-col rounded-md login-shadow p-6 pb-12 md:pb-6 md:px-6  w-[100vw] h-[100vh] md:w-[80%] md:h-auto  md:max-w-[500px]">
        <div className="mt-3 flex gap-2 items-center">
          <Unicons.UilArrowLeft
            size={30}
            onClick={() => {
              navigate(`/login`);
            }}
            className="cursor-pointer"
          />
          <h1 className=" text-xl select-none uppercase font-medium text-text_high_emp">
            Verify otp
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col w-[100%] max-w-[500px] mx-auto "
        >
          <div className="mt-16 md:mt-6 flex flex-col justify-center items-center">
            <p className="select-none text-center text-sm md:text-base">
              otp sent to <span className="text-primary"> {email} </span>
            </p>
            <div className="text-center flex flex-col justify-center items-center mt-4">
              <OtpInput value={otp} onChange={setOtp} />
              <p className="text-sm font-light mt-3 self-start mr-auto">
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
              </p>
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
          {error && <p className="mt-1 text-red-600  text-sm">{error}</p>}
          <div className="text-center mt-[30vh] md:mt-6  mb-2">
            <button
              type="submit"
              className="hover:opacity-80 mx-auto flex justify-center items-center duration-200 select-none primary-gradient text-white uppercase font-medium px-5 py-1 w-full md:w-40 h-10 rounded-md"
            >
              {loading ? (
                <CircularProgressBar
                  klass={"w-7 h-7"}
                  borderKlass={"border-primar border-t-white "}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
