import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../../queries/hooks/GetAllSpotifyPlaylists";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";

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

export const Sidebar = () => {
  const { data: spotifyPlaylists } = GetAllSpotifyPlaylist();
  const { data: playlists, isLoading, error } = GetAllPlaylists();
  return (
    <SidebarWrapper>
      <span>Spotify Playlists</span>
      <SidebarCollection data={spotifyPlaylists} />
      <span>Playlists</span>
      <SidebarCollection data={playlists} />
      <AddPlaylistForm />
    </SidebarWrapper>
  );
};
