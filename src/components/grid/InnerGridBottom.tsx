import React from "react";
import styled from "styled-components";
import { Playlist } from "../../types/types";

const InnerGridBottomWrapper = styled.div`
  grid-area: "bottom";
`;
interface PropTypes {
  data?: Playlist;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data }) => {
  return (
    <InnerGridBottomWrapper>
      <h2>this is the inner bottom grid</h2>
      {data?.tracks?.map((track) => (
        <h2>{track.name}</h2>
      ))}
    </InnerGridBottomWrapper>
  );
};
