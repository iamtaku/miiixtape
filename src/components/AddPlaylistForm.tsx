import React, { useState } from "react";
import styled from "styled-components";
import { usePostPlaylist } from "../queries/hooks";

const Container = styled.div`
  padding: 4px 10px;
  background: var(--gray);
  border-radius: 8px;
  border: 1px solid transparent;
  width: 100%;
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

interface IAddPlaylistFormProps {
  styles?: React.CSSProperties;
  className?: string;
}

export const AddPlaylistForm: React.FC<IAddPlaylistFormProps> = ({
  children,
  styles,
  className,
}) => {
  const mutation = usePostPlaylist();
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutateAsync(input).then((_data) => {
      setInput("");
      setIsInputOpen(false);
    });
  };

  const handleBlur = () => {
    setInput("");
    setIsInputOpen(false);
  };

  return (
    <Container style={styles} className={className}>
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
          {children}
        </AddPlaylistButton>
      )}
    </Container>
  );
};
