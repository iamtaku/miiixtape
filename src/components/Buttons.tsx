import React from "react";
import styled from "styled-components";
import { Playlist, Song } from "../types/types";
import { useGlobalContext } from "../state/context";
import { getPlaylist } from "../queries/plaaaylist-queries";
import { useGetUser } from "../queries/hooks";
import { useIsCurrentPlaylist, useIsCurrentTrack } from "../helpers/hooks";
import { useQueryClient } from "react-query";

const LoginBtn = styled.a`
  margin: 16px;
  border: 2px solid var(--primary);
  border-radius: 24px;
  padding: 8px 16px;
`;

export const LoginButton: React.FC = ({ children }) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/auth`;

  return <LoginBtn href={URL}>{children}</LoginBtn>;
};

export const BasicButton = styled.button<{
  isPressed?: Boolean;
}>`
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.isPressed
      ? `
background: var(--primary);
box-shadow: inset 20px 20px 60px #2d2d2d,
            inset -20px -20px 60px #3d3d3d; 
  `
      : `
   background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;

  `}

  &:hover {
    cursor: pointer;
    background: linear-gradient(315deg, #303030, #393939);
    box-shadow: -20px -20px 60px #2d2d2d, 20px 20px 60px #3d3d3d;
  }
`;

interface IProps {
  playlist: Playlist;
}

const Button = styled.button`
  border: none;
  background: transparent;
  color: var(--accent);
`;

export const PlaybackButton: React.FC<IProps & { className?: string }> = ({
  playlist,
  children,
  className,
}) => {
  const { data: user } = useGetUser();
  const { dispatch } = useGlobalContext();
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(playlist);
  const queryClient = useQueryClient();

  const handlePlayback = async (playlist: Playlist) => {
    let cache = queryClient.getQueryData<Playlist>([
      "playlist",
      { id: playlist.playlistInfo.id, service: playlist.playlistInfo.service },
    ]);

    if (isCurrent && isPlaying) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }

    if (isCurrent && !isPlaying) {
      dispatch({
        type: "PLAY",
        payload: {},
      });
      return;
    }

    if (!cache) {
      try {
        const params = {
          id: playlist.playlistInfo.id,
          service: playlist.playlistInfo.service,
        };
        cache = await getPlaylist(params, user);
      } catch (err) {
        throw new Error(err);
      }
    }

    dispatch({
      type: "PLAY_PLAYLIST",
      payload: {
        playlist: cache,
      },
    });
  };

  const handleClick = async (playlist: Playlist) => {
    try {
      await handlePlayback(playlist);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={() => handleClick(playlist)} className={className}>
      {children}
    </Button>
  );
};

interface ITrackButtonProps {
  data: Song;
}

export const TrackPlaybackButton: React.FC<
  ITrackButtonProps & { className?: string }
> = ({ data, children, className }) => {
  const { dispatch, state } = useGlobalContext();
  const { isPlaying, playlist } = useIsCurrentTrack(data);

  const handleClick = (track: Song) => {
    if (isPlaying) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }

    if (!playlist) {
      dispatch({
        type: "PLAY_TRACK",
        payload: { track },
      });
      return;
    }

    if (playlist) {
      dispatch({
        type: "SET_TRACK",
        payload: { track },
      });
      return;
    }

    if (!isPlaying) {
      dispatch({
        type: "PLAY",
        payload: {},
      });
      return;
    }
  };
  return (
    <Button onClick={() => handleClick(data)} className={className}>
      {children}
    </Button>
  );
};
