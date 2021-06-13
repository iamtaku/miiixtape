import React from "react";
import { useGlobalContext } from "../../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";
import { useQueryClient } from "react-query";

interface ControlsProps {
  youtube?: YouTubePlayer;
  spotify?: SpotifyWebPlayer;
  soundcloud?: ReactHowler;
}

const Wrapper = styled.div`
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
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("user");

  const handlePause = () => {
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
  };
  const handlePlay = () => {
    dispatch({ type: "PLAY", payload: {} });
  };

  const handlePlayPause = () => {
    debugger;
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
  };

  const handlePrevious = () => {
    dispatch({
      type: "PLAY_PREVIOUS",
      payload: {},
    });
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
