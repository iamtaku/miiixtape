import React from "react";
import styled from "styled-components";
import { Playlist, Service } from "../../../types/types";
import { InnerGridDescription } from "./InnerGridDescription";
import DefaultMusicImage from "../../..//assets/music-cover.png";
import { Buttons } from "./Buttons";

const InnerGridTopWrapper = styled.div`
  grid-area: top;
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100%;
  padding: 24px;
  border-radius: 50px;
  background: #353535;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const CoverImg = styled.img`
  justify-self: center;
  max-width: 100%;
  max-height: 100%;
`;

interface PropTypes {
  data?: Playlist;
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
    <InnerGridTopWrapper>
      <CoverImg
        src={data.playlistInfo.img || DefaultMusicImage}
        alt={data.playlistInfo.description}
      />
      <InnerGridDescription data={data} services={services} />
      <Buttons data={data} />
    </InnerGridTopWrapper>
  );
};
