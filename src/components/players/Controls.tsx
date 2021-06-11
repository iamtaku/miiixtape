import React from "react";
import { useGlobalContext } from "../../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";

interface ControlsProps {
  youtube?: YouTubePlayer;
  spotify?: SpotifyWebPlayer;
  soundcloud?: ReactHowler;
}

const ControllerWrapper = styled.div`
  border: solid 1px red;
  display: flex;
  justify-content: space-around;
`;

export const Controls: React.FC<ControlsProps> = ({
  youtube,
  spotify,
  soundcloud,
}) => {
  const { state, dispatch } = useGlobalContext();

  const handlePause = () => {
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
    // youtube && youtube.pauseVideo();
  };
  const handlePlay = () => {
    dispatch({ type: "PLAY", payload: {} });
    // youtube && youtube.playVideo();
  };

  const handlePlayPause = () => {
    state.player.isPlaying ? handlePause() : handlePlay();
  };

  const handleNext = () => {
    dispatch({
      type: "SONG_END",
      payload: {},
    });
    dispatch({
      type: "SET_NEXT",
      payload: {},
    });

    state.player.isPlaying &&
      dispatch({
        type: "PLAY",
        payload: {},
      });

    // youtube && youtube.stopVideo();
  };

  const handlePrevious = () => {
    dispatch({
      type: "PLAY_PREVIOUS",
      payload: {},
    });
  };

  return (
    <ControllerWrapper>
      <p>previous: {state.player.previousSong?.name}</p>
      <p>current: {state.player.currentSong?.name}</p>
      <p>next: {state.player.nextSong?.name}</p>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handlePlayPause}>
        {state.player.isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <button onClick={handleNext}>Next</button>
    </ControllerWrapper>
  );
};
