import React from "react";
import styled from "styled-components";

const LoginBtn = styled.a`
  margin: 16px;
  border: 2px solid var(--primary);
  border-radius: 24px;
  padding: 8px 16px;
`;

export const LoginButton: React.FC = ({ children }) => {
  const URL = `${process.env.REACT_APP_BASE_URL}/auth`;

  return <LoginBtn href={URL}>{children}</LoginBtn>;
};

export const BasicButton = styled.button`
  padding: 8px 24px;
  border: none;
  border-radius: 50px;
  background: var(--primary);
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  margin-left: 8px;
  min-width: 150px;

  &:hover {
    cursor: pointer;
    background: linear-gradient(315deg, #303030, #393939);
    box-shadow: -20px -20px 60px #2d2d2d, 20px 20px 60px #3d3d3d;
  }
`;
