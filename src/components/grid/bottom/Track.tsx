import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { Song } from "../../../types/types";
import { timeConversion } from "../../../helpers/utils";
import { useIsCurrentTrack } from "../../../helpers/hooks";
import { useGetTrack } from "../../../queries/hooks";
import { BaseParams } from "../../../queries/types";
import {
  TitleAlbum,
  IndexPlayButton,
  AlbumImage,
  Artists,
  Item as ItemStyling,
} from "./Items";
import { MenuButton, SubMenu2 } from "./Submenu";

interface TrackProps {
  track: Song;
  index: number;
  provided?: DraggableProvided;
  isDragging?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
}

const Item = styled.span`
  ${ItemStyling}
`;

export const ItemContainer = styled.li`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 20px 50px 3.5fr 2fr 0.5fr 0.2fr;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
`;

const Container = styled(ItemContainer)<{ isCurrent?: boolean }>`
  display: grid;
  grid-column-gap: 8px;
  padding: 0px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 40px;

  background-color: ${(props) =>
    props.isCurrent ? "var(--dark-accent) !important" : "default"};

  .index {
    display: ${(props) => (props.isCurrent ? "none" : "default")};
  }

  .play {
    display: ${(props) => (props.isCurrent ? "default" : "none")};
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
  }

  .index {
    margin: 0 auto;
    text-align: center;
  }

  button {
    ${(props) => (props.isCurrent ? "svg {color: var(--white)}" : null)}
  }
`;

const Placeholder = () => <h1>Placeholder</h1>;

export const Track: React.FC<TrackProps> = ({
  track,
  index,
  provided,
  isDragging,
}) => {
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const { isPlaying, isCurrent } = useIsCurrentTrack(track);
  const params = useParams<BaseParams>();
  const { data } = useGetTrack(track, params.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log("opening submenu");
  };

  if (!data) return null;

  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided) => (
        <LazyLoad
          placeholder={<Placeholder />}
          height={40}
          scrollContainer={".main"}
          key={index.toString()}
          // unmountIfInvisible={true}
        >
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isCurrent={isCurrent}
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
              <SubMenu2 track={data} />
            ) : (
              <Item isRight>{data.time ? timeConversion(data.time) : "-"}</Item>
            )}
            <MenuButton track={data} onClick={handleMenuOpen} />
          </Container>
        </LazyLoad>
      )}
    </Draggable>
  );
};
