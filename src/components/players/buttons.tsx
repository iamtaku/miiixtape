import styled from "styled-components";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import { IoShuffle, IoRepeat } from "react-icons/io5";
import { useGlobalContext } from "../../state/context";

const Btn = styled.button`
  background: none;
  color: var(--secondary);
  border: none;
  margin: 0 15px;

  &:hover {
    color: var(--accent);
  }
`;

const Queue = () => {
  return (
    <Btn>
      <BsMusicNoteList />
    </Btn>
  );
};
const Shuffle = () => {
  return (
    <Btn>
      <IoShuffle />
    </Btn>
  );
};

const Repeat = () => {
  return (
    <Btn>
      <IoRepeat />
    </Btn>
  );
};

const Next: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Btn onClick={onClick}>
      <FaForward />
    </Btn>
  );
};

const Back: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Btn onClick={onClick}>
      <FaBackward />
    </Btn>
  );
};

const PlayPause: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { state } = useGlobalContext();

  return (
    <Btn onClick={onClick} style={{ fontSize: "1.5rem" }}>
      {state.player.isPlaying ? <FaPause /> : <FaPlay />}
    </Btn>
  );
};

export { Queue, Shuffle, Repeat, Next, Back, PlayPause };
