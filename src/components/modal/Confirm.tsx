import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { usePostPlaylistItems } from "../../queries/hooks";
import { Collection, PlaylistParam, Tracks } from "../../types/types";

const AddContainer = styled.div`
  margin-top: 30px;
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
  /* margin: 0 auto; */
`;

const AddBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <AddButton onClick={onClick}>ADD</AddButton>
);

const ExpandBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick}>
    <FontAwesomeIcon
      icon={faChevronCircleDown}
      style={{ margin: "4px auto" }}
    />
  </button>
);

const ExpandCheckList: React.FC<{ data: Collection }> = ({ data }) => {
  console.log(data);
  return <p>Hello checklist</p>;
};

export const Confirm: React.FC<{ data: Collection }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmData] = useState<Tracks>(data.tracks);
  // const [filtered, setFiltered] = useState<Tracks>([]);

  const mutation = usePostPlaylistItems();
  const { playlistId: id } = useParams<PlaylistParam>();

  if (!data) return null;

  const handleClick = () => setIsOpen(!isOpen);

  const handlePostItems = async () => {
    mutation
      .mutateAsync({ id, tracks: confirmData })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <>
      <AddContainer>
        <p>
          Add {data?.tracks.length} tracks from {data?.playlistInfo.name}?
        </p>
      </AddContainer>
      <div style={{ display: "flex" }}>
        <ExpandBtn onClick={handleClick} />
        <AddBtn onClick={handlePostItems} />
        {isOpen && <ExpandCheckList data={data} />}
      </div>
    </>
  );
};
