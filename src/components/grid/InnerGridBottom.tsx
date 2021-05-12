import React from "react";
import styled from "styled-components";
import { Tracks } from "../../types/types";

const InnerGridBottomWrapper = styled.div`
  grid-area: "bottom";
  ol {
    list-style: decimal;
  }
`;
interface PropTypes {
  data?: Tracks;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data }) => {
  return (
    <InnerGridBottomWrapper>
      <h2>this is the inner bottom grid</h2>
      <ol>
        {data?.map((track) => (
          <li key={track.id}>
            <h2>{track.name}</h2>
          </li>
        ))}
      </ol>
    </InnerGridBottomWrapper>
  );
};
