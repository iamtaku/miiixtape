import styled from "styled-components";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import { IoShuffle, IoRepeat } from "react-icons/io5";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { useGlobalContext } from "../../state/context";
import React from "react";

const Btn = styled.button`
  background: none;
  color: var(--secondary);
  border: none;
  margin-left: 30px;
  display: block;
  &:hover {
    color: var(--accent);
  }

  svg {
    display: block;
  }
`;

export const Queue = () => {
  return (
    <Btn style={{ marginLeft: "0px" }}>
      <BsMusicNoteList />
    </Btn>
  );
};
export const Shuffle = () => {
  return (
    <Btn>
      <IoShuffle />
    </Btn>
  );
};

export const Repeat = () => {
  return (
    <Btn>
      <IoRepeat />
    </Btn>
  );
};

export const Next: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Btn onClick={onClick}>
      <FaForward />
    </Btn>
  );
};

export const Back: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Btn onClick={onClick} style={{ marginLeft: "0px" }}>
      <FaBackward />
    </Btn>
  );
};

export const PlayPause: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { state } = useGlobalContext();

  return (
    <Btn onClick={onClick} style={{ fontSize: "1.5rem" }}>
      {state.player.isPlaying ? <FaPause /> : <FaPlay />}
    </Btn>
  );
};

export const Volume: React.FC<{ onClick: () => void; volume: number }> = ({
  onClick,
  volume,
}) => {
  return (
    <Btn style={{ marginLeft: "15px", display: "block" }} onClick={onClick}>
      {volume === 0 ? (
        <BiVolumeMute style={{ color: "var(--accent" }} />
      ) : (
        <BiVolumeFull />
      )}
    </Btn>
  );
};
