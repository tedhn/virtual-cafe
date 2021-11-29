import { useState, useEffect, createContext, useRef } from "react";
import { io, Socket } from "socket.io-client";

import Peer from "simple-peer";
const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // userVideo.current.srcObject = stream;

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current.id, stream);

            peersRef.current.push({ peerId: userId, peer });

            peers.push(peer);
          });

          setPeers(peers);
        });
      });

    socketRef.current.on("me", (id) => {
      console.log(id);
      setMe(id);
    });
  }, []);

  const createTable = () => {
    socketRef.current.emit("new Table", me);

    socketRef.current.on("table id", (tableId) => console.log(tableId));
  };

  const joinTable = (tableId) => {
    socketRef.current.emit("join table", { tableId, userId: me });
  };

  const createPeer = (userId, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userId,
        callerID,
        signal,
      });
    });

    return peer;
  };

  return (
    <SocketContext.Provider value={{ createTable, joinTable }}>
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
