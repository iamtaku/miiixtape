import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import SpotifyWebPlayer from "react-spotify-web-playback/lib";
import styled from "styled-components";
import { YouTubePlayer } from "youtube-player/dist/types";
import ReactHowler from "react-howler";
import { fetchVolume, useGlobalContext } from "../../state/context";
import {
  useFetchSongCache,
  useGetTrack,
  useGetUser,
} from "../../queries/hooks";
import client from "../../queries/api/spotify/api";
import { convertMilliSecondstoSeconds } from "../../helpers/utils";
import { Seeker } from "./Seeker";
import DefaultMusicImage from "../../assets/music-cover.png";
import { Song } from "../../types/types";
import { Volume } from "./Volume";
import {
  Queue,
  Next,
  Back,
  PlayPause,
  Repeat,
  Shuffle,
  Volume as Mute,
} from "./Buttons";
import { setIcon } from "../Shared";

interface IControlsProps {
  youtube?: YouTubePlayer;
  spotify?: SpotifyWebPlayer;
  soundcloud?: ReactHowler;
}

const Container = styled.div`
  position: sticky;
  top: 0vh;
  display: grid;
  grid-template-rows: 20% 60% 20%;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-areas:
    ". top-middle ."
    "left middle right"
    ". bottom .";
  width: 100%;
  grid-column-gap: 8px;
  max-height: 120px;
  min-height: 120px;
  max-width: 800px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  background-color: rgba(15, 11, 11, 0);
  background-color: linear-gradient(
    270deg,
    rgba(142, 142, 142, 1) 0%,
    rgba(53, 53, 53, 1) 100%
  );
  backdrop-filter: blur(10px) contrast(0.8);
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const PlaybackControlsContainer = styled.div`
  place-self: center;
  display: flex;
  align-items: center;
`;

const Test = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0px;
  border: 1px solid red;
`;

const Middle = styled.div`
  grid-area: middle;
  place-self: center;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 0.6fr 1fr;
  align-items: center;
`;

const Bottom = styled.div`
  grid-area: bottom;
  place-self: center;
  align-self: center;
  width: 100%;
  height: 5px;
  position: relative;
  border-radius: 15px;
  background: var(--light-gray);
  background: linear-gradient(
    270deg,
    rgba(142, 142, 142, 1) 0%,
    rgba(53, 53, 53, 1) 100%
  );
`;

const Right = styled.div`
  place-self: center start;
  grid-area: right;
`;

const TopMiddle = styled.div`
  grid-area: top-middle;
  display: grid;
  grid-template-columns: 1fr 0.6fr 1fr;
  grid-template-areas: "top-left . top-right";
`;

const PlaylistControlsContainer = styled(Middle)`
  grid-area: top-right;
  width: 50%;
  place-self: end end;
  display: flex;
  justify-content: space-between;
`;

const SongServiceContainer = styled.div`
  grid-area: top-left;
  place-self: end start;
`;

const CoverImg = styled.img`
  grid-area: left;
  place-self: center end;
  max-width: 50px;
  max-height: 50px;
  aspect-ratio: 1;
`;

const SongInfo = styled.div`
  place-self: center start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Link = styled(ReactLink)`
  &:hover {
    text-decoration: underline;
  }
`;

const Artists: React.FC<{ song: Song | undefined }> = ({ song }) => {
  if (!song || !song.artists) return null;
  if (!!song.artists && !song?.artists[0].uri) {
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
  if (!song) return null;
  if (!song.album || !song?.album.uri) {
    return <span>{song.name}</span>;
  }
  return (
    <Link to={`/app/album/${song.service}/${song.album.uri}`}>
      <span
        style={{
          fontSize: "1rem",
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {song.name}
      </span>
    </Link>
  );
};

const AlbumCover: React.FC<{ song: Song }> = ({ song }) => {
  const { data } = useGetTrack(song);
  const trackImg = data?.img ? data.img : DefaultMusicImage;
  return <CoverImg src={trackImg} alt={song?.name} />;
};

export const Controls: React.FC<IControlsProps> = ({
  youtube,
  spotify,
  soundcloud,
}) => {
  const { state, dispatch } = useGlobalContext();
  const songCache = useFetchSongCache(state.player?.currentSong?.uri);
  const { data: user } = useGetUser();
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(fetchVolume());
  const [prevVolume, setPrevVolume] = useState(volume);

  useEffect(() => {
    setValue(0);
  }, [state.player.currentSong]);

  useEffect(() => {
    state.player.isFinished && setValue(0);
  }, [state.player.isFinished]);

  useEffect(() => {
    if (state?.player?.currentSong && songCache?.time) {
      setDuration((_prevState) => convertMilliSecondstoSeconds(songCache.time));
      setValue(0);
    }
  }, [state.player.currentSong, songCache]);

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
    dispatch({ type: "IS_LOADING", payload: {} });
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

  const updateVolume = (volume: number) => {
    if (state.player.currentSong?.service === "soundcloud" && soundcloud) {
      soundcloud?.howler.volume(volume / 100);
    }
    if (state.player.currentSong?.service === "spotify" && spotify) {
      user?.access_token && client(user?.access_token).setVolume(volume);
    }
    if (state.player.currentSong?.service === "youtube" && youtube) {
      youtube.setVolume(volume);
    }

    window.localStorage.setItem("volume", volume.toString());
  };

  const onMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      updateVolume(0);
    }

    if (volume === 0) {
      const newVolume = prevVolume || 50;
      setVolume(newVolume);
      updateVolume(newVolume);
    }
  };

  if (!state.player?.currentSong) return null;

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
        <p>{state.player.currentSong.id}</p>
      </Test>
      <AlbumCover song={state.player.currentSong} />
      <Middle>
        <SongInfo>
          <Album song={songCache} />
          <Artists song={songCache} />
        </SongInfo>
        <PlaybackControlsContainer>
          <Back onClick={handlePrevious} />
          <PlayPause onClick={handlePlayPause} />
          <Next onClick={handleNext} />
        </PlaybackControlsContainer>
        <Volume
          updateVolume={updateVolume}
          volume={volume}
          setVolume={setVolume}
        />
      </Middle>
      <TopMiddle>
        <SongServiceContainer>
          {setIcon(state.player.currentSong.service)}
        </SongServiceContainer>
        <PlaylistControlsContainer>
          <Queue />
          <Shuffle />
          <Repeat />
        </PlaylistControlsContainer>
      </TopMiddle>
      <Right>
        <Mute onClick={onMute} volume={volume} />
      </Right>
      <Bottom>
        <Seeker updateSeek={updateSeek} duration={duration} value={value} />
      </Bottom>
    </Container>
  );
};
