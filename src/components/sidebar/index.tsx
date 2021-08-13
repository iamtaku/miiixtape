import React from "react";
import styled from "styled-components";
import { SidebarCollection } from "./SidebarCollection";
import { AddPlaylistForm } from "./AddPlaylistForm";
import { useGetAllPlaylists } from "../../queries/hooks";
import { Navbar as Nav } from "./nav";
import { isAuthenticated } from "../../helpers/utils";

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
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-gray);
  }
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
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Nav />
      <CollectionWrapper>
        <SidebarCollection data={playlists} title={"playlists"} />
        <AddPlaylistForm />
      </CollectionWrapper>
    </Wrapper>
  );
};
