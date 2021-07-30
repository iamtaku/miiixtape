import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { usePostPlaylist } from "../../queries/hooks";
import { BasicButton } from "../Buttons";
import { SearchBarWrapper } from "./nav/SearchBar";
import { FaPlus } from "react-icons/fa";

const AddPlaylistButton = styled.button`
  width: 100%;
  color: var(--accent);
  background: var(--dark-grey);
  box-shadow: none;
  border: none;
`;

const Container = styled.div`
  padding: 2px 0;
  background: var(--primary);
  border-radius: 8px;
`;

const Input = styled.input`
  background: var(--dark-gray);
  color: var(--secondary);
  box-shadow: none;
  border: none;
  color: var(--secondary);
  background: transparent;
  opacity: 0.7;
  width: 100%;
  /* padding: 2px 24px; */

  &::placeholder {
    color: var(--secondary);
  }
  &:focus {
    outline: none;
  }
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
    <Container>
      {isInputOpen ? (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            autoFocus={true}
            onBlur={handleBlur}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Create new "
            style={{
              background: "var(--primary)",
              borderRadius: "8px",
              padding: "2px 24px",
            }}
          />
        </form>
      ) : (
        <AddPlaylistButton onClick={() => setIsInputOpen(true)}>
          <FaPlus />
        </AddPlaylistButton>
      )}
    </Container>
  );
};
