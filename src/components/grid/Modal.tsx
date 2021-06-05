import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import {
  useGetAllPlaylists,
  usePostPlaylistItems,
} from "../../queries/hooks/plaaaylist";
import { Tracks } from "../../types/types";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 120px;
  left: -30%;
  background-color: var(--gray);
  border-radius: 25px;
  padding: 16px 24px;
  background: #353535;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  h3 {
    margin: 4px 0;
  }

  li {
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: var(--accent);
      opacity: 0.8;
      border-radius: 4px;
    }
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  tracks: Tracks;
}

export const Modal: React.FC<ModalProps> = ({ setIsModalOpen, tracks }) => {
  const { data: playlists } = useGetAllPlaylists();
  const mutation = usePostPlaylistItems();
  const handleClick = (id: string) => {
    mutation.mutate({ id, tracks });
    setIsModalOpen(false);
  };
  return (
    <ModalWrapper>
      <h3>Select a Playlist</h3>
      <ul>
        {playlists &&
          playlists.map((item) => {
            return (
              <li
                key={item.playlistInfo.id}
                onClick={() => handleClick(item.playlistInfo.id)}
              >
                <p>{item.playlistInfo.name}</p>
              </li>
            );
          })}
      </ul>
    </ModalWrapper>
  );
};
