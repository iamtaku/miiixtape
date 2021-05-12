import React from "react";
import { useGlobalContext } from "../../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";

interface ControlsProps {
  youtube: any;
  spotify?: SpotifyWebPlayer;
}

const ControllerWrapper = styled.div`
  border: solid 1px red;
  display: flex;
  justify-content: space-around;
`;

export const Controls: React.FC<ControlsProps> = ({ youtube }) => {
  const { state, dispatch } = useGlobalContext();

  const handlePause = () => dispatch({ type: "PAUSE_CURRENT", payload: {} });
  const handlePlay = () => {
    dispatch({ type: "PLAY", payload: {} });
    youtube &&
    state.player.isPlaying &&
    state.player.currentService === "youtube"
      ? youtube?.pauseVideo()
      : youtube?.playVideo();
  };

  const handlePlayPause = () => {
    if (state.player.isPlaying) {
      handlePause();
    }
    handlePlay();
  };
  return (
    <ControllerWrapper>
      <h2>these are the controlls </h2>
      <button onClick={handlePlayPause}>
        {state.player.isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
    </ControllerWrapper>
  );
};
