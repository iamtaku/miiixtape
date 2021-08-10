import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { Collection, Song, Tracks } from "../../../types/types";
import { InnerGridTop } from "../top";
import { Track, Track as TrackItem } from "./Track";

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

const ItemContainer = styled.li<{ isAlbum?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 50px 2.5fr 1fr 0.5fr 0.2fr "
      : "15px 50px 2fr 1fr 1fr 0.5fr 0.2fr"};
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

const Placeholder = () => <h1>Placeholder</h1>;

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
        <ItemContainer isAlbum>
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
          <Item>Album</Item>
          <Item isRight>Length</Item>
        </ItemContainer>
      )}
      <Droppable droppableId={"tracks"}>
        {(provided) => (
          <TrackList ref={provided.innerRef} {...provided.droppableProps}>
            {data?.tracks?.map((track, index) => (
              <LazyLoad
                placeholder={<Placeholder />}
                height={40}
                scrollContainer={".main"}
              >
                <Track track={track} index={index} key={index.toString()} />
              </LazyLoad>
            ))}
            {provided.placeholder}
          </TrackList>
        )}
      </Droppable>
      {/* <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric
        ) => (
          <TrackItem
            provided={provided}
            isDragging={snapshot.isDragging}
            track={data.tracks[rubric.source.index]}
            style={{ margin: 0 }}
            index={rubric.source.index}
          />
        )}
      >
        {(droppableProvided: DroppableProvided) => (
          <List
            height={500}
            itemCount={data.tracks.length}
            itemSize={100}
            width={300}
            // you will want to use List.outerRef rather than List.innerRef as it has the correct height when the list is unpopulated
            outerRef={droppableProvided.innerRef}
            itemData={data.tracks}
          >
            {Row}
          </List>
        )}
      </Droppable> */}
      {/* </DragDropContext> */}
    </Wrapper>
  );
};
