import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";
import { SidebarItem } from "./SidebarItem";

interface SidebarCollectionProps {
  data?: Collection[];
  title: string;
}

const TitleSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const List = styled.ul<{ isCurrent?: boolean }>`
  margin-bottom: 8px;
`;

const Title = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 12px;
`;

const ItemContainer = styled.div`
  width: 100%;
`;

export const SidebarCollection: React.FC<SidebarCollectionProps> = ({
  data,
  title,
}) => {
  const { state } = useGlobalContext();
  return (
    <List>
      <TitleSection>
        <Container>
          <Title>{title}</Title>
        </Container>
      </TitleSection>
      <Droppable
        droppableId={"sidebar"}
        isCombineEnabled={state.ui.disabledSection !== "TRACKS"}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
          </div>
        )}
      </Droppable>
    </List>
  );
};
