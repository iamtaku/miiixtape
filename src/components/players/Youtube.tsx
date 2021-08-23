import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import YouTube, { Options } from "react-youtube";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import { useIsCurrentTrack } from "../../helpers/hooks";
import { fetchVolume, useGlobalContext } from "../../state/context";

const YoutubeWrapper = styled.div`
  width: 100px;
  display: none;
`;

interface YoutubeProps {
  setYoutube: Dispatch<SetStateAction<YouTubePlayer | undefined>>;
}

interface IYoutubeEvent {
  target: YouTubePlayer;
  data: number;
}

export const Youtube: React.FC<YoutubeProps> = ({ setYoutube }) => {
  const { dispatch, state } = useGlobalContext();
  const { isPlaying } = useIsCurrentTrack(state.player.currentSong);
  const ref = useRef<YouTube>(null);

  useEffect(() => {
    isPlaying
      ? ref.current?.getInternalPlayer().playVideo()
      : ref.current?.getInternalPlayer().pauseVideo();
  }, [isPlaying]);

  const handleOnReady = ({ target }: IYoutubeEvent) => {
    target.seekTo(0, true);
    target.setVolume(fetchVolume());
    dispatch({ type: "LOADING_FINISH", payload: {} });
    setYoutube(target);
  };

  const handleOnEnd = () => {
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

  const handleOnPause = () => {
    console.log("pausing youtube");
    !isPlaying && dispatch({ type: "PAUSE_CURRENT", payload: {} });
  };

  const handleOnStateChange = ({
    target,
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

  const handleOnError = () => {
    console.error("youtube err");
  };

  const handleOnPlay = () => {
    dispatch({ type: "LOADING_FINISH", payload: {} });
  };

  const opts: Options = {
    height: "100",
    width: "100",
    playerVars: {
      autoplay: 1 as const,
      start: 0,
    },
  };

  return (
    <YoutubeWrapper>
      <YouTube
        videoId={state.player?.currentSong?.uri}
        onReady={handleOnReady}
        opts={opts}
        onEnd={handleOnEnd}
        onPause={handleOnPause}
        onStateChange={handleOnStateChange}
        onError={handleOnError}
        onPlay={handleOnPlay}
        ref={ref}
      />
    </YoutubeWrapper>
  );
};
