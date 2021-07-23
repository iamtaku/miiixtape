import React from "react";
import styled from "styled-components";
import { Collection } from "../../../types/types";
import { Description } from "./Description";
import DefaultMusicImage from "../../..//assets/music-cover.png";
import { Buttons } from "./Buttons";
import { generateServices } from "../../../queries/api/miiixtape/mappingHelpers";
import { useHistory } from "react-router";

const Container = styled.div`
  height: 20vh;
  display: grid;
  max-width: 1440px;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100%;
  grid-column-gap: 8px;
  padding: 8px 24px 24px 24px;
  margin-bottom: 46px;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  z-index: 1000;
`;

const CoverImg = styled.img<{ isArtist: Boolean }>`
  justify-self: center;
  max-height: 25vh;
  border-radius: 50px;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  ${(props) =>
    props.isArtist
      ? " border-radius: 50%; background-repeat: no-repeat; background-position: center center; background-size: cover;  object-fit: cover;"
      : null}
`;

interface PropTypes {
  data?: Collection;
  isLoading: boolean;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, isLoading }) => {
  //add loading placeholder...
  const history = useHistory();
  const isArtist = history.location.pathname.includes("artist");
  if (!data || isLoading) return <h1>loading...</h1>;

  const services = generateServices(data.tracks);

  return (
    <Container>
      <CoverImg
        src={data.playlistInfo.img || DefaultMusicImage}
        alt={data.playlistInfo.description}
        isArtist={isArtist}
      />
      <Description data={data} services={services} />
      <Buttons data={data} />
    </Container>
  );
};
