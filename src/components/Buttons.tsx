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
