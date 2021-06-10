import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTube, { Options } from "react-youtube";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useGlobalContext } from "../../state/context";

const YoutubeWrapper = styled.div`
  /* display: none; */
  width: 100px;
`;

interface YoutubeProps {
  play: boolean;
  setYoutube: Dispatch<SetStateAction<any>>;
}

interface IYoutubeEvent {
  target: YouTubePlayer;
  data: number;
}

export const Youtube: React.FC<YoutubeProps> = ({ play, setYoutube }) => {
  const { dispatch, state } = useGlobalContext();

  const handleOnReady = ({ target, data }: IYoutubeEvent) => {
    target.seekTo(0, true);
    setYoutube(target);
  };

  const opts: Options = {
    height: "100",
    width: "100",
    playerVars: {
      autoplay: 1 as 1,
      start: 0,
    },
  };

  const handleOnEnd = ({ target, data }: IYoutubeEvent) => {
    console.log("youtubed finished!");
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

  const handleOnPause = ({ target, data }: IYoutubeEvent) => {
    console.log("pausing youtube");
    console.log(target.seekTo(0, true));
    if (!state.player.nextSong || !state.player.previousSong) {
      dispatch({ type: "PAUSE_CURRENT", payload: {} });
    }
  };

  const handleOnStateChange = ({
    target,
    data,
  }: {
    target: YouTubePlayer;
    data: number;
  }) => {
    console.log("handling youtube state change", state.player.currentService);
    if (state.player.currentService !== "youtube") {
      target.seekTo(0, true);
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
        onStateChange={handleOnStateChange}
        // onPlay={handleOnPlay}
      />
      {/* )} */}
    </YoutubeWrapper>
  );
};
