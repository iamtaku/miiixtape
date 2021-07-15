import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../state/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";
import { useGetUser } from "../../queries/hooks";
import client from "../../queries/api/spotify/api";

interface ControlsProps {
  youtube?: YouTubePlayer;
  spotify?: SpotifyWebPlayer;
  soundcloud?: ReactHowler;
  currentDuration: number;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  grid-template-columns: 100%;
  grid-template-areas:
    ". top ."
    "bottom";
  height: 100%;
  width: 50%;
  justify-content: center;
  position: relative;
  min-height: 80px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  /* min-width: 800px; */
  border-radius: 50px;
  z-index: 100;
  background-color: rgba(15, 11, 11, 0.2);
  backdrop-filter: blur(10px) contrast(0.8);

  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const Test = styled.div`
  position: absolute;
  z-index: 1000;
  top: -150px;
  border: 1px solid red;
`;

const Top = styled.div`
  grid-area: "top";
  place-self: center;
  height: 100%;

  button {
    height: 100%;
  }
`;
const Bottom = styled.div`
  grid-area: "bottom";
  place-self: center;
  width: 50%;

  input {
    width: 100%;
  }
`;

export const Controls: React.FC<ControlsProps> = ({
  youtube,
  spotify,
  soundcloud,
  currentDuration,
}) => {
  const { state, dispatch } = useGlobalContext();
  const { data: user } = useGetUser();

  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!state.player.isPlaying) return;
    const interval = setInterval(() => {
      if (value >= duration) {
        setValue(0);
      } else {
        setValue(value + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.player.isPlaying, value, duration]);

  useEffect(() => {
    const getDuration = (): number => {
      if (state.player.currentSong?.service === "soundcloud" && soundcloud) {
        return soundcloud?.howler.duration();
      }

      if (state.player.currentSong?.service === "spotify" && spotify) {
        return spotify?.state.track.durationMs / 1000;
      }

      if (state.player.currentSong?.service === "youtube" && youtube) {
        return youtube.getDuration();
      }
      return 0;
    };

    const currentDuration = getDuration();
    if (state.player.currentSong && currentDuration > 0) {
      setDuration(currentDuration);
    }
  }, [state, soundcloud, spotify, youtube]);

  // we need duration of song so that we can set a seeker

  // update our seeker and then update our actual duration for our song

  const handlePause = () => {
    dispatch({ type: "PAUSE_CURRENT", payload: {} });
  };
  const handlePlay = () => {
    dispatch({ type: "PLAY", payload: {} });
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
  };

  const handlePrevious = () => {
    dispatch({
      type: "PLAY_PREVIOUS",
      payload: {},
    });
  };

  const updateSeek = (seekValue: number) => {
    if (state.player.currentSong?.service === "soundcloud" && soundcloud) {
      soundcloud?.howler.seek(seekValue);
    }

    if (state.player.currentSong?.service === "spotify" && spotify) {
      user?.access_token && client(user?.access_token).seek(seekValue * 1000);
    }

    if (state.player.currentSong?.service === "youtube" && youtube) {
      return youtube.getDuration();
    }
    setValue(seekValue);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    //
    const seekValue = +e.currentTarget.value;
    updateSeek(seekValue);
    console.log(e.currentTarget.value, duration);
  };

  return (
    <Wrapper>
      <Test>
        <p>previous: {state.player.previousSong?.name}</p>
        <p>current: {state.player.currentSong?.name}</p>
        <p>next: {state.player.nextSong?.name}</p>
      </Test>
      <Top>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handlePlayPause}>
          {state.player.isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button onClick={handleNext}>Next</button>
      </Top>
      <Bottom>
        <input
          type="range"
          name="seeker"
          max={duration}
          id=""
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
      </Bottom>
    </Wrapper>
  );
};
