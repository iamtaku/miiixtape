import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Playlist as api } from "../../queries/api";
import {
  useGetSinglePlaylist,
  useGetUser,
} from "../../queries/hooks/plaaaylist";
import { getPlaylist } from "../../queries/plaaaylist-queries";
import { useGlobalContext } from "../../state/context";
import { Playlist } from "../../types/types";

interface SideBarItemProps {
  playlist: Playlist;
}

const Item = styled.li<{ isActive: boolean; isPlaying: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.isActive ? "var(--light-gray) !important" : "default"};
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.isPlaying ? "var(--accent)" : "default")};
  opacity: 0.8;
  margin: 4px;
  padding: 0 8px;
  a {
    padding: 4px 8px;
    display: block;
    width: 100%;
    overflow: hidden;
    z-index: 10;
  }
  &:hover {
    background-color: var(--light-gray);
  }
`;
const PlayButton = styled.button<{ isPlaying?: boolean }>`
  background: none;
  border: none;
  color: var(--white);
  &:hover {
    cursor: pointer;
  }
`;

export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();
  const { state, dispatch } = useGlobalContext();
  const [isActive, setIsActive] = useState(false);
  const { data: user } = useGetUser();

  const isPlaying = () =>
    state.player.currentPlaylist.playlistInfo.id === playlist.playlistInfo.id &&
    state.player.isPlaying;

  const handleClick = async (data: Playlist) => {
    const params = {
      id: playlist.playlistInfo.id,
      service: playlist.playlistInfo.service,
    };
    const fullData = await getPlaylist(params, user);
    isPlaying()
      ? dispatch({ type: "PAUSE_CURRENT", payload: {} })
      : dispatch({
          type: "PLAY_PLAYLIST",
          payload: { playlist: fullData },
        });
  };

  return (
    <Item
      isActive={pathname.includes(playlist.playlistInfo.id)}
      isPlaying={isPlaying()}
      onMouseEnter={(e) => {
        setIsActive(true);
      }}
      onMouseLeave={(e) => {
        setIsActive(false);
      }}
    >
      {isActive && (
        <PlayButton onClick={() => handleClick(playlist)}>
          <FontAwesomeIcon icon={isPlaying() ? faPause : faPlay} />
        </PlayButton>
      )}

      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </Item>
  );
};
