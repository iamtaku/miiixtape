import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import YouTube, { Options } from "react-youtube";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useIsCurrentTrack } from "../../helpers/hooks";
import { fetchVolume, useGlobalContext } from "../../state/context";
import { Song } from "../../types/types";

const YoutubeWrapper = styled.div`
  width: 100px;
  display: none;
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

export const Youtube: React.FC<YoutubeProps> = ({ track, uri, setYoutube }) => {
  const { dispatch, state } = useGlobalContext();
  const { isPlaying } = useIsCurrentTrack(state.player.currentSong);
  const ref = useRef<YouTube>(null);

  useEffect(() => {
    isPlaying
      ? ref.current?.getInternalPlayer().playVideo()
      : ref.current?.getInternalPlayer().pauseVideo();
  }, [isPlaying]);

  const handleOnReady = ({ target, data }: IYoutubeEvent) => {
    target.seekTo(0, true);
    target.setVolume(fetchVolume());
    dispatch({ type: "LOADING_FINISH", payload: {} });
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
    console.log("pausing youtube");
    !isPlaying && dispatch({ type: "PAUSE_CURRENT", payload: {} });
  };

  const handleOnStateChange = ({
    target,
    data,
  }: {
    target: YouTubePlayer;
    data: number;
  }) => {
    console.log("handling youtube state change", state.player.currentService);
    if (state.player.currentSong?.service !== "youtube") {
      target.seekTo(0, true);
    }

    if (state.player.isPlaying) {
      dispatch({ type: "PLAY", payload: {} });
    }
  };

  const handleOnError = ({ target, data }: IYoutubeEvent) => {
    console.error("youtube err");
  };

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
        videoId={uri}
        onReady={handleOnReady}
        opts={opts}
        onEnd={handleOnEnd}
        onPause={handleOnPause}
        onStateChange={handleOnStateChange}
        onError={handleOnError}
        // onPlay={handleOnPlay}
        ref={ref}
      />
    </YoutubeWrapper>
  );
};
