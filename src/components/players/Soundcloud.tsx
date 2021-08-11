import React, { Dispatch, SetStateAction, useRef } from "react";
import ReactHowler from "react-howler";
import { fetchVolume, useGlobalContext } from "../../state/context";
const KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;

interface IProps {
  setSoundCloud: Dispatch<SetStateAction<ReactHowler | undefined>>;
  uri?: string;
}
export const Soundcloud: React.FC<IProps> = ({ setSoundCloud }) => {
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<ReactHowler>(null);

  const handleOnLoadError = () => {
    console.log("soundcloud  went wrong");
  };

  const handleOnPause = () => {
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
  };

  const handleOnPlay = () => dispatch({ type: "LOADING_FINISH", payload: {} });

  const handleOnLoad = () => {
    if (!ref.current) return;
    setSoundCloud(ref.current);
    dispatch({ type: "IS_LOADING", payload: {} });
  };

  const handleEnd = () => {
    console.log("soundcloud ended");
    dispatch({
      type: "SONG_END",
      payload: {},
    });
    dispatch({
      type: "SET_NEXT",
      payload: {},
    });
    dispatch({
      type: "PLAY",
      payload: {},
    });
  };

  return (
    <div>
      <ReactHowler
        src={`https://api.soundcloud.com/tracks/${state.player.currentSong?.uri}/stream?client_id=${KEY}`}
        playing={state.player.isPlaying}
        onLoadError={handleOnLoadError}
        onPause={handleOnPause}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        preload={true}
        html5
        ref={ref}
        onEnd={handleEnd}
        volume={fetchVolume() / 100}
        // onVolume
      />
    </div>
  );
};
