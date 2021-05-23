import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { GetAllPlaylists } from "../../queries/hooks/GetAllPlaylists";
import { useGlobalContext } from "../../state/context";
import { PlaylistInfo, Tracks } from "../../types/types";
import { Modal } from "./Modal";
import { PlaylistParam } from "./Playlist";
import DefaultMusicImage from "../../assets/music-cover.png";

const InnerGridTopWrapper = styled.div`
  grid-area: top;
  display: grid;
  grid-template-columns: 20% 60% 20%;
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
`;

const InnerGridDescription: React.FC<InnerGridDescriptionProps> = ({
  name,
}) => (
  // <InnerGridDescriptionWrapper>
  <h2>{name}</h2>
  // </InnerGridDescriptionWrapper>
);

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  position: relative;
`;

interface PropTypes {
  data?: PlaylistInfo;
  tracks?: Tracks;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, tracks }) => {
  const { dispatch, state } = useGlobalContext();
  const { data: playlists } = GetAllPlaylists();
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

    //need to get tracks
    //need the playlist to import to
    //send to playlistItems create endpoint
    //update our tracks in state
  };
  //add loading placeholder...
  if (!data || !tracks) return <h1>loading...</h1>;
  return (
    <InnerGridTopWrapper>
      <CoverImg src={data.img || DefaultMusicImage} alt={data.description} />
      <InnerGridDescription name={data.name} />
      <ButtonWrapper>
        {params.service === "spotify" && (
          <button onClick={() => handleImport(tracks)}>Import</button>
        )}
        <button onClick={() => handlePlay(data.id, tracks)}>Play</button>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} playlists={playlists} />
        )}
      </ButtonWrapper>
    </InnerGridTopWrapper>
  );
};
