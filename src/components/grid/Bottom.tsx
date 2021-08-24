import React, { useRef, useState } from "react";
import {
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Collection, PlaylistParam } from "../../types/types";
import { Track } from "./Track";
import { ItemContainer as ItemC } from "./Shared";
import { useGlobalContext, InitialStateType } from "../../state/context";
import { Top } from "./Top";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

interface IGridProps {
  data?: Collection;
  isLoading: boolean;
  error: AxiosError<unknown> | null;
}

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 184px;
`;

const ItemContainer = styled(ItemC)`
  opacity: 0.5;
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
const TopWrapper = styled.div<{ isCollapsed: boolean }>`
  box-shadow: ${({ isCollapsed }) =>
    !isCollapsed
      ? "none"
      : "20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;"};
`;

const Span = styled.span`
  margin: "8px";
  &:hover {
    text-decoration: underline;
    cursor: pointer;
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
    };
  }
  return styles;
};

const TitleArtistLength: React.FC<{ isAlbum: boolean }> = ({ isAlbum }) => {
  return (
    <>
      {isAlbum ? (
        <ItemContainer isAlbum>
          <Item style={{ margin: "0 auto" }}>#</Item>
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item isRight>Length</Item>
        </ItemContainer>
      ) : (
        <ItemContainer>
          <Item style={{ margin: "0 auto" }}>#</Item>
          <Item>{` `}</Item>
          <Item>Title</Item>
          <Item>Artist</Item>
          <Item isRight>Length</Item>
        </ItemContainer>
      )}
    </>
  );
};

export const Bottom: React.FC<IGridProps> = ({ data, isLoading }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const { id, service } = useParams<PlaylistParam>();

  const handleOnScroll = (e: React.UIEvent<React.ReactNode>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 50) {
      setIsCollapsed(true);
    }
    if (target.scrollTop < 100) {
      setIsCollapsed(false);
    }
  };

  // if (error && error?.message !== "something gone wrong") {
  //   return <p>error</p>;
  // }
  if (isLoading || !data || !id) {
    return (
      <Container className="main">
        <Top data={data} isLoading={isLoading} />
      </Container>
    );
  }

  return (
    <Container>
      <TopWrapper isCollapsed={isCollapsed}>
        <Top
          data={data}
          isLoading={isLoading}
          ref={ref}
          isCollapsed={isCollapsed}
        />
        <TitleArtistLength isAlbum={data.playlistInfo.type === "album"} />
      </TopWrapper>
      {data.tracks.length > 0 ? (
        <Droppable
          droppableId={`${data.playlistInfo.id}-tracks`}
          isDropDisabled={
            state.ui.disabledSection === "TRACKS" || service !== "plaaaylist"
          }
        >
          {(provided, snapshot) => (
            <Wrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(provided, snapshot, state)}
              onScroll={handleOnScroll}
              className="main"
            >
              {data?.tracks?.map((track, index) => (
                <Draggable
                  key={track.id}
                  draggableId={`${track.id}/${track.uri}`}
                  index={index}
                  isDragDisabled={service !== "plaaaylist"}
                >
                  {(provided, _snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Track track={track} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Wrapper>
          )}
        </Droppable>
      ) : (
        <Span
          onClick={() => {
            dispatch({
              type: "OPEN_MODAL",
              payload: { modalType: "ADD_MODAL", currentModalId: id },
            });
          }}
        >
          There are no tracks yet, add some.
        </Span>
      )}
    </Container>
  );
};
