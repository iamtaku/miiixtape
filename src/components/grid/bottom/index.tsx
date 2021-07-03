import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Collection } from "../../../types/types";
import { Track } from "./Track";

const Wrapper = styled.div`
  position: relative;
  grid-area: bottom;
  min-height: 0;
  overflow-y: scroll;
`;
interface PropTypes {
  data?: Collection;
  isLoading: boolean;
}

const TrackList = styled.div`
  padding: 4px;
`;

const ItemContainer = styled.li<{ isAlbum?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "15px 50px 2.5fr 1fr 0.5fr "
      : "15px 50px 2fr 1fr 1fr 0.5fr 0.5fr"};
  grid-column-gap: 8px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
`;

const Item = styled.span<{ isRight?: boolean }>`
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  justify-content: ${(props) => (props.isRight ? "flex-end" : "default")};

  a:hover {
    text-decoration: underline;
  }
`;

export const InnerGridBottom: React.FC<PropTypes> = ({ data, isLoading }) => {
  if (isLoading || !data) {
    return <p>Loading...</p>;
  }
  if (data?.tracks?.length === 0) {
    return (
      <Wrapper>
        <p>No tracks</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      {data.playlistInfo.type === "album" ? (
        <ItemContainer isAlbum>
          <Item>#</Item>
          {data.playlistInfo.type === "album" && <Item>{` `}</Item>}
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item isRight>Length</Item>
          {/* <Item isRight>Service</Item> */}
        </ItemContainer>
      ) : (
        <ItemContainer>
          <Item isRight>#</Item>
          <Item>{` `}</Item>
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item>Album</Item>
          <Item isRight>Length</Item>
          <Item isRight>URL</Item>
        </ItemContainer>
      )}
      <Droppable droppableId={"tracks"}>
        {(provided) => (
          <TrackList ref={provided.innerRef} {...provided.droppableProps}>
            {data?.tracks?.map((track, index) => (
              <Track key={index.toString()} track={track} index={index} />
            ))}
            {provided.placeholder}
          </TrackList>
        )}
      </Droppable>
    </Wrapper>
  );
};
