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
  display: grid;
  grid-template-columns: 0.05fr 1fr;
  grid-template-areas: "button main ";
  height: 40px;
  width: 100%;
  align-content: center;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.isActive ? "var(--light-gray) !important" : "default"};
  border-radius: 16px;
  opacity: 0.8;

  a {
    padding: 4px 8px;
    display: block;
    width: 100%;
    overflow: hidden;
    z-index: 10;
  }

  /* &:hover {
    background-color: var(--light-gray);
  } */
`;

const PlayButton = styled(PlaybackButton)<{
  isActive?: Boolean;
}>`
  grid-area: "button";
  display: ${(props) => (props.isActive ? "show" : "none")};
  background: none;
  border: none;
  min-width: 100%;
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
      <PlayButton data={playlist} isActive={isActive || isCurrent}>
        <FontAwesomeIcon icon={isPlaying && isCurrent ? faPause : faPlay} />
      </PlayButton>
      <Link
        style={{ gridArea: "main" }}
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
      {/* {isPlaying && isCurrent && <PlayingAnimation />} */}
    </Item>
  );
};
