import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useGetAllPlaylists, usePostPlaylistItems } from "../../queries/hooks";
import { Tracks } from "../../types/types";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);  

  border-radius: 25px;
  padding: 16px 24px;

   -webkit-backdrop-filter: blur(10px);
  background-color: rgba(15, 11, 11, 0.2);  

  backdrop-filter: blur(10px) contrast(.8);
  display: grid;

`;

export const ModalWrapper = styled.div`
  place-self: center;
  background-color: var(--light-gray);
  width: 90%;
  border-radius: 16px;
  padding: 24px;
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

const Title = styled.h3`
font-size: 3rem;
`;

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  tracks: Tracks;
  id: string;
}

const mapSoundCloudTrackToTrack = (data: any): Tracks => {
  // debugger;
  return [
    {
      id: data.id.toString(),
      name: data.title,
      service: "soundcloud",
      uri: data.id.toString(),
    },
  ];
};

export const Modal: React.FC<ModalProps> = ({ setIsModalOpen, tracks, id }) => {


  

  return (
  <Container>
    <ModalWrapper>
      <Title>Add Tracks</Title>
      <AddByUrl />
      <AddbyExisting tracks={tracks}/>
          </ModalWrapper>
</Container>
  );
};
