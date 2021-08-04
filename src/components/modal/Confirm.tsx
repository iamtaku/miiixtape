import React, { useState } from "react";
import { useParams } from "react-router";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import { usePostPlaylistItems } from "../../queries/hooks";
import { Collection, PlaylistParam, Song, Tracks } from "../../types/types";

const AddContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  border-radius: 8px;
  background: none;
  padding: 4px 8px;
  margin: 8px;
  border: none;
`;

const AddButton = styled(Button)`
  color: var(--accent);
  border: 1px solid var(--accent);
`;

const CancelButton = styled(Button)`
  color: var(--primary);
  border: 1px solid var(--primary);
`;

const ExpandButton = styled(Button)`
  display: flex;
  align-items: center;
  border: 1px solid var(--primary);
  color: var(--primary);
  margin-left: 0px;
`;

const List = styled.ul`
  max-height: 25vh;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray);
  }
`;

const Item = styled.li`
  display: flex;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const Container = styled.div`
  display: flex;
`;

const ChecklistContainer = styled.div`
  padding: 8px;
`;

const SongInfo: React.FC<{ data: Song }> = ({ data }) => {
  return (
    <Container>
      <span>{data.name}</span>
      {data.artists && <span>{data.artists[0].name}</span>}
    </Container>
  );
};

const AddBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <AddButton onClick={onClick}>ADD</AddButton>
);

const ExpandBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <ExpandButton onClick={onClick}>
    <FaChevronDown style={{ marginRight: "8px" }} />
    OPTIONS
  </ExpandButton>
);

const CancelBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <CancelButton onClick={onClick}>CANCEL</CancelButton>
);

const Label = styled.label``;

const ButtonContainer = styled.div`
  display: flex;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExpandCheckList: React.FC<{
  data: Tracks;
  handleOnChange: (position: number) => void;
  handleSelectAll: () => void;
  checked: boolean[];
  selectAll: boolean;
}> = ({ data, handleOnChange, checked, selectAll, handleSelectAll }) => {
  return (
    <ChecklistContainer>
      <Checkbox
        checked={selectAll}
        id="select all"
        onChange={handleSelectAll}
      />
      <label htmlFor="select all">Select All </label>
      <List>
        {data.map((track, index) => (
          <Item key={track.id}>
            <Checkbox
              checked={checked[index]}
              onChange={() => handleOnChange(index)}
            />
            <SongInfo data={track} />
          </Item>
        ))}
      </List>
    </ChecklistContainer>
  );
};

export const Confirm: React.FC<{
  data: Collection;
  handleConfirmClose: () => void;
}> = ({ data, handleConfirmClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<Tracks>(data.tracks);
  const [checked, setChecked] = useState<boolean[]>(
    new Array(data.tracks.length).fill(true)
  );
  const [selectAll, setSelectAll] = useState(true);
  const mutation = usePostPlaylistItems();
  const { playlistId: id } = useParams<PlaylistParam>();

  if (!data) return null;

  const handleClick = () => setIsOpen(!isOpen);

  const handlePostItems = async () => {
    mutation
      .mutateAsync({ id, tracks: filtered })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const handleOnChange = (position: number) => {
    setSelectAll(false);
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedCheckedState);
    const filteredSongs = data.tracks.filter(
      (_item, index) => updatedCheckedState[index]
    );
    setFiltered(filteredSongs);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setChecked(new Array(data.tracks.length).fill(true));
      setFiltered(data.tracks);
    } else {
      setChecked(new Array(data.tracks.length).fill(false));
      setFiltered([]);
    }
  };

  const handleCancel = () => {
    handleConfirmClose();
  };

  return (
    <>
      <AddContainer>
        <p>
          Add {filtered?.length} tracks from {data?.playlistInfo.service}{" "}
          {data.playlistInfo.type} {data?.playlistInfo.name}?
        </p>
      </AddContainer>
      <OptionsContainer>
        <ExpandBtn onClick={handleClick} />
        <ButtonContainer>
          <CancelBtn onClick={handleCancel} />
          <AddBtn onClick={handlePostItems} />
        </ButtonContainer>
      </OptionsContainer>
      {isOpen && (
        <ExpandCheckList
          checked={checked}
          data={data.tracks}
          handleOnChange={handleOnChange}
          handleSelectAll={handleSelectAll}
          selectAll={selectAll}
        />
      )}
    </>
  );
};
