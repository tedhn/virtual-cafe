import ReactPlayer from "react-player/youtube";

interface Props {
  url: Array<string>;
  playing: boolean;
  volume: number;
}

const Player: React.FC<Props> = ({ url, playing, volume }) => {
  return (
    <div>
      <ReactPlayer
        url={url}
        playing={playing}
        controls={true}
        volume={volume / 100}
        loop={true}
      />
    </div>
  );
};

export default Player;
