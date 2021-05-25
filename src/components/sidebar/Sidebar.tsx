import React, { useState } from "react";
import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../../queries/hooks/GetAllSpotifyPlaylists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PostPlaylist } from "../../queries/hooks/PostPlaylist";
import { SidebarItem } from "./SidebarItem";
import { SidebarCollection } from "./SidebarCollection";

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

const AddPlaylistButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 60px;
  margin: 0 auto;
  margin-top: 4px;
  background: transparent;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  color: var(--accent);
`;

const AddPlaylistInput = styled.input`
  border: none;
  background: transparent;
  color: var(--secondary);
  outline: none;
  border-bottom: 1px solid var(--accent);
  margin: 4px;
  padding: 4px 8px;
  outline-color: var(--accent);
`;

export const Sidebar = () => {
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist();
  const { data: playlists, isLoading, error } = GetAllPlaylists();
  const [input, setInput] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const mutation = PostPlaylist();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(input);
    setInput("");
  };

  const handleBlur = () => {
    setInput("");
    setIsInputOpen(false);
  };

  return (
    <SidebarWrapper>
      <span>Spotify Playlists</span>
      <SidebarCollection data={spotifyPlaylists} />
      <span>Playlists</span>
      <SidebarCollection data={playlists} />

      {isInputOpen ? (
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
        <AddPlaylistButton onClick={() => setIsInputOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddPlaylistButton>
      )}
    </SidebarWrapper>
  );
};
