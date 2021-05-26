import React from "react";
import styled from "styled-components";
import { Song } from "../../../types/types";

interface TrackProps {
  track: Song;
  index: number;
}

const TrackListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light-gray);
  margin: 4px;
  padding: 4px 8px;
`;
export const Track: React.FC<TrackProps> = ({ track, index }) => {
  return (
    <TrackListItem key={track.id}>
      <span>{index}</span>
      <h2>{track.name}</h2>
      <p>{track.service}</p>
    </TrackListItem>
  );
};
