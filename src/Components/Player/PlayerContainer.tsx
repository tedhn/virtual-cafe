import React from "react";

import Player from "./Player";

interface Props {
  url: Array<string>;
  volume: number;
}

const PlayerContainer: React.FC<Props> = ({ url, volume }) => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div>
      <Player url={url} playing={playing} volume={volume} />
    </div>
  );
};

export default PlayerContainer;
