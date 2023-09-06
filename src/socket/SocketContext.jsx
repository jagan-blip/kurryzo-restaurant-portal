import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const [socket, setSocket] = useState(null);

  const dispatch = useDispatch();
  const connect = (token, dispatch) => {
    const socket = io(
      `https://dev-api-restaurant.kzo.starfii.com/restaurant?token=${token}`,
      {
        autoConnect: false,
        forceNew: true,
      }
    );

    return socket;
  };
  useEffect(() => {
    let token;

    const getToken = async () => {
      token = localStorage.getItem("token");

      if (token) {
        try {
          const newSocket = connect(token);
          setSocket(newSocket);
          newSocket.connect((data) => {
            /*         console.log(data); */
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        if (socket) {
          socket.disconnect();
        }
      }
    };
    getToken();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authenticated]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
