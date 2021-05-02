import styled from "styled-components";

export const LayoutWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  grid-template-areas:
    "nav nav nav nav"
    "sidebar main main main"
    "player player player player";
`;
