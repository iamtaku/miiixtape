import React from "react";
import styled from "styled-components";
import { Collection, Tracks } from "../../types/types";

const AddContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 8px;
  background: none;
  padding: 4px 8px;
`;

export const Confirm: React.FC<{ data: Collection | undefined }> = ({
  data,
}) => {
  console.log(data);

  return (
    <AddContainer>
      <p>
        Add {data?.tracks.length} tracks from {data?.playlistInfo.name}?
      </p>
      <AddButton>ADD </AddButton>
    </AddContainer>
  );
};
