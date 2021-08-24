import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "../AddPlaylistForm";
import { useGetAllPlaylists } from "../../queries/hooks";
import { Navbar as Nav } from "./nav";
import { isAuthenticated } from "../../helpers/utils";
import { Link } from "react-router-dom";

const Container = styled.div`
  grid-area: sidebar;
  min-height: 100vh;
  width: 20vw;
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

const Button = styled(Link)`
  background: none;
  padding: 8px;
  border: none;
  margin: 0 8px;
  border-radius: 8px;
  text-align: center;
`;

export const Sidebar = (): JSX.Element => {
  const { data: playlists, isLoading, error } = useGetAllPlaylists();

  if (!isAuthenticated()) {
    return (
      <Container>
        <Nav />
        <Button
          to={"/login"}
          style={{ border: "1px solid var(--accent", color: "var(--accent)" }}
        >
          Login
        </Button>
      </Container>
    );
  }

  if (error && error?.message !== "something gone wrong") {
    return <p>error</p>;
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
