import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Collection } from "../../../types/types";
import { InnerGridTop } from "../top";
import { Track, ItemContainer as ItemC } from "./Track";

interface IGridProps {
  data?: Collection;
  isLoading: boolean;
  isError: boolean;
}

const Wrapper = styled.div`
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  overflow-y: scroll;
`;

const TrackList = styled.div`
  padding: 4px;
  position: relative;
  overflow-x: hidden;
`;

const ItemContainer = styled(ItemC)`
  opacity: 0.8;
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

export const InnerGridBottom: React.FC<IGridProps> = ({
  data,
  isLoading,
  isError,
}) => {
  if (isError) {
    return <p>error</p>;
  }
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
    <Wrapper className="main">
      <InnerGridTop data={data} isLoading={isLoading} />
      {data.playlistInfo?.type === "album" ? (
        <ItemContainer>
          <Item>#</Item>
          {data.playlistInfo?.type === "album" && <Item>{` `}</Item>}
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item isRight>Length</Item>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <Item isRight>#</Item>
          <Item>{` `}</Item>
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item isRight>Length</Item>
        </ItemContainer>
      )}
      <Droppable droppableId={"tracks"}>
        {(provided) => (
          <TrackList ref={provided.innerRef} {...provided.droppableProps}>
            {data?.tracks?.map((track, index) => (
              <Track track={track} index={index} key={index.toString()} />
            ))}
            {provided.placeholder}
          </TrackList>
        )}
      </Droppable>
    </Wrapper>
  );
};
