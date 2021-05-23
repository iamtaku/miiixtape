import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { Playlist } from "../../types/types";

const ModalWrapper = styled.div`
  position: absolute;
  top: 0px;
  border: 1px solid var(--accent);
`;

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  playlists?: Playlist[];
}
export const Modal: React.FC<ModalProps> = ({ setIsModalOpen, playlists }) => {
  const [playlist, setPlaylist] = useState<Playlist>();
  console.log(playlists);
  const queryClient = useQueryClient();
  const token = window.localStorage.getItem("token");
  // const mutation = useMutation(playlist => {
  //   return (
  //     axios.post(`${process.env.REACT_APP_BASE_URL}/playlists`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       playlist
  //     }),
  //     {
  //       onSuccess: () => queryClient.invalidateQueries("playlistAll"),
  //     }
  //   );
  // });
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  //   const mutation = useMutation((playlist) =>
  //     axios.post(`${process.env.REACT_APP_BASE_URL}/playlists`, headers, playlist)
  //   );

  const handleClick = (id: string) => {
    console.log("i was clicked : ", id);
  };
  return (
    <ModalWrapper>
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
