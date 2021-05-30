import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Song } from "../../../types/types";
import { TrackImg } from "./TrackImg";
import { timeConversion } from "../../../helpers/timeConversion";
import { Link, useLocation } from "react-router-dom";
import { stripURI } from "../../../helpers/stripURI";

interface TrackProps {
  track: Song;
  index: number;
}

const ItemContainer = styled.li<{ isAlbum?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "15px 50px 2.5fr 1fr 0.5fr 0.5fr"
      : "15px 50px 2fr 1fr 1fr 0.5fr 0.5fr"};
  grid-column-gap: 8px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 40px;

  &:hover {
    background-color: var(--light-gray);
  }
`;

const Item = styled.span<{ isRight?: boolean }>`
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: ${(props) => (props.isRight ? "flex-end" : "default")};

  a:hover {
    text-decoration: underline;
  }
`;

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");

  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided) => (
        <ItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isAlbum={isAlbum}
        >
          {isAlbum ? (
            <>
              <Item isRight>{index + 1}</Item>
              <Item>{` `}</Item>
              <Item>{track.name}</Item>
              <Item>
                {track.artists?.map((artist) => (
                  <span>{artist.name}</span>
                ))}
              </Item>
              <Item isRight>
                {track.time ? timeConversion(track.time) : "-"}
              </Item>
              <Item isRight>{track.service}</Item>
            </>
          ) : (
            <>
              <Item isRight>{index + 1}</Item>
              <TrackImg img={track.img} alt={track.album?.name} />
              <Item>{track.name}</Item>
              <Item>
                {track.artists?.map((artist) => (
                  <span>{artist.name}</span>
                ))}
              </Item>
              <Item>
                {track.album ? (
                  <Link
                    to={`/app/album/${track.service}/${stripURI(
                      track.album.uri
                    )}`}
                  >
                    {track.name}
                  </Link>
                ) : (
                  track.name
                )}
              </Item>
              <Item isRight>
                {track.time ? timeConversion(track.time) : "-"}
              </Item>
              <Item isRight>{track.service}</Item>
            </>
          )}
        </ItemContainer>
      )}
    </Draggable>
  );
};
