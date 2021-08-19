import React from "react";
import styled, { keyframes } from "styled-components";
import { Spotify } from "../../queries/api";
import client from "../../queries/api/spotify/api";
import { useGetAllSpotifyPlaylist, useGetUser } from "../../queries/hooks";
import { Collection, PlaylistInfo } from "../../types/types";
import { List, Item } from "../Shared";

const FetchButton = styled.button`
  visibility: hidden;
  background: none;
  border: 1px solid var(--accent) !important;
  border-radius: 8px;
  color: var(--accent) !important;
  opacity: 1 !important;
  width: auto !important;
  &:hover {
    cursor: pointer;
  }
`;

const slideIn = keyframes`
  from {
    height: 0;
   opacity: 0;
  }

  to {
    height: auto;
    opacity: 1;
  } 
`;

const Wrapper = styled.div`
  animation: ${slideIn} 0.5s both;
`;

export const AddbyExisting: React.FC<{
  handleFetch: (collection: Collection) => void;
}> = ({ handleFetch }) => {
  const { data: spotifyPlaylists, isLoading } = useGetAllSpotifyPlaylist();
  const { data: userInfo } = useGetUser();

  const handleClick = async (playlistInfo: PlaylistInfo) => {
    if (!userInfo) return;
    const playlist = await Spotify.getPlaylist(
      playlistInfo?.id,
      client(userInfo?.access_token)
    );
    handleFetch(playlist);
  };

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Wrapper>
      {spotifyPlaylists && spotifyPlaylists.length > 0 ? (
        <List>
          {spotifyPlaylists.map((playlist) => {
            return (
              <Item key={playlist.playlistInfo.id}>
                <p>{playlist.playlistInfo.name}</p>
                <FetchButton onClick={() => handleClick(playlist.playlistInfo)}>
                  FETCH
                </FetchButton>
              </Item>
            );
          })}
        </List>
      ) : (
        <p style={{ padding: "2px 24px" }}>
          You don&apos;t have any spotify playlists to import
        </p>
      )}
    </Wrapper>
  );
};
