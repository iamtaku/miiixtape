import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { PlaylistInfo, Tracks } from "../../types/types";
import { Modal } from "./Modal";
import { PlaylistParam } from "./Playlist";
import DefaultMusicImage from "../../assets/music-cover.png";

const InnerGridTopWrapper = styled.div`
  grid-area: top;
  border: 1px solid var(--light-gray);
  border-radius: 24px;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  img {
    width: 150px;
  }
  h2 {
    text-decoration-color: var(--primary);
  }
`;

const CoverImg = styled.img`
  width: 150px;
`;

interface InnerGridDescriptionProps {
  name: string;
}

const InnerGridDescriptionWrapper = styled.div`
  display: flex;
  border: 1px solid white;
`;

const InnerGridDescription: React.FC<InnerGridDescriptionProps> = ({
  name,
}) => (
  <InnerGridDescriptionWrapper>
    <h2>{name}</h2>
  </InnerGridDescriptionWrapper>
);

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImportButton = styled.button`
  background-color: transparent;
  padding: 8px 24px;
  color: var(--secondary);
  /* border: 1px solid var(--accent); */
  border: none;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  margin-right: 8px;
`;

const PlayButton = styled.button`
  background-color: var(--accent);
  border-radius: 50px;
  padding: 8px 24px;
  color: var(--accent);
  border: none;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
`;

interface PropTypes {
  data?: PlaylistInfo;
  tracks?: Tracks;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, tracks }) => {
  const { dispatch, state } = useGlobalContext();
  const params = useParams<PlaylistParam>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = (id: string, tracks: Tracks) => {
    console.log(tracks);
    dispatch({
      type: "PLAY_PLAYLIST",
      payload: {
        id,
        tracks,
      },
    });
  };

  const handleImport = (tracks: Tracks) => {
    console.log("import this!...", tracks);
    setIsModalOpen(true);
  };
  //close modal if page changes
  useEffect(() => {
    setIsModalOpen(false);
  }, [params]);
  //add loading placeholder...
  if (!data || !tracks) return <h1>loading...</h1>;
  return (
    <InnerGridTopWrapper>
      <CoverImg src={data.img || DefaultMusicImage} alt={data.description} />
      <InnerGridDescription name={data.name} />
      <ButtonWrapper>
        {params.service === "spotify" && (
          <ImportButton onClick={() => setIsModalOpen(!isModalOpen)}>
            IMPORT
          </ImportButton>
        )}
        <PlayButton onClick={() => handlePlay(data.id, tracks)}>
          PLAY
        </PlayButton>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} tracks={tracks} />
        )}
      </ButtonWrapper>
    </InnerGridTopWrapper>
  );
};
