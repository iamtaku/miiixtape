import React from "react";
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Collection } from "../../types/types";
import { Track } from "./Track";
import { ItemContainer as ItemC } from "./Shared";
import { useGlobalContext, InitialStateType } from "../../state/context";
import { Top } from "./Top";

interface IGridProps {
  data?: Collection;
  isLoading: boolean;
  isError: boolean;
}

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div``;

const ItemContainer = styled(ItemC)`
  opacity: 0.8;
`;

const Item = styled.span<{ isRight?: boolean }>`
  display: flex;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: uppercase;
  justify-content: ${(props) => (props.isRight ? "flex-end" : "default")};

  a:hover {
    text-decoration: underline;
  }
`;

const DroppableWrapper = styled.div`
  /* max-height: 100vh; */
  overflow: hidden;
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-gray);
  }
`;

const ScrollContainer = styled.div`
  overflow: hidden;
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
    };
  }
  return styles;
};

export const Bottom: React.FC<IGridProps> = ({ data, isLoading, isError }) => {
  const { state } = useGlobalContext();
  if (isError) {
    return <p>error</p>;
  }
  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="main">
      <Top data={data} isLoading={isLoading} />
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
      <DroppableWrapper>
        <Droppable
          droppableId={`${data.playlistInfo.id}-tracks`}
          isDropDisabled={state.ui.disabledSection === "TRACKS"}
        >
          {(provided, snapshot) => (
            <Wrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(provided, snapshot, state)}
            >
              <ScrollContainer>
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
                        style={{ width: "100%" }}
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
              </ScrollContainer>
            </Wrapper>
          )}
        </Droppable>
      </DroppableWrapper>
    </Container>
  );
};
