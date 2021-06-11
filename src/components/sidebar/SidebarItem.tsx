import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useIsCurrentPlaylist } from "../../helpers/hooks";
import { Playlist } from "../../types/types";
import { PlaybackButton } from "../PlaybackButton";

interface SideBarItemProps {
  playlist: Playlist;
}

const Item = styled.li<{ isActive: Boolean; isPlaying: Boolean }>`
  display: flex;
  border: 1px solid transparent;
  border-color: ${(props) =>
    props.isActive ? "var(--light-gray) !important" : "default"};
  border-radius: 4px;
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

const PlayButton = styled(PlaybackButton)<{
  isActive?: Boolean;
}>`
  display: ${(props) => (props.isActive ? "show" : "none")};
  background: none;
  border: none;
  color: var(--accent);
  &:hover {
    cursor: pointer;
  }
`;

export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(playlist);

  return (
    <Item
      isActive={pathname.includes(playlist.playlistInfo.id)}
      isPlaying={isPlaying}
      onMouseEnter={(e) => {
        setIsActive(true);
      }}
      onMouseLeave={(e) => {
        setIsActive(false);
      }}
    >
      <PlayButton playlist={playlist} isActive={isActive || isCurrent}>
        <FontAwesomeIcon icon={isPlaying && isCurrent ? faPause : faPlay} />
      </PlayButton>
      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </Item>
  );
};
