import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: inner;
  display: grid;
  grid-template-areas:
    "top"
    "bottom ";
  grid-template-rows: 20% 80%;
  grid-row-gap: 24px;
`;
export const InnerLayout: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
