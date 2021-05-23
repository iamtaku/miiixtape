import styled from "styled-components";

export const LayoutWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  grid-template-columns: 20px 0.3fr 1fr 20px;
  grid-template-areas:
    ". nav nav ."
    ". sidebar main . "
    ". player player .";
`;
