import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useGlobalContext } from "../../state/context";

interface YoutubeProps {
  id?: string | false;
  play: boolean;
  setYoutube: Dispatch<SetStateAction<any>>;
}

export const Youtube: React.FC<YoutubeProps> = ({ id, play, setYoutube }) => {
  const { dispatch } = useGlobalContext();

  const handleOnReady = (event: any) => {
    console.log("read!", event);
    setYoutube(event.target);
    // !play && event.target.pauseVideo();
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

  const handleOnPause = () => dispatch({ type: "PAUSE_CURRENT", payload: {} });
  const handleOnPlay = () => dispatch({ type: "PLAY", payload: {} });
  return (
    <div>
      this is the youtube player
      {id && (
        <YouTube
          videoId={id}
          onReady={handleOnReady}
          opts={opts}
          onEnd={handleOnEnd}
          onPause={handleOnPause}
          onPlay={handleOnPlay}
        />
      )}
    </div>
  );
};
