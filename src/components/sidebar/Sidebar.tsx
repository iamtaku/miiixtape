import styled from "styled-components";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";
import {
  useGetAllSpotifyPlaylist,
  useGetAllPlaylists,
} from "../../queries/hooks";

const Wrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: transparent;
  opacity: 0.8;
`;

export const Sidebar = () => {
  const { data: spotifyPlaylists, isLoading: spotifyLoading } =
    useGetAllSpotifyPlaylist();
  const { data: playlists, isLoading } = useGetAllPlaylists();

  //add sidebar loading placeholder
  if (isLoading || spotifyLoading)
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <SidebarCollection data={spotifyPlaylists} title={"spotify"} />
      <SidebarCollection data={playlists} title={"plaaaylist"} />
      <AddPlaylistForm />
    </Wrapper>
  );
};
