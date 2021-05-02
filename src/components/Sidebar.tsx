import React from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
  // const queryClient = useQueryClient();
  // const something = queryClient.getQueryData(["userInfo"])!;
  const { data: userInfo } = GetUser();
  const { data, error, isLoading } = GetAllSpotifyPlaylist(userInfo);
  // console.log(data);
  return (
    <SidebarWrapper>
      <p>
        <span>Spotify Playlists</span>
      </p>
      {data?.items.map((item) => {
        return <Link to={`/app/playlist/${item.id}`}>{item.name}</Link>;
      })}
    </SidebarWrapper>
  );
};
