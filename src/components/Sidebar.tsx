import React from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isTemplateTail } from "typescript";
import { GetPlaylists } from "../queries/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../queries/GetAllSpotifyPlaylists";
import { GetUser } from "../queries/GetUser";
import { useGlobalContext } from "../state/context";

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
  const { data: playlists, isLoading, error } = GetPlaylists();
  // console.log(data);
  //  : playlists data?.forEach((item) => console.log(item.attributes.name));
  const { state, dispatch } = useGlobalContext();
  return (
    <SidebarWrapper>
      <p>
        <span>Spotify Playlists</span>
      </p>
      {spotifyPlaylists?.items.map((item) => {
        return (
          <>
            <Link to={`/app/playlist/spotify/${item.id}`}>{item.name}</Link>;
            <button
              onClick={() =>
                dispatch({
                  type: "PLAY_PLAYLIST",
                })
              }
            >
              Play
            </button>
          </>
        );
      })}
      <p>
        <span>Plaaaylist Playlists</span>
      </p>
      {playlists?.map((item) => (
        <Link to={`/app/playlist/plaaaylist/${item.id}`}>
          {item.attributes.name}
        </Link>
      ))}
    </SidebarWrapper>
  );
};
