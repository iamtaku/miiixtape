import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Song } from "../../../types/types";
import { TrackImg } from "./TrackImg";
import { timeConversion } from "../../../helpers/timeConversion";

interface TrackProps {
  track: Song;
  index: number;
}

const ItemContainer = styled.li`
  display: grid;
  grid-template-columns: 20px 50px 2fr 1fr 1fr 0.5fr 0.5fr;
  background-color: var(--light-gray);
  margin: 4px;
  padding: 4px 12px;
  align-items: center;
`;

const Item = styled.span<{ isRight?: boolean }>`
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: ${(props) => (props.isRight ? "flex-end" : "default")};
`;

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided) => (
        <ItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Item>{index + 1}</Item>
          <TrackImg img={track.img} alt={track.album?.name} />
          <Item>{track.name}</Item>
          {track.artists?.map((artist) => (
            <Item>{artist.name}</Item>
          ))}
          <Item>{track.album?.name || "-"}</Item>
          <Item isRight>{track.time ? timeConversion(track.time) : "-"}</Item>
          <Item isRight>{track.service}</Item>
        </ItemContainer>
      )}
    </Draggable>
  );
};
