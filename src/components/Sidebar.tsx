import React from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GetPlaylists } from "../queries/GetAllPlaylist";
import { GetAllSpotifyPlaylist } from "../queries/GetAllSpotifyPlaylist";
import { GetUser } from "../queries/GetUser";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
  span {
    font-size: 1.2rem;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;
export const Sidebar = () => {
  const { data: userInfo } = GetUser();
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist(userInfo);
  const { data, isLoading, error } = GetPlaylists();
  console.log(data);
  data?.forEach((item) => console.log(item.id));
  return (
    <SidebarWrapper>
      <p>
        <span>Spotify Playlists</span>
      </p>
      {spotifyPlaylists?.items.map((item) => {
        return <Link to={`/app/playlist/${item.id}`}>{item.name}</Link>;
      })}
      <p>
        <span>Plaaaylist Playlists</span>
      </p>
    </SidebarWrapper>
  );
};
