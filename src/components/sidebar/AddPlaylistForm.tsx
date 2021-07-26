import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { usePostPlaylist } from "../../queries/hooks";
import { BasicButton } from "../Buttons";
import { SearchBarWrapper } from "./nav/SearchBar";

const AddPlaylistButton = styled.button`
  width: 100%;
  color: var(--accent);
  background: none;
  box-shadow: none;
  border: none;
  /* padding: 1px; */
`;

export const AddPlaylistForm = () => {
  const mutation = usePostPlaylist();
  const history = useHistory();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      mutation.mutateAsync(input).then((data) => {
        setInput("");
        data && history.push(`/app/playlist/plaaaylist/${data.data.id}`);
      });
    } catch {
      console.error("something went wrong");
    }
  };

  const handleBlur = () => {
    setInput("");
    setIsInputOpen(false);
  };

  return (
    <>
      <SearchBarWrapper>
        {isInputOpen ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              autoFocus={true}
              onBlur={handleBlur}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Create new "
            />
          </form>
        ) : (
          <AddPlaylistButton onClick={() => setIsInputOpen(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </AddPlaylistButton>
        )}
      </SearchBarWrapper>
    </>
  );
};
