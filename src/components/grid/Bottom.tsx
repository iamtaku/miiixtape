import React, { useRef, useState } from "react";
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

const TopWrapper = styled.div<{ isCollapsed: boolean }>`
  box-shadow: ${({ isCollapsed }) =>
    !isCollapsed
      ? "none"
      : "20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;"};
`;

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

export const Bottom: React.FC<IGridProps> = ({ data, isLoading, isError }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { state } = useGlobalContext();

  const handleOnScroll = (e: React.UIEvent<React.ReactNode>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop > 50) {
      setIsCollapsed(true);
    }
    if (target.scrollTop < 100) {
      setIsCollapsed(false);
    }
  };

  if (isError) {
    return <p>error</p>;
  }
  if (isLoading || !data) {
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
      <Droppable
        droppableId={`${data.playlistInfo.id}-tracks`}
        isDropDisabled={state.ui.disabledSection === "TRACKS"}
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
    </Container>
  );
};
