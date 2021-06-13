import React from "react";
import styled from "styled-components";
import { Collection, Service } from "../../../types/types";
import { Description } from "./Description";
import DefaultMusicImage from "../../..//assets/music-cover.png";
import { Buttons } from "./Buttons";

const Container = styled.div`
  grid-area: top;
  display: grid;
  max-width: 1440px;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100%;
  grid-column-gap: 8px;
  align-items: center;
  padding: 24px;
  border-radius: 50px;
  background: #353535;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const CoverImg = styled.img`
  justify-self: center;
  max-width: 100%;
  max-height: 100%;
  background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
`;

interface PropTypes {
  data?: Collection;
  isLoading: boolean;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, isLoading }) => {
  //add loading placeholder...
  if (!data || isLoading) return <h1>loading...</h1>;

  //clean this up
  const servicesSet = new Set<Service>();
  data.tracks?.forEach((track) => servicesSet.add(track.service));
  const services = Array.from(servicesSet);

  return (
    <Container>
      <CoverImg
        src={data.playlistInfo.img || DefaultMusicImage}
        alt={data.playlistInfo.description}
      />
      <Description data={data} services={services} />
      <Buttons data={data} />
    </Container>
  );
};
