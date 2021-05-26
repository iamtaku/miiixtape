import React from "react";
import styled from "styled-components";

const InnerGridWrapper = styled.div`
  grid-area: main;
  display: grid;
  margin: 0 24px;
  grid-template-rows: 20% 80%;
  grid-template-areas:
    "top"
    "bottom";
  grid-row-gap: 15px;
`;

export const InnerGridLayout: React.FC = ({ children }) => {
  return <InnerGridWrapper>{children}</InnerGridWrapper>;
};
