import axios from "axios";
import React, { Dispatch, SetStateAction, useRef } from "react";
import ReactHowler from "react-howler";
import { SoundCloud } from "../../queries/api";
import { useGlobalContext } from "../../state/context";

interface IProps {
  setSoundCloud: Dispatch<SetStateAction<ReactHowler | undefined>>;
  uri?: string;
}
export const Soundcloud: React.FC<IProps> = ({ setSoundCloud, uri }) => {
  const { dispatch, state } = useGlobalContext();
  const ref = useRef<ReactHowler>(null);
  const handleOnLoadError = () => {
    console.error("soundcloud  went wrong");
  };
  const handleOnPlay = () => {
    console.log("playing soundclouds");
    // fetchSpotify();
  };

  const KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;
  const SOUNDCLOUD = `https://api.soundcloud.com`;
  const url =
    "https://soundcloud.com/sancks/gorillaz-on-melancholy-hill-acoustic";

  const pltest = "https://soundcloud.com/iam1000yearsold/sets/swigswag";
  const fetchSpotify = () => {
    SoundCloud.getTrack(url).then((res) => console.log(res));
    axios
      .get(`${SOUNDCLOUD}/resolve?url=${pltest}&client_id=${KEY}`)
      .then((res) => console.log(res));
  };

  const handleEnd = () => {
    console.log("spotify ended");
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
        src={`https://api.soundcloud.com/tracks/${uri}/stream?client_id=${KEY}`}
        playing={state.player.isPlaying}
        onLoadError={handleOnLoadError}
        onPause={handleOnPlay}
        preload={true}
        html5
        ref={ref}
        onEnd={handleEnd}
      />
    </div>
  );
};
