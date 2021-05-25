import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Playlist } from "../../types/types";

interface SideBarItemProps {
  playlist: Playlist;
}

const PlaylistItem = styled.li`
  border: 1px solid transparent;
  opacity: 0.8;
  margin: 4px;
  a {
    padding: 4px 8px;
    display: block;
    width: 100%;
    overflow: hidden;
    z-index: 10;
  }
  &:hover {
    border: 1px solid var(--accent);
    border-radius: 4px;
  }
`;

const ActivePlaylistItem = styled(PlaylistItem)`
  background-color: var(--accent);
  opacity: 0.9;
  border-radius: 4px;
`;
export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();

  if (pathname.includes(playlist.playlistInfo.id)) {
    return (
      <ActivePlaylistItem key={playlist.playlistInfo.id}>
        <Link
          to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
        >
          {playlist.playlistInfo.name}
        </Link>
      </ActivePlaylistItem>
    );
  }
  return (
    <PlaylistItem key={playlist.playlistInfo.id}>
      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </PlaylistItem>
  );
};
