import React from "react";
import styled from "styled-components";
import { Loading, ModalSection, Error, Success, List, Item } from "./Shared";
import { useGetAllPlaylists, usePostPlaylistItems } from "../../queries/hooks";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";

const FetchButton = styled.button`
  visibility: hidden;
  background: none;
  border: none;
  color: var(--accent) !important;
  opacity: 1 !important;

  &:hover {
    cursor: pointer;
  }
`;

export const AddItemModal = () => {
  const { state } = useGlobalContext();
  const { data, isLoading, error } = useGetAllPlaylists();
  const mutation = usePostPlaylistItems();

  const handleAddPlaylistItem = async (collection: Collection) => {
    if (state.ui.currentTrack) {
      const payload = {
        id: collection.playlistInfo.id,
        tracks: [state.ui.currentTrack],
      };

      mutation
        .mutateAsync(payload)
        .then((data) => console.log("success!", data));
    }
  };

  return (
    <ModalSection
      title={`Select a playlist to add  ${state.ui.currentTrack?.name} `}
    >
      {data && data.length > 0 ? (
        <List>
          {data.map((playlist) => {
            return (
              <Item key={playlist.playlistInfo.id}>
                {playlist.playlistInfo.name}
                {mutation.isLoading && <Loading />}
                {mutation.isError && <Error />}
                {!mutation.isLoading &&
                  !mutation.isError &&
                  !mutation.isSuccess && (
                    <FetchButton
                      onClick={() => handleAddPlaylistItem(playlist)}
                    >
                      ADD
                    </FetchButton>
                  )}
                {mutation.isSuccess && <Success />}
              </Item>
            );
          })}
        </List>
      ) : (
        <p style={{ padding: "2px 24px" }}>
          You don't have any spotify playlists to import
        </p>
      )}
    </ModalSection>
  );
};
