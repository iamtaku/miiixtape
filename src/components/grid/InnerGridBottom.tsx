import React from "react";
import styled from "styled-components";
import { Tracks } from "../../types/types";
import { Track } from "./Track";

const InnerGridBottomWrapper = styled.div`
  grid-area: bottom;
`;
interface PropTypes {
  data?: Tracks;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data }) => {
  return (
    <InnerGridBottomWrapper>
      <ul>
        {data?.map((track, index) => (
          <Track track={track} index={index + 1} />
        ))}
      </ul>
    </InnerGridBottomWrapper>
  );
};
