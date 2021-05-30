import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Playlist } from "../../types/types";

interface SideBarItemProps {
  playlist: Playlist;
}

const PlaylistItem = styled.li<{ isActive: boolean }>`
  border: 1px solid;
  border-color: ${(props) =>
    props.isActive ? "var(--accent)" : "transparent"};
  background-color: ${(props) =>
    props.isActive ? "var(--accent)" : "default"};
  border-radius: 4px;
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
export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();

  return (
    <PlaylistItem
      key={playlist.playlistInfo.id}
      isActive={pathname.includes(playlist.playlistInfo.id)}
    >
      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </PlaylistItem>
  );
};
