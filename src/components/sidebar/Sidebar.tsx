import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { GetAllSpotifyPlaylist } from "../../queries/hooks/GetAllSpotifyPlaylists";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 50px;
  background: #353535;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  span {
    font-size: 1.2rem;
    text-transform: uppercase;
    opacity: 0.8;
    text-align: center;
  }
`;

export const Sidebar = () => {
  const { data: spotifyPlaylists, isLoading: spotifyLoading } =
    GetAllSpotifyPlaylist();
  const { data: playlists, isLoading } = GetAllPlaylists();

  //add sidebar loading placeholder
  if (isLoading || spotifyLoading)
    return (
      <SidebarWrapper>
        <h2>Loading...</h2>
      </SidebarWrapper>
    );

  return (
    <SidebarWrapper>
      <span>Spotify Playlists</span>
      <SidebarCollection data={spotifyPlaylists} />
      <span>Plaaaylist</span>
      <SidebarCollection data={playlists} />
      <AddPlaylistForm />
    </SidebarWrapper>
  );
};
