import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { device } from "../globalStyle";
import Player from "./players";
import { Sidebar } from "./sidebar";

const LayoutWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: grid;
  overflow: hidden;
  grid-template-rows: 1fr;
  grid-template-columns: 0.6fr 3fr;
  grid-template-areas: "sidebar inner";
  /* margin: 0 8px; */
`;

const InnerLayout = styled.div`
  grid-area: inner;
  overflow: hidden;
  width: 100%;
  padding: 0 8px 8px 8px;
  background-color: var(--primary);
  position: relative;
  @media ${device.laptop} {
    grid-template-rows: 30% 70%;
  }
`;

export const Layout: React.FC = ({ children }) => {
  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    console.log("dragged");
  };

  return (
    <LayoutWrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Sidebar />
        <InnerLayout>
          {children}
          <Player />
        </InnerLayout>
      </DragDropContext>
    </LayoutWrapper>
  );
};
