import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  grid-area: main;
`;
export const Error = () => {
  return (
    <ErrorWrapper>
      <h1>something went wrong....</h1>
      <Link to="/app">Go back Home</Link>
    </ErrorWrapper>
  );
};
