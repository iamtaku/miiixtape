import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePostPlaylistItems } from "../../queries/hooks";
import { Collection, Song, Tracks } from "../../types/types";
import { pluralize } from "../../helpers/utils";
import { useGlobalContext } from "../../state/context";
import DefaultMusicImage from "../../assets/music-cover.png";
import { ProfilePlaceholder } from "../placeholders/Placeholder";
import { Success, Error, Loading, List } from "../Shared";

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

  &:disabled {
    cursor: not-allowed;
    color: var(--light-gray);
    border: 1px solid var(--light-gray);
  }
`;

const AddButton = styled(Button)`
  color: var(--accent);
  border: 1px solid var(--accent);
`;

const CancelButton = styled(Button)`
  color: var(--dark-secondary);
  border: 1px solid var(--dark-secondary);
`;

const ExpandButton = styled(Button)`
  display: flex;
  align-items: center;
  color: var(--dark-secondary);
  margin-left: 0px;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 0.05fr 0.1fr 0.85fr;
  grid-column-gap: 8px;
  height: 20px;
  align-items: center;
  margin-bottom: 4px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  place-self: center;
`;

const ChecklistContainer = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: var(--light-gray);
  overflow: hidden;
`;

const Title = styled.span`
  text-overflow: ellipsis;
  overflow-x: hidden;
`;

const SongTitle: React.FC<{ data: Song }> = ({ data }) => {
  return <Title>{data.name}</Title>;
};

const AddBtn: React.FC<{ onClick: () => void; disabled: boolean }> = ({
  onClick,
  disabled,
}) => (
  <AddButton onClick={onClick} disabled={disabled}>
    ADD
  </AddButton>
);

const ExpandBtn: React.FC<{ onClick: () => void; isOpen: boolean }> = ({
  onClick,
  isOpen,
}) => (
  <ExpandButton onClick={onClick}>
    {isOpen ? (
      <FaChevronUp style={{ marginRight: "8px" }} />
    ) : (
      <FaChevronDown style={{ marginRight: "8px" }} />
    )}
    OPTIONS
  </ExpandButton>
);

const CancelBtn: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <CancelButton onClick={onClick}>BACK</CancelButton>
);

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--lighter-gray);
  padding: 4px;
  margin-bottom: 4px;
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
      <CheckboxContainer>
        <Checkbox
          checked={selectAll}
          id="select all"
          onChange={handleSelectAll}
        />
        <label htmlFor="select all" style={{ marginLeft: "8px" }}>
          Select All{" "}
        </label>
      </CheckboxContainer>
      <List>
        {data.map((track, index) => (
          <Item key={track.id}>
            <Checkbox
              checked={checked[index]}
              onChange={() => handleOnChange(index)}
            />
            <LazyLoadImage
              src={track.img ? track.img : DefaultMusicImage}
              alt={track.album?.name}
              style={{ justifySelf: "center" }}
              placeholder={<ProfilePlaceholder />}
              width={"20px"}
              height={"20px"}
            />
            <SongTitle data={track} />
          </Item>
        ))}
      </List>
    </ChecklistContainer>
  );
};

interface IHash {
  [id: string]: Song;
}

const updatedTracks = (updateTracks: Tracks, baseTracks?: Tracks): Tracks => {
  if (!baseTracks) return updateTracks;
  const trackHash = baseTracks.reduce<IHash>((total, current) => {
    return { ...total, [current.id]: current };
  }, {});

  const result = updateTracks.filter(
    (track) => !Object.keys(trackHash).includes(track.id)
  );
  return result;
};

// take in the updated tracks and filter out the items that already exist from our context
//

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
  const { state, dispatch } = useGlobalContext();

  const handleClick = () => setIsOpen(!isOpen);

  const handlePostItems = async () => {
    if (!state.ui.currentModalId) return;
    const mutatePayload = {
      id: state.ui.currentModalId,
      tracks: filtered,
    };
    mutation
      .mutateAsync(mutatePayload)
      .then((data) => {
        updatedTracks(data.tracks, state.player.currentCollection?.tracks);
        dispatch({
          type: "ADD_TO_CURRENT_COLLECTION",
          payload: {
            tracks: updatedTracks(
              data.tracks,
              state.player.currentCollection?.tracks
            ),
          },
        });
      })
      .catch((err) => {
        console.error(err);
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
          Add {pluralize("track", filtered)} from {data?.playlistInfo?.service}{" "}
          {data?.playlistInfo?.type} <em>{data?.playlistInfo?.name}?</em>
        </p>
      </AddContainer>
      <OptionsContainer>
        <ExpandBtn onClick={handleClick} isOpen={isOpen} />
        <ButtonContainer>
          <CancelBtn onClick={handleCancel} />
          {mutation.isLoading && <Loading />}
          {mutation.isError && <Error />}
          {!mutation.isLoading && !mutation.isError && !mutation.isSuccess && (
            <AddBtn
              onClick={handlePostItems}
              disabled={filtered.length === 0}
            />
          )}
          {mutation.isSuccess && <Success />}
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
