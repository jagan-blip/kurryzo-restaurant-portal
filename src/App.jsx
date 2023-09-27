import { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "./socket/SocketContext";
import getApiClient from "./axios/axios";
import { setAuthenticated, setStoreDetails } from "./redux/slices/authSlice";
import PageLoading from "./components/PageLoading/PageLoading";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";
import NotFound from "./pages/404/404";
import VerifyOtp from "./pages/VerifyOtp/VerifyOtp";
import Navbar from "./components/Navbar/Navbar";
import Drivers from "./pages/Drivers/Drivers";
import Areas from "./pages/Areas/Areas";
import Settings from "./pages/Settings/Settings";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [loading, setLoading] = useState(false);
  function isPageHidden() {
    return document?.hidden;
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(setAuthenticated(true));
      const getStoreDetails = async () => {
        setLoading(true);
        try {
          const axios = await getApiClient();
          const response = await axios.get("/v1/restaurant/details");
          if (response.data.success === true) {
            dispatch(setStoreDetails(response.data.data.details));
            setLoading(false);
            navigate("/dashboard/orders");
          } else {
            console.log(response.data.error.message);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      };
      getStoreDetails();
    }
  }, [authenticated]);
  useEffect(() => {
    let interval = setInterval(() => {
      if (isPageHidden()) {
        socket?.emit("heartbeat");
        console.log("hidden");
      }
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [socket]);
  useEffect(() => {
    if (!socket?.connected) {
      socket?.connect();
    }

    return () => {
      if (socket) {
        socket.removeAllListeners();
      }
    };
  }, [socket]);
  if (loading) {
    return (
      <>
        <PageLoading />
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/login/verify-otp" element={<VerifyOtp />} />

        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/drivers" element={<Drivers />} />
        <Route path="/dashboard/areas" element={<Areas />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
