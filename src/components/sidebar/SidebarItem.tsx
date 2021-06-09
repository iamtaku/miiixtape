import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { Playlist } from "../../types/types";
import { PlaybackButton } from "./PlaybackButton";

interface SideBarItemProps {
  playlist: Playlist;
}

const Item = styled.li<{ isActive: boolean; isPlaying: boolean }>`
  display: flex;
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
`;

export const SidebarItem: React.FC<SideBarItemProps> = ({ playlist }) => {
  const { pathname } = useLocation();
  const { state } = useGlobalContext();
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (
      state.player.currentPlaylist.playlistInfo.id ===
        playlist.playlistInfo.id &&
      state.player.isPlaying
    ) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [state, playlist.playlistInfo.id]);

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
      <PlaybackButton
        playlist={playlist}
        isActive={isActive || isPlaying}
        isPlaying={isPlaying}
      />
      <Link
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        {playlist.playlistInfo.name}
      </Link>
    </Item>
  );
};
