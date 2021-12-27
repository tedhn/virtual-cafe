import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../socketContext";

interface Props {
  peer: any;
}

const VideoPlayer: React.FC<Props> = ({ peer }) => {
  const vidref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(peer);
    peer.peer.on("stream", (stream: any) => {
      vidref.current!.srcObject = stream;
    });
  }, [peer]);

  return (
    <div>
      <video
        playsInline
        muted
        autoPlay
        className="myVid"
        ref={vidref}
        style={{ display: "flex", zIndex: 6 }}
      />
    </div>
  );
};

export default VideoPlayer;
