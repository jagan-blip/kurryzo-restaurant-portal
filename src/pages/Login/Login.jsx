import React, { useEffect, useState } from "react";
import logo from "../../assets/kurryzo-logo.png";
import getApiClient from "../../axios/axios";
import Input from "../../components/Input/Input";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginData } from "../../redux/slices/authSlice";
import PageLoading from "../../components/PageLoading/PageLoading";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        navigate(`/login/verify-otp`);
      } else {
        setError(response.data.error.message ?? "something went wrong");
      }
    } catch (err) {
      setError(err.response.data.error.message ?? "something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard/orders");
    }
  }, []);
  return (
    <>
      {loading && <PageLoading />}

      <div className="min-w-[100vw] min-h-[100vh]   flex justify-center items-center bg-bg_secondary">
        <div className="bg-white flex flex-col rounded-md login-shadow p-6 pb-12 md:pb-6 md:px-10  w-[100vw] h-[100vh] justify-between md:w-[80%] md:h-auto  md:max-w-[500px]">
          <img src={logo} className="mx-auto w-52" />
          <h1 className="mt-4 text-center text-xl md:text-3xl font-medium text-text_high_emp">
            Restaurant Portal
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 w-[100%] max-w-[500px] mx-auto "
          >
            <div className="mt-10">
              <p className="select-none">Email</p>
              <Input
                value={email}
                type="email"
                placeholder="enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                styles="mt-3"
              />
              <p className="mt-4 select-none">Password</p>
              <div className="relative">
                <Input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  styles="mt-3"
                />
                <div
                  className="absolute right-3 top-[50%] translate-y-[-20%] cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <Unicons.UilEye size={20} />
                  ) : (
                    <Unicons.UilEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>
            {error && <p className="mt-1 text-red-600  text-sm">{error}</p>}
            <div className="text-center mt-auto  md:mt-6">
              <button
                type="submit"
                className="hover:opacity-80 select-none primary-gradient text-white uppercase font-medium px-5 py-1 w-full md:w-40 h-10 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
