import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useGlobalContext } from "../../state/context";

interface YoutubeProps {
  play: boolean;
  setYoutube: Dispatch<SetStateAction<any>>;
}

export const Youtube: React.FC<YoutubeProps> = ({ play, setYoutube }) => {
  const { dispatch, state } = useGlobalContext();

  const handleOnReady = (event: any) => {
    setYoutube(event.target);
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1 as 1,
    },
  };

  const handleOnEnd = (event: any) => {
    console.log("youtubed finished!");
    dispatch({
      type: "PLAY_NEXT",
      payload: {},
    });
  };

  const handleOnPause = (event: any) => {
    console.log(event);
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
    // if (state.player.currentSong?.service === "spotify") {
    //   dispatch({ type: "PLAY", payload: {} });
    // }
  };
  return (
    <div>
      {/* {state.player.currentService === "youtube" &&
        state.player.currentSong?.uri && ( */}
      <YouTube
        videoId={
          state.player.currentService === "youtube"
            ? state.player.currentSong?.uri
            : ""
        }
        onReady={handleOnReady}
        opts={opts}
        onEnd={handleOnEnd}
        onPause={handleOnPause}
        // onPlay={handleOnPlay}
      />
      {/* )} */}
    </div>
  );
};
