import React from "react";
import styled from "styled-components";
import { Navbar } from "./navbar/Navbar";
import Player from "./players/Player";
import { Sidebar } from "./sidebar/Sidebar";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const LayoutWrapper = styled.div`
  grid-area: main;
  display: grid;
  margin: 0 24px;
  height: 100vh;
  grid-template-rows: 100px 1fr 100px;
  grid-template-columns: 220px 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  grid-template-areas:
    "nav nav"
    "sidebar inner"
    "player player";
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
      <Navbar />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Sidebar />
        {children}
      </DragDropContext>
      <Player />
    </LayoutWrapper>
  );
};
