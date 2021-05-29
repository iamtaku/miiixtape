import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  grid-area: inner;
`;
export const InnerLayout: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
