import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../socketContext";

interface Props {
  peer: any;
}

const VideoPlayer: React.FC<Props> = ({ peer }) => {
  const vidref = useRef();

  useEffect(() => {
    peer.on("stream", (stream: any) => {
      //@ts-ignore
      vidref.current.srcObject = stream;
    });
  }, []);

  return (
    <div>
      <video
        playsInline
        muted
        autoPlay
        className="myVid"
        ref={vidref.current}
        style={{ display: "flex", zIndex: 6 }}
      />
    </div>
  );
};

export default VideoPlayer;
