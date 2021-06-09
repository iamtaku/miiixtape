import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  grid-area: inner;
`;
const Error = () => {
  console.error("something gone wrong");
  return (
    <ErrorWrapper>
      <h1>something went wrong....</h1>
      <Link to="/app">Go back Home</Link>
    </ErrorWrapper>
  );
};

export default Error;
