import styled from "styled-components";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";
import {
  useGetAllSpotifyPlaylist,
  useGetAllPlaylists,
} from "../../queries/hooks/plaaaylist";

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  /* padding-top: 16px; */
  padding: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border-radius: 50px; */
  /* background: #353535; */
  /* box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d; */
`;

export const Sidebar = () => {
  const { data: spotifyPlaylists, isLoading: spotifyLoading } =
    useGetAllSpotifyPlaylist();
  const { data: playlists, isLoading } = useGetAllPlaylists();

  //add sidebar loading placeholder
  if (isLoading || spotifyLoading)
    return (
      <SidebarWrapper>
        <h2>Loading...</h2>
      </SidebarWrapper>
    );

  return (
    <SidebarWrapper>
      <SidebarCollection data={spotifyPlaylists} title={"spotify"} />
      <SidebarCollection data={playlists} title={"plaaaylist"} />
      <AddPlaylistForm />
    </SidebarWrapper>
  );
};
