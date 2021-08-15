import React from "react";
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Collection } from "../../../types/types";
import { InnerGridTop } from "../top";
import { Track } from "./Track";
import { ItemContainer as ItemC } from "./Shared";
import { useGlobalContext, InitialStateType } from "../../../state/context";

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
  position: relative;
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

const getListStyle = (
  provided: DroppableProvided,
  snapshot: DroppableStateSnapshot,
  state: InitialStateType
) => {
  let styles: React.CSSProperties = { position: "relative" };
  if (state.ui.disabledSection === "TRACKS") {
    styles = {
      backgroundColor: "rgba(0,0,0,0.9)",
      position: "relative",
      height: "100%",
      width: "100%",
    };
  }
  return styles;
};
export const InnerGridBottom: React.FC<IGridProps> = ({
  data,
  isLoading,
  isError,
}) => {
  const { state } = useGlobalContext();
  if (isError) {
    return <p>error</p>;
  }
  if (isLoading || !data) {
    return <p>Loading...</p>;
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
      <Droppable
        droppableId={`${data.playlistInfo.id}-tracks`}
        isDropDisabled={state.ui.disabledSection === "TRACKS"}
      >
        {(provided, snapshot) => (
          <TrackList
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(provided, snapshot, state)}
          >
            {data?.tracks?.map((track, index) => (
              <Draggable
                key={track.id}
                draggableId={`${track.id}/${track.uri}`}
                index={index}
              >
                {(provided, _snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Track
                      track={track}
                      index={index}
                      isDragDisabled={state.ui.disabledSection === "TRACKS"}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TrackList>
        )}
      </Droppable>
    </Wrapper>
  );
};
