import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useIsCurrentPlaylist } from "../../helpers/hooks";
import { Collection } from "../../types/types";
import { PlaybackButton } from "../Buttons";
import { FaPlay, FaPause } from "react-icons/fa";

interface SideBarItemProps {
  playlist: Collection;
}

const ListItem: React.FC<{ className?: string }> = ({
  className,
  children,
  ...props
}) => (
  <div {...props} className={className}>
    {children}
  </div>
);

const Item = styled(ListItem)<{ $iscurrent: boolean }>`
  position: relative;
  padding: 4px 12px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.$iscurrent ? "var(--light-gray) !important" : "default"};
  border-radius: 8px;
  opacity: 0.9;
  cursor: default;
  &:hover {
    .playButton {
      display: initial;
    }
  }
`;

const StyledLink = styled(Link)<{ $iscurrent: boolean }>`
  width: 100%;
  z-index: 10;
  opacity: ${(props) => (props.$iscurrent ? "1" : "0.7")};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;

  /* &:hover {
    cursor: default;
  } */
`;

const PlayButton = styled(PlaybackButton)<{
  $isPlaying?: boolean;
}>`
  display: ${(props) => (props.$isPlaying ? "initial" : "none")};
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
    cursor: pointer;
    background: none;
  }
`;

export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(playlist);

  return (
    <Item $iscurrent={pathname.includes(playlist.playlistInfo.id)}>
      <PlayButton data={playlist} $isPlaying={isCurrent} className="playButton">
        {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
      </PlayButton>
      <StyledLink
        $iscurrent={isPlaying}
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </StyledLink>
    </Item>
  );
};
