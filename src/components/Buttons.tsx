import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Collection, Song } from "../types/types";
import { useGlobalContext } from "../state/context";
import { getPlaylist } from "../queries/api";
import { useGetUser } from "../queries/hooks";
import { useIsCurrentPlaylist, useIsCurrentTrack } from "../helpers/hooks";

const Button = styled.button`
  margin: 0 auto;
  border: none;
  background: transparent;
  color: var(--accent);
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`;

const LoginBtn = styled.a`
  margin: 16px;
  border: 2px solid var(--accent);
  border-radius: 8px;
  padding: 8px 16px;
  text-align: center;
  width: auto;
  max-width: 200px;
  align-self: center;
`;

export const LoginButton: React.FC = () => {
  const URL = `${process.env.REACT_APP_BASE_URL}/auth`;

  return (
    <LoginBtn href={URL}>
      Login with Spotify <FontAwesomeIcon icon={faSpotify} />
    </LoginBtn>
  );
};

export const BasicButton = styled.button<{
  isPressed?: boolean;
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
  data: Collection;
  className?: string;
  children: React.ReactChild;
}

export const PlaybackButton: React.FC<IProps> = ({
  data,
  children,
  className,
}) => {
  const { data: user } = useGetUser();
  const { dispatch } = useGlobalContext();
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(data);
  const queryClient = useQueryClient();

  const handlePlayback = async (data: Collection) => {
    const cache = queryClient.getQueryData<Collection>([
      "collection",
      {
        id: data.playlistInfo.id,
        service: data.playlistInfo.service,
      },
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
          id: data.playlistInfo.id,
          service: data.playlistInfo.service,
        };
        const playlist = await getPlaylist(params, user);
        dispatch({
          type: "PLAY_COLLECTION",
          payload: {
            collection: playlist,
          },
        });
        return;
      } catch (err) {
        throw new Error(err);
      }
    }

    if (cache) {
      dispatch({
        type: "PLAY_COLLECTION",
        payload: {
          collection: cache,
        },
      });
    }
  };

  const handleClick = async (data: Collection) => {
    try {
      await handlePlayback(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BasicButton onClick={() => handleClick(data)} className={className}>
      {children}
    </BasicButton>
  );
};

interface ITrackButtonProps {
  data: Song;
}

export const TrackPlaybackButton: React.FC<
  ITrackButtonProps & { className?: string }
> = ({ data, children, className }) => {
  const { dispatch } = useGlobalContext();
  const { isPlaying } = useIsCurrentTrack(data);

  const handleClick = (track: Song) => {
    if (isPlaying) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
      return;
    }

    if (!data) {
      dispatch({
        type: "PLAY_TRACK",
        payload: { track },
      });
      return;
    }

    if (data) {
      dispatch({
        type: "SET_TRACK",
        payload: { track },
      });
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

LoginButton.propTypes = {
  children: PropTypes.node.isRequired,
};
