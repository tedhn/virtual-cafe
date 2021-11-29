import React from "react";

import Home from "./Home";

const HomeContainer: React.FC = () => {
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(50);
  const [playlist] = React.useState([
    "https://youtu.be/6uCaEDM-Kf8",
    "https://www.youtube.com/embed/WtRHih2nZxk",
    "https://www.youtube.com/embed/EtqP2xVE4iY",
    "https://www.youtube.com/embed/slt_Bav8nsQ",
    "https://www.youtube.com/embed/DkUIxAzxF6k",
    "https://www.youtube.com/embed/78mYkbfsXRM",
    "https://www.youtube.com/embed/3r9s43TG9yA",
    "https://youtu.be/DhUdOO9UNwY",
    "https://youtu.be/XYtHWyrVm30",
    "https://youtu.be/TpKE4mKFSZY",
    "https://youtu.be/3loq0xBsi7o",
    "https://youtu.be/hCdooZxzISo",
    "https://youtu.be/IzzDrEuFpnE",
    "https://youtu.be/dz0rKzSPcvQ",
  ]);

  return (
    <Home
      volume={volume}
      playlist={playlist}
      playing={playing}
      setVolume={setVolume}
      setPlaying={setPlaying}
    />
  );
};

export default HomeContainer;
