import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { usePostPlaylist } from "../../queries/hooks";

const Container = styled.div`
  padding: 4px 24px;
  background: var(--gray);
  border-radius: 8px;
  border: 1px solid transparent;
  width: 100%auto;
  box-shadow: 20px 20px 60px #383838, -20px -20px 60px #4c4c4c;
`;

const AddPlaylistButton = styled.button`
  width: 100%;
  height: 100%;
  color: var(--accent);
  background: var(--dark-grey);
  box-shadow: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Input = styled.input`
  color: var(--secondary);
  box-shadow: none;
  border: none;
  color: var(--secondary);
  background: transparent;
  opacity: 0.7;
  width: 100%;
  height: 100%;

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
