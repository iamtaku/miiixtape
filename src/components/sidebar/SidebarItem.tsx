import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Playlist } from "../../types/types";

interface SideBarItemProps {
  playlist: Playlist;
}

const Item = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
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
export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();

  return (
    <Item
      key={playlist.playlistInfo.id}
      isActive={pathname.includes(playlist.playlistInfo.id)}
    >
      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </Item>
  );
};
