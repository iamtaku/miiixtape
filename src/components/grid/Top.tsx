import React from "react";
import styled from "styled-components";
import { Description } from "./Description";
import DefaultMusicImage from "../../assets/music-cover.png";
import { Buttons } from "./Buttons";
import { useHistory } from "react-router-dom";
import { Collection, Song } from "../../types/types";
import { generateServices } from "../../queries/api/miiixtape/mappingHelpers";
import { useFetchCache } from "../../queries/hooks";

const Container = styled.div<{ isCollapsed: boolean }>`
  top: 0px;
  height: ${({ isCollapsed }) => (isCollapsed ? "5vh" : "20vh")};
  display: grid;
  max-width: 1440px;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100%;
  grid-column-gap: 8px;
  padding: ${({ isCollapsed }) =>
    isCollapsed ? "0px 24px" : "8px 24px 24px 24px;"};
  margin-bottom: ${({ isCollapsed }) => (isCollapsed ? "0px" : "22px")};
  box-shadow: ${({ isCollapsed }) =>
    isCollapsed ? "none" : "20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;"};
  z-index: 1000;
  transition: 0.5s ease;

  .description-hideable {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "flex")};
  }

  .title-shrinkable {
    font-size: ${({ isCollapsed }) => isCollapsed && "1.5rem"};
    transition: 0.5s ease;
  }
`;

const CoverImg = styled.img<{ isArtist: boolean }>`
  justify-self: center;
  max-height: 100%;
  border-radius: 8px;
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

type TopProps = {
  data?: Collection;
  isLoading: boolean;
  isCollapsed?: boolean;
};

const Top = React.forwardRef<HTMLDivElement, TopProps>(
  ({ data, isLoading, isCollapsed }, ref) => {
    //add loading placeholder...
    const history = useHistory();
    const isArtist = history.location.pathname.includes("artist");
    const trackCache = useFetchCache<Song>(["song", data?.tracks[0]?.uri]);

    if (!data || isLoading) return <h1>loading...</h1>;

    const services = generateServices(data.tracks);

    return (
      <Container
        ref={ref}
        isCollapsed={isCollapsed !== undefined ? isCollapsed : false}
      >
        <CoverImg
          src={data.playlistInfo.img || trackCache?.img || DefaultMusicImage}
          alt={data.playlistInfo.description}
          isArtist={isArtist}
        />
        <Description data={data} services={services} />
        <Buttons data={data} />
      </Container>
    );
  }
);

Top.displayName = `Top`;

export { Top };
