import React from "react";
import ReactPlayer from "react-player/youtube";
import "./App.scss";

import _ from "lodash";

function App() {
  const [playing, setPlaying] = React.useState(false);
  const [playlist, setPlaylist] = React.useState([
    // "https://youtu.be/6uCaEDM-Kf8",
    "https://www.youtube.com/embed/WtRHih2nZxk",
    "https://www.youtube.com/embed/EtqP2xVE4iY",
    "https://www.youtube.com/embed/slt_Bav8nsQ",
    "https://www.youtube.com/embed/DkUIxAzxF6k",
    "https://www.youtube.com/embed/78mYkbfsXRM",
    // "https://www.youtube.com/embed/3r9s43TG9yA",
    // "https://youtu.be/DhUdOO9UNwY",
    // "https://youtu.be/XYtHWyrVm30",
    // "https://youtu.be/TpKE4mKFSZY",
    // "https://youtu.be/3loq0xBsi7o",
    // "https://youtu.be/hCdooZxzISo",
    // "https://youtu.be/IzzDrEuFpnE",
    // "https://youtu.be/dz0rKzSPcvQ",
  ]);
  const bgMusic = React.useRef<any>();
  const bgNoise = React.useRef<any>();

  // let playlist = [
  //   "https://youtu.be/6uCaEDM-Kf8",
  //   "https://www.youtube.com/embed/WtRHih2nZxk",
  //   "https://www.youtube.com/embed/EtqP2xVE4iY",
  //   "https://www.youtube.com/embed/slt_Bav8nsQ",
  //   "https://www.youtube.com/embed/DkUIxAzxF6k",
  //   "https://www.youtube.com/embed/78mYkbfsXRM",
  //   "https://www.youtube.com/embed/3r9s43TG9yA",
  //   "https://youtu.be/DhUdOO9UNwY",
  //   "https://youtu.be/XYtHWyrVm30",
  //   "https://youtu.be/TpKE4mKFSZY",
  //   "https://youtu.be/3loq0xBsi7o",
  //   "https://youtu.be/hCdooZxzISo",
  // "https://youtu.be/IzzDrEuFpnE",
  // "https://youtu.be/dz0rKzSPcvQ",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // ];

  React.useEffect(() => {
    setPlaylist((playlist) => _.shuffle(playlist));
  }, []);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const randomStartBGM = () => {
    bgMusic.current.seekTo(Math.random() * 60, "seconds");
  };
  const randomStartNoise = () => {
    bgNoise.current.seekTo(Math.random() * 600, "seconds");
  };

  return (
    <div className="App">
      <div className="soundPlayer">
        <ReactPlayer
          ref={bgMusic}
          url={playlist}
          playing={playing}
          controls={true}
          volume={0.09}
          loop={true}
          onReady={randomStartBGM}
        />
        <ReactPlayer
          ref={bgNoise}
          url="https://www.youtube.com/watch?v=-AC-5ZSroJs&t=33s&ab_channel=%E3%81%8A%E3%81%A8%E9%A2%A8%E6%99%AF"
          playing={playing}
          volume={0.2}
          loop={true}
          controls={true}
          onReady={randomStartNoise}
        />
      </div>

      <div className="cafeName">Virtual Cafe</div>

      <div onClick={togglePlay} className="button">
        {playing ? "pause" : "play"}
      </div>
    </div>
  );
}

export default App;
