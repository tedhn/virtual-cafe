import { useState, useEffect, createContext, useRef } from "react";
import { io } from "socket.io-client";

import Peer from "simple-peer";
const SocketContext = createContext();
const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [peer, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peerRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
      });
  });

  const createTable = () => {
    socket.emit("newTable", { id: me });

    socket.on("newTable", (id) => console.log(id));
  };

  const joinTable = (id) => {};

  const leaveTable = () => {};

  return <SocketContext.Provider>{children}</SocketContext.Provider>;
};

export { ContextProvider, SocketContext };
