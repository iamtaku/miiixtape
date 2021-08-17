import React from "react";
import styled from "styled-components";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";
import { useGetAllPlaylists } from "../../queries/hooks";
import { Navbar as Nav } from "./nav";
import { isAuthenticated } from "../../helpers/utils";

const Container = styled.div`
  grid-area: sidebar;
  padding: 8px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: var(--lighter-gray);
  overflow: hidden;
`;

const CollectionWrapper = styled.div`
  overflow: hidden auto;
  margin-top: 8px;
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-gray);
  }
`;
const Title = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 12px;
`;

const SidebarCollectionContainer = styled.div`
  overflow: hidden;
`;

export const Sidebar = (): JSX.Element => {
  const { data: playlists, isLoading, error } = useGetAllPlaylists();

  if (!isAuthenticated) {
    return <h2>UnAuthenticated sidebar</h2>;
  }
  if (error) {
    console.log(error.response);
    return <h2>error</h2>;
  }
  if (isLoading)
    return (
      <Container>
        <h2>Loading...</h2>
      </Container>
    );

  return (
    <Container>
      <Nav />
      <AddPlaylistForm />
      <Title>playlists</Title>
      <SidebarCollection data={playlists} />
    </Container>
  );
};
