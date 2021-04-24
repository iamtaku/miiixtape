import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const LoginBtn = styled.a`
  margin: 16px;
  border: 2px solid var(--primary);
  border-radius: 24px;
  padding: 8px 16px;
`;

export const LoginButton: React.FC = ({ children }) => {
  const URL = "http://localhost:3000/api/v1/auth";

  return <LoginBtn href={URL}>{children}</LoginBtn>;
};
