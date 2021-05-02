import React from "react";
import styled from "styled-components";

const InnerGridWrapper = styled.div`
  display: grid;
  grid-template-rows: 15% 85%;
  grid-template-areas:
    "top"
    "bottom";
`;

export const InnerGridLayout: React.FC = ({ children }) => {
  return <InnerGridWrapper>{children}</InnerGridWrapper>;
};
