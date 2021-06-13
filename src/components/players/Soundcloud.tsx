import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
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
  };

  const KEY = process.env.REACT_APP_SOUNDCLOUD_KEY;

  //   const fetchSpotify = () => {
  //     console.log(KEY);
  //     axios
  //       .get(
  //         // `https://api.soundcloud.com/tracks?q=lofi&client_id=e38841b15b2059a39f261df195dfb430&limit=5`

  //         `https://api.soundcloud.com/tracks?q=lofi&client_id=${KEY}&limit=5`
  //         // "https://api.soundcloud.com/tracks?q=lofi"
  //       )
  //       .then((res) => console.log(res));
  //   };

  //   useEffect(() => {
  //     fetchSpotify();
  //   }, []);

  // src="https://api.soundcloud.com/tracks/296201059/stream?client_id=e38841b15b2059a39f261df195dfb430"
  return (
    <div>
      <ReactHowler
        src={`https://api.soundcloud.com/tracks/${uri}/stream?client_id=${KEY}`}
        playing={
          state.player.isPlaying && state.player.currentService === "soundcloud"
        }
        onLoadError={handleOnLoadError}
        onPause={handleOnPlay}
        preload={true}
        html5
        ref={ref}
      />
    </div>
  );
};
