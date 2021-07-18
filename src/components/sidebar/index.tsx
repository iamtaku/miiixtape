import styled from "styled-components";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";
import {
  useGetAllSpotifyPlaylist,
  useGetAllPlaylists,
} from "../../queries/hooks";
import { Navbar as Nav } from "../navbar";

const Wrapper = styled.div`
  grid-area: sidebar;
  max-width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--lighter-gray);
`;

const CollectionWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 16px;
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-gray);
  }
`;

export const Sidebar = () => {
  // const { data: spotifyPlaylists, isLoading: spotifyLoading } =
  //   useGetAllSpotifyPlaylist();
  const { data: playlists, isLoading, error } = useGetAllPlaylists();

  if (isLoading)
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );

  if (error?.response?.status === 401) {
    return <h2>Unauthenticated sidebar</h2>;
  }

  return (
    <Wrapper>
      <Nav />
      <CollectionWrapper>
        {/* <SidebarCollection data={spotifyPlaylists} title={"spotify"} /> */}
        <SidebarCollection data={playlists} title={"miiixtape"} />
      </CollectionWrapper>
      <AddPlaylistForm />
    </Wrapper>
  );
};
