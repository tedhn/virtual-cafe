import ReactPlayer from "react-player/youtube";
import SoundControlContainer from "../Components/SoundControl/SoundControlContainer";
import "./Home.scss";

import pixel from "../images/UEl2.gif";

import VideoPlayer from "../Components/VideoPlayer";
import { useContext, useState } from "react";
import { SocketContext } from "../socketContext";

interface Props {
  playlist: Array<string>;
  playing: boolean;
  volume: number;
  setVolume: any;
  setPlaying: any;
}

const Home: React.FC<Props> = ({
  playlist,
  volume,
  playing,
  setVolume,
  setPlaying,
}) => {
  const [id, setId] = useState("");

  const {
    createTable,
    joinTable,
    findMyId,
    findAllUsers,
    peersRef,
    uservideoRef,
  } = useContext(SocketContext);

  return (
    <div className="">
      {/* <div className="soundPlayer">
        <ReactPlayer
          url={playlist}
          playing={playing}
          volume={volume / 100}
          loop={true}
        />
        <ReactPlayer
          url="https://youtu.be/-AC-5ZSroJs"
          playing={playing}
          volume={volume / 100}
          loop={true}
        />
      </div>

      <SoundControlContainer
        setVolume={setVolume}
        volume={volume}
        playing={playing}
        setPlaying={setPlaying}
      />

      <div className={"cafeName"}>
        <img src={pixel} alt={"404"} />
        <div>Virtual Cafe</div>
      </div> */}

      <div>
        <input onChange={(e) => setId(e.target.value)} />
        <button onClick={() => joinTable(id)}>join table</button>
      </div>

      <div>
        <button onClick={findMyId}>find my id</button>
        <button onClick={findAllUsers}>find a;; users</button>

        {/* <button onClick={leaveCall}>Leave Call</button> */}
        {console.log(peersRef)}
      </div>

      <div>
        <button onClick={createTable}>New Table</button>
      </div>

      <div style={{ position: "absolute", left: "50px", cursor: "pointer" }}>
        <video muted autoPlay ref={uservideoRef} />

        {peersRef.current.map((peer: any) => {
          return <VideoPlayer peer={peer} />;
        })}
      </div>
    </div>
  );
};

export default Home;
