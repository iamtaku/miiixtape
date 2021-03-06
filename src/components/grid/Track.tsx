import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { Song } from "../../types/types";
import { timeConversion } from "../../helpers/utils";
import { useIsCurrentTrack } from "../../helpers/hooks";
import { useGetTrack } from "../../queries/hooks";
import {
  TitleAlbum,
  IndexPlayButton,
  AlbumImage,
  Artists,
  Item as ItemStyling,
} from "./Items";
import { MenuButton, SubMenu } from "./Submenu";
import { ItemContainer } from "./Shared";

interface TrackProps {
  track: Song;
  index: number;
  isDragging?: boolean;
  isGroupedOver?: boolean;
}

const Item = styled.span`
  ${ItemStyling}
`;

const Container = styled(ItemContainer)<{
  isCurrent?: boolean;
}>`
  position: relative;
  display: grid;
  grid-column-gap: 8px;
  padding: 0px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 40px;
  background-color: ${(props) =>
    props.isCurrent ? "var(--dark-accent) !important" : "default"};
  cursor: default;

  .index {
    display: ${(props) => (props.isCurrent ? "none" : "default")};
  }

  .play {
    display: ${(props) => (props.isCurrent ? "default" : "none")};
    color: ${(props) => props.isCurrent && "var(--white)"};
  }

  &:hover {
    background-color: var(--light-gray);
    .index {
      display: none;
    }
    .play {
      display: block;
    }
    .options {
      visibility: initial;
    }

    ${(props) =>
      props.isCurrent &&
      `
    button {
      &:hover {
        color: var(--white);
      }
    }
`}
  }
`;

const Placeholder = () => <h1>Placeholder</h1>;

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const { isPlaying, isCurrent } = useIsCurrentTrack(track);
  const { data } = useGetTrack(track);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log("opening submenu");
  };

  if (!data) return null;

  const handleOnMouseLeave = () => {
    setIsMenuOpen(false);
  };
  return (
    <LazyLoad
      placeholder={<Placeholder />}
      height={40}
      key={index.toString()}
      scrollContainer=".main"
    >
      <Container
        isCurrent={isCurrent}
        onMouseLeave={handleOnMouseLeave}
        isAlbum={isAlbum}
      >
        <IndexPlayButton
          index={index}
          isPlaying={isPlaying}
          isCurrent={isCurrent}
          data={data}
        />
        <AlbumImage data={data} isAlbum={isAlbum} />
        <TitleAlbum data={data} isAlbum={isAlbum} />
        <Artists data={data} />
        {isMenuOpen ? (
          <SubMenu track={data} />
        ) : (
          <Item isRight>{data.time ? timeConversion(data.time) : "-"}</Item>
        )}
        <MenuButton onClick={handleMenuOpen} />
      </Container>
    </LazyLoad>
  );
};
