import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";

const YoutubeWrapper = styled.div`
  /* display: none; */
  width: 100px;
`;

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
    height: "100",
    width: "100",
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
    console.log("pausing youtube");
    if (!state.player.nextSong || !state.player.previousSong) {
      dispatch({ type: "PAUSE_CURRENT", payload: {} });
    }
  };

  // const handleOnPlay = () => dispatch({ type: "PLAY", payload: {} });
  return (
    <YoutubeWrapper>
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
    </YoutubeWrapper>
  );
};
