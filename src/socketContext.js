import { useState, useEffect, createContext, useRef } from "react";
import { io } from "socket.io-client";

import Peer from "simple-peer";
const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);

  const uservideoRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        uservideoRef.current.srcObject = stream;

        socketRef.current.on("all users", ({ users, callerId }) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, callerId, stream);

            peersRef.current.push({ peerId: userId, peer });

            peers.push(peer);
          });

          setPeers(peers);
        });

        socketRef.current.on("user joined", ({ signal, callerId }) => {
          const peer = addPeer(signal, callerId, stream);

          peersRef.current.push({ peerId: callerId, peer });

          setPeers([...peers, peer]);
        });

        socketRef.current.on("receiving returned signal", ({ signal, id }) => {
          const item = peersRef.current.find((p) => p.peerId === id);

          item.peer.signal(signal);
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUserMedia();
  }, []);

  const findMyId = () => {
    socketRef.current.emit("find my id");

    socketRef.current.on("ur id", (id) => console.log(id));
  };
  const findAllUsers = () => {
    socketRef.current.emit("find all users");

    socketRef.current.on("aall users", (users) => console.log(users));
  };

  const createTable = () => {
    socketRef.current.emit("new Table");

    socketRef.current.on("table id", (tableId) => console.log(tableId));
  };

  const joinTable = (tableId) => {
    socketRef.current.emit("join table", { tableId });
  };

  const createPeer = (userId, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userId,
        callerId,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <SocketContext.Provider
      value={{
        createTable,
        joinTable,
        findMyId,
        findAllUsers,
        peersRef,
        uservideoRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
