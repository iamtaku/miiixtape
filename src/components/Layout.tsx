import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { device } from "../globalStyle";
import { Modal } from "./modal";
import Player from "./players";
import { Sidebar } from "./sidebar";
import { DragDropContextWrapper as DragDropContext } from "./DragDropContextWrapper";

const LayoutWrapper = styled.div`
  position: relative;
  display: grid;
  /* height: 100vh; */
  /* width: 100vw; */
  /* overflow: hidden; */
  grid-template-rows: 1fr;
  grid-template-columns: 0.6fr 3fr;
  grid-template-areas: "sidebar inner";
  background-color: var(--primary);
`;

const InnerLayout = styled.div`
  grid-area: inner;
  padding: 4px 8px;
  height: 100vh;
  overflow: hidden;
  /* overflow: scroll; */
  background-color: var(--primary);
  position: relative;
  @media ${device.laptop} {
    grid-template-rows: 30% 70%;
  }
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <DragDropContext>
      <LayoutWrapper>
        <Sidebar />
        <InnerLayout>
          <Modal />
          {children}
          <Player />
        </InnerLayout>
      </LayoutWrapper>
    </DragDropContext>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
