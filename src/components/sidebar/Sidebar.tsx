import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../../queries/hooks/GetAllSpotifyPlaylists";
import { GetSinglePlaylist } from "../../queries/hooks/GetSinglePlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PostPlaylist } from "../../queries/hooks/PostPlaylist";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  background-color: var(--gray);
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 1.2rem;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;

const PlaylistItem = styled.div`
  width: 100%;
  a {
    overflow: hidden;
  }
`;

const AddPlaylistButton = styled.button`
  border: 1px solid var(--accent);
  border-radius: 8px;
  width: 60px;
  margin: 0 auto;
  background: transparent;
  color: var(--accent);
`;

const AddPlaylistInput = styled.input`
  border: none;
  background: transparent;
  color: var(--secondary);
  outline: none;
  border-bottom: 1px solid var(--accent);
  padding: 4px;
  outline-color: var(--accent);
`;

export const Sidebar = () => {
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist();
  const { data: playlists, isLoading, error } = GetAllPlaylists();
  const [input, setInput] = useState("");
  const [isNewOpen, setIsNewOpen] = useState(false);

  const mutation = PostPlaylist();

  const handleClick = (id: string) => {
    console.log(id);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(input);
    setInput("");
  };

  const handleBlur = () => {
    setInput("");
    setIsNewOpen(false);
  };
  return (
    <SidebarWrapper>
      <span>Spotify Playlists</span>
      {spotifyPlaylists?.items.map((item) => {
        return (
          <PlaylistItem key={item.id}>
            <Link to={`/app/playlist/spotify/${item.id}`}>{item.name}</Link>
          </PlaylistItem>
        );
      })}
      <span>Playlists</span>
      {playlists?.map((item) => (
        <PlaylistItem key={item.playlistInfo.id}>
          <Link to={`/app/playlist/plaaaylist/${item.playlistInfo.id}`}>
            {item.playlistInfo.name}
          </Link>
        </PlaylistItem>
      ))}
      {isNewOpen ? (
        <form onSubmit={handleSubmit}>
          <AddPlaylistInput
            type="text"
            value={input}
            autoFocus={true}
            onBlur={handleBlur}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Create a new plaaaylist"
          />
        </form>
      ) : (
        <AddPlaylistButton onClick={() => setIsNewOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddPlaylistButton>
      )}
    </SidebarWrapper>
  );
};
