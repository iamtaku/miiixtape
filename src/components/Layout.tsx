import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { Navbar } from "./navbar/Navbar";
import Player from "./players/Player";
import { Sidebar } from "./sidebar/Sidebar";

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 100px 1fr 100px;
  grid-template-areas:
    "nav"
    "main"
    "player";
`;

const LayoutWrapper = styled.div`
  grid-area: main;
  display: grid;
  /* margin: 0 24px; */
  /* height: 100vh; */
  grid-template-rows: 1fr;
  grid-template-columns: 220px 1fr;
  grid-column-gap: 15px;
  grid-template-areas: "sidebar inner";
`;

export const InnerLayout = styled.div`
  grid-area: inner;
  display: grid;
  grid-template-areas:
    "top"
    "bottom ";
  grid-template-rows: 20% 80%;
  grid-row-gap: 24px;
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
    <Container>
      <Navbar />
      <LayoutWrapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Sidebar />
          {children}
        </DragDropContext>
      </LayoutWrapper>
      <Player />
    </Container>
  );
};
