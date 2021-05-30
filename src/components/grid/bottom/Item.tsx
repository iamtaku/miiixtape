import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export const Item: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
