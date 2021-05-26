import React from "react";
import styled from "styled-components";
import { Playlist } from "../../../types/types";
import { Track } from "./Track";

const InnerGridBottomWrapper = styled.div`
  grid-area: bottom;
  padding: 24px;
`;
interface PropTypes {
  data?: Playlist;
  isLoading: boolean;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data || data?.tracks?.length === 0) {
    return (
      <InnerGridBottomWrapper>
        <p>No tracks</p>
      </InnerGridBottomWrapper>
    );
  }
  return (
    <InnerGridBottomWrapper>
      <ul>
        {data?.tracks?.map((track, index) => (
          <Track track={track} index={index + 1} />
        ))}
      </ul>
    </InnerGridBottomWrapper>
  );
};
