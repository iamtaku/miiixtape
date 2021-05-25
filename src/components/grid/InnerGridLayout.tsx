import React from "react";
import styled from "styled-components";

const InnerGridWrapper = styled.div`
  grid-area: main;
  display: grid;
  margin: 24px;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    "top"
    "bottom";
`;

export const InnerGridLayout: React.FC = ({ children }) => {
  return <InnerGridWrapper>{children}</InnerGridWrapper>;
};
