import React, { useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsCurrentPlaylist } from "../../helpers/hooks";
import { Collection } from "../../types/types";
import { PlaybackButton } from "../Buttons";

interface SideBarItemProps {
  playlist: Collection;
}

const Item = styled.li<{ isActive: Boolean; isPlaying: Boolean }>`
  position: relative;
  padding: 4px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.isActive ? "var(--light-gray) !important" : "default"};
  border-radius: 8px;
  opacity: 0.9;
`;

const StyledLink = styled(Link)`
  width: 100%;
  z-index: 10;
  opacity: 0.7;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const PlayButton = styled(PlaybackButton)<{
  isActive?: Boolean;
}>`
  display: ${(props) => (props.isActive ? "show" : "none")};
  background: none;
  border: none;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: 20px;
  border-radius: 0;
  color: var(--accent);
  z-index: 100;
  &:hover {
    cursor: initial;
    background: none;
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
      <PlayButton data={playlist} isActive={isActive || isCurrent}>
        <FontAwesomeIcon icon={isPlaying && isCurrent ? faPause : faPlay} />
      </PlayButton>
      <StyledLink
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </StyledLink>
    </Item>
  );
};
