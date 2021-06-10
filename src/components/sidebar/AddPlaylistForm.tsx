import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { usePostPlaylist } from "../../queries/hooks";
import { BasicButton } from "../Buttons";

const AddPlaylistButton = styled(BasicButton)`
  width: 100%;
  margin: 0 auto;
  margin-top: 4px;
  color: var(--accent);
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: var(--secondary);
  outline: none;
  border-bottom: 1px solid var(--accent);
  margin: 4px;
  padding: 4px 8px;
  outline-color: var(--accent);
`;

export const AddPlaylistForm = () => {
  const mutation = usePostPlaylist();

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
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            autoFocus={true}
            onBlur={handleBlur}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Create a new plaaaylist"
          />
        </form>
      ) : (
        <AddPlaylistButton onClick={() => setIsInputOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </AddPlaylistButton>
      )}
    </>
  );
};
