import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Playlist } from "../../../types/types";
import { Track } from "./Track";

const Wrapper = styled.div`
  grid-area: bottom;
  padding: 24px;
  overflow-y: scroll;
`;
interface PropTypes {
  data?: Playlist;
  isLoading: boolean;
}

const TrackList = styled.div`
  padding: 4px;
`;

export const InnerGridBottom: React.FC<PropTypes> = ({ data, isLoading }) => {
  if (isLoading || !data || data.tracks === undefined) {
    return <p>Loading...</p>;
  }
  if (!data || data?.tracks?.length === 0) {
    return (
      <Wrapper>
        <p>No tracks</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Droppable droppableId={"tracks"}>
        {(provided) => (
          <TrackList ref={provided.innerRef} {...provided.droppableProps}>
            {data?.tracks?.map((track, index) => (
              <Track key={track.id} track={track} index={index} />
            ))}
            {provided.placeholder}
          </TrackList>
        )}
      </Droppable>
    </Wrapper>
  );
};
