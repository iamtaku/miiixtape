import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "../AddPlaylistForm";
import { useGetAllPlaylists } from "../../queries/hooks";
import { Navbar as Nav } from "./nav";
import { isAuthenticated } from "../../helpers/utils";

const Container = styled.div`
  grid-area: sidebar;
  position: fixed;
  top: 0;
  min-height: 100vh;
  z-index: 10;
  padding: 8px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: var(--lighter-gray);
`;

const Title = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 12px;
  margin-top: 8px;
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
      <AddPlaylistForm>
        <FaPlus />
      </AddPlaylistForm>
      <Title>playlists</Title>
      <SidebarCollection data={playlists} />
    </Container>
  );
};
