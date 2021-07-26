import {
  faArrowAltCircleDown,
  faArrowDown,
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const AddBtn = () => <AddButton>ADD</AddButton>;

const ExpandBtn = () => (
  <FontAwesomeIcon icon={faChevronCircleDown} style={{ margin: "0 auto" }} />
);

export const Confirm: React.FC<{ data: Collection | undefined }> = ({
  data,
}) => {
  console.log(data);

  if (!data) return null;

  return (
    <>
      <AddContainer>
        <p>
          Add {data?.tracks.length} tracks from {data?.playlistInfo.name}?
        </p>
        <AddBtn />
      </AddContainer>
      <ExpandBtn />
    </>
  );
};
