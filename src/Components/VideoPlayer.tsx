import React, { useContext, useState } from "react";
import { SocketContext } from "../socketContext";

const VideoPlayer = () => {
  const { myVid, stream, callEnded, callAccepted, userVid } =
    useContext(SocketContext);

  return (
    <div>
      {stream && (
        <video
          playsInline
          muted
          autoPlay
          className="myVid"
          ref={myVid}
          style={{ display: "flex", zIndex: 6 }}
        />
      )}

      {callAccepted && !callEnded && (
        <video
          playsInline
          muted
          autoPlay
          className="userVid"
          ref={userVid}
          style={{ display: "flex", zIndex: 6 }}
        />
      )}

      {/* {users.map((value: any, index: number) => {
        return (
          <div
            ref={(element) => {
              userVids.current[index] = element;
            }}
          >
            {value}
          </div>
        );
      })} */}
    </div>
  );
};

export default VideoPlayer;
