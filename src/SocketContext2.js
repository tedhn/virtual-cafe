import { useState, useEffect, createContext, useRef } from "react";
import { io } from "socket.io-client";

import Peer from "simple-peer";
const SocketContext = createContext();
const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [others, setOthers] = useState([]);
  const [stream, setStream] = useState();

  const myVid = useRef();
  const otherUserVids = [];
  const tempRefs = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((currentStream) => {
        setStream(currentStream);

        myVid.current.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
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
