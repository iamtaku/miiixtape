import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { PostPlaylist } from "../../queries/hooks/PostPlaylist";

const AddPlaylistButton = styled.button`
  border: 1px solid transparent;
  width: 100%;
  margin: 0 auto;
  margin-top: 4px;
  background: transparent;
  border-radius: 50px;
  /* background: #353535; */
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  color: var(--accent);
  &:hover {
    border: 1px solid var(--accent);
  }
`;

const AddPlaylistFormWrapper = styled.form`
  input {
    width: 100%;
    border: none;
    background: transparent;
    color: var(--secondary);
    outline: none;
    border-bottom: 1px solid var(--accent);
    margin: 4px;
    padding: 4px 8px;
    outline-color: var(--accent);
  }
`;

export const AddPlaylistForm = () => {
  const mutation = PostPlaylist();

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(input);
    setInput("");
  };

  const handleBlur = () => {
    setInput("");
    setIsInputOpen(false);
  };

  return (
    <>
      {isInputOpen ? (
        <AddPlaylistFormWrapper onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            autoFocus={true}
            onBlur={handleBlur}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Create a new plaaaylist"
          />
        </AddPlaylistFormWrapper>
      ) : (
        <AddPlaylistButton onClick={() => setIsInputOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddPlaylistButton>
      )}
    </>
  );
};
