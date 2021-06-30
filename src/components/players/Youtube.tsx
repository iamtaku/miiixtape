import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import YouTube, { Options } from "react-youtube";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useIsCurrentTrack } from "../../helpers/hooks";
import { useGlobalContext } from "../../state/context";
import { Song } from "../../types/types";

const YoutubeWrapper = styled.div`
  /* display: none; */
  width: 100px;
`;

interface YoutubeProps {
  setYoutube: Dispatch<SetStateAction<any>>;
  uri?: string;
  track?: Song;
}

interface IYoutubeEvent {
  target: YouTubePlayer;
  data: number;
}

export const Youtube: React.FC<YoutubeProps> = ({ track, uri }) => {
  const { dispatch, state } = useGlobalContext();
  const [youtube, setYoutube] = useState<YouTubePlayer>();
  const { isPlaying } = useIsCurrentTrack(state.player.currentSong);
  // debugger;
  useEffect(() => {
    isPlaying ? youtube?.playVideo() : youtube?.pauseVideo();
    // debugger;
  }, [isPlaying, youtube]);

  const handleOnReady = ({ target, data }: IYoutubeEvent) => {
    target.seekTo(0, true);
    setYoutube(target);
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
    debugger;
    console.log("pausing youtube");
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
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

  const handleOnError = ({ target, data }: IYoutubeEvent) => {
    console.error("youtube err");
  };

  // const handleOnPlay = () => dispatch({ type: "PLAY", payload: {} });

  const opts: Options = {
    height: "100",
    width: "100",
    playerVars: {
      autoplay: 1 as 1,
      start: 0,
    },
  };

  return (
    <YoutubeWrapper>
      <YouTube
        // videoId={state.player.currentSong ? state.player.currentSong.uri : ""}

        videoId={uri}
        onReady={handleOnReady}
        opts={opts}
        onEnd={handleOnEnd}
        onPause={handleOnPause}
        onStateChange={handleOnStateChange}
        onError={handleOnError}
        // onPlay={handleOnPlay}
      />
    </YoutubeWrapper>
  );
};
