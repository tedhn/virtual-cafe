import "./SoundControl.scss";

import play from "../../images/play.png";
import pause from "../../images/pause.png";
import mute from "../../images/mute.png";
import volumeImage from "../../images/volume-up.png";

interface Props {
  changeVolume: any;
  volume: number;
  togglePlay: any;
  playing: boolean;
}

const SoundControl: React.FC<Props> = ({
  changeVolume,
  togglePlay,
  volume,
  playing,
}) => {
  return (
    <div className="soundControl">
      <div className="status" onClick={togglePlay}>
        <img src={playing ? pause : play} alt="404" />
      </div>
      <div className="volume">
        <div className="status">
          <img src={volume.toString() === "0" ? mute : volumeImage} alt="404" />
        </div>
        <input type="range" className="volumeSlider" onChange={changeVolume} />
      </div>
    </div>
  );
};

export default SoundControl;
