import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";
import { SidebarItem } from "./SidebarItem";

interface SidebarCollectionProps {
  data?: Collection[];
}

const DroppableWrapperList = styled.ul<{ isCurrent?: boolean }>`
  margin-bottom: 8px;
  overflow: hidden auto;
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-gray);
  }
`;

const ItemContainer = styled.li`
  width: 100%;
`;

const Wrapper = styled.div``;

const ScrollContainer = styled.div``;

export const SidebarCollection: React.FC<SidebarCollectionProps> = ({
  data,
}) => {
  const { state } = useGlobalContext();
  return (
    <DroppableWrapperList>
      <Droppable
        droppableId={"sidebar"}
        isCombineEnabled={state.ui.disabledSection !== "TRACKS"}
      >
        {(provided) => (
          <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
            <ScrollContainer>
              {data?.map((playlist, index) => (
                <Draggable
                  key={playlist.playlistInfo.id}
                  draggableId={`${playlist.playlistInfo.id}/sidebar`}
                  index={index}
                >
                  {(provided, _snapshot) => (
                    <ItemContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SidebarItem
                        playlist={playlist}
                        key={playlist.playlistInfo.id}
                      />
                    </ItemContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ScrollContainer>
          </Wrapper>
        )}
      </Droppable>
    </DroppableWrapperList>
  );
};
