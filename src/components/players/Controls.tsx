import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";
import { Link as ReactLink } from "react-router-dom";
import { BsMusicNoteList } from "react-icons/bs";

import { useGlobalContext } from "../../state/context";
import { useGetUser } from "../../queries/hooks";
import client from "../../queries/api/spotify/api";
import { convertMilliSecondstoSeconds } from "../../helpers/utils";
import { Seeker } from "./Seeker";
import DefaultMusicImage from "../../assets/music-cover.png";
import { Artist, Song } from "../../types/types";
import { Volume } from "./Volume";

interface IControlsProps {
  youtube?: YouTubePlayer;
  spotify?: SpotifyWebPlayer;
  soundcloud?: ReactHowler;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  grid-template-areas:
    ". . ."
    "left middle right"
    "bottom bottom bottom";
  grid-template-columns: 1fr 0.2fr 1fr;
  width: 85%;
  /* padding: 0px 16px; */
  min-height: 120px;
  /* max-width: 640px; */
  /* height: 200px; */
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  z-index: 100;
  background-color: rgba(15, 11, 11, 0);
  backdrop-filter: blur(10px) contrast(0.8);
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const Test = styled.div`
  position: absolute;
  z-index: 1000;
  top: -150px;
  border: 1px solid red;
`;

const Middle = styled.div`
  grid-area: middle;
  place-self: center;
`;

const Top = styled.div`
  place-self: center;
  height: 100%;
  display: flex;
  align-items: center;
`;
const Bottom = styled.div`
  grid-area: bottom;
  place-self: center;
  align-self: start;
  z-index: 10000;
  width: 80%;
  position: relative;
  border-radius: 15px;
  background: var(--light-gray);
  background: linear-gradient(
    270deg,
    rgba(142, 142, 142, 1) 0%,
    rgba(53, 53, 53, 1) 100%
  );
`;

const Btn = styled.button`
  background: none;
  color: var(--secondary);
  border: none;
  margin: 0 15px;

  &:hover {
    color: var(--accent);
  }
`;

const CoverImg = styled.img`
  /* place-self: center; */
  flex-grow: 1;
  max-width: 74px;
  max-height: 74px;
  aspect-ratio: 1;
`;

const SongInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Right = styled.div`
  place-self: center;
  grid-area: right;
`;

const Left = styled.div`
  grid-area: left;
  width: 100%auto;
  /* place-self: center; */
  display: flex;
  height: 100%auto;
  align-items: center;
`;

const Link = styled(ReactLink)`
  &:hover {
    text-decoration: underline;
  }
`;

const Artists: React.FC<{ song: Song | undefined }> = ({ song }) => {
  if (!!!song || !!!song.artists) return null;
  if (!!song.artists && !!!song?.artists[0].uri) {
    return <span>{song.artists[0].name}</span>;
  }
  return (
    <Link to={`/app/artist/${song.service}/${song.artists[0].uri}`}>
      <span style={{ fontSize: "0.8rem", fontWeight: "lighter" }}>
        {song.artists[0].name}
      </span>
    </Link>
  );
};

const Album: React.FC<{ song: Song | undefined }> = ({ song }) => {
  if (!!!song) return null;
  if (!!!song.album || !!!song?.album.uri) {
    return <span>{song.name}</span>;
  }
  return (
    <Link to={`/app/album/${song.service}/${song.album.uri}`}>
      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        {song.name}
      </span>
    </Link>
  );
};

const AlbumCover: React.FC<{ song: Song | undefined }> = ({ song }) => {
  if (!!!song) return null;
  return (
    <CoverImg src={song ? song.img : DefaultMusicImage} alt={song?.name} />
  );
};

const Queue = () => {
  return (
    <button>
      <BsMusicNoteList />
    </button>
  );
};

export const Controls: React.FC<IControlsProps> = ({
  youtube,
  spotify,
  soundcloud,
}) => {
  const { state, dispatch } = useGlobalContext();
  const { data: user } = useGetUser();
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    state.player.isFinished && setValue(0);
  }, [state.player.isFinished]);

  useEffect(() => {
    state?.player?.currentSong?.time &&
      setDuration(
        convertMilliSecondstoSeconds(state?.player?.currentSong?.time)
      );
    setValue(0);
  }, [state.player.currentSong]);

  useEffect(() => {
    if (state.player.isLoading || !state.player.isPlaying) return;

    const interval = setInterval(() => {
      if (value >= duration) {
        setValue(0);
      } else {
        setValue(value + 0.3);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [state, value, duration]);

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
      youtube.seekTo(seekValue, true);
    }
    setValue(seekValue);
  };

  return (
    <Container>
      <Test>
        <p>
          {!state.player.isLoading && state.player.isPlaying
            ? "done Loading"
            : null}
        </p>
        <p>{state.player.isPlaying ? "playing" : "pausing"}</p>
        <p>{state.player.isFinished ? "finished" : "not finished"}</p>
      </Test>
      <Left>
        <AlbumCover song={state.player.currentSong} />
        <SongInfo>
          <Album song={state.player.currentSong} />
          <Artists song={state.player.currentSong} />
        </SongInfo>
      </Left>
      <Middle>
        <Top>
          <Btn onClick={handlePrevious}>
            <FaBackward />
          </Btn>
          <Btn onClick={handlePlayPause} style={{ fontSize: "1.5rem" }}>
            {state.player.isPlaying ? <FaPause /> : <FaPlay />}
          </Btn>
          <Btn onClick={handleNext}>
            <FaForward />
          </Btn>
        </Top>
      </Middle>
      <Right>
        <Volume />
        <Queue />
      </Right>
      <Bottom>
        <Seeker updateSeek={updateSeek} duration={duration} value={value} />
      </Bottom>
    </Container>
  );
};
