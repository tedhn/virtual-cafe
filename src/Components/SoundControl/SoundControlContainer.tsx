import React from "react";

import SoundControl from "./SoundControl";

interface Props {
  setVolume: any;
  volume: number;
  setPlaying: any;
  playing: boolean;
}

const SoundControlContainer: React.FC<Props> = ({
  setVolume,
  volume,
  setPlaying,
  playing,
}) => {
  const changeVolume = (e: any) => {
    console.log(e.target.value);
    console.log(typeof volume);

    setVolume(e.target.value);
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <SoundControl
      changeVolume={changeVolume}
      togglePlay={togglePlay}
      playing={playing}
      volume={volume}
    />
  );
};

export default SoundControlContainer;
