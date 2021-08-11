import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Collection, Song } from "../../../types/types";
import { PlaybackButton } from "../../Buttons";
import { FaPause, FaPlay } from "react-icons/fa";

const Container = styled.div`
  display: flex;
`;

export const Item: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const TitleAlbumContainer = styled.div`
  overflow: "hidden";
  text-overflow: "ellipsis";
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  &:hover {
    text-decoration: underline;
  }
`;

export const TitleAlbum: React.FC<{ data: Song; isAlbum: boolean }> = ({
  data,
  isAlbum,
}) => {
  return (
    <TitleAlbumContainer>
      <span
        style={{ overflow: "hidden", textOverflow: "ellipsis", flexGrow: 2 }}
      >
        {data.name}
      </span>
      {isAlbum ? null : data.album ? (
        <Item>
          <Link
            to={`/app/album/${data.service}/${data.album.uri}`}
            style={{ fontSize: "0.8rem", opacity: 0.8 }}
          >
            {data.album.name}
          </Link>
        </Item>
      ) : null}
    </TitleAlbumContainer>
  );
};

export const IndexPlayButton: React.FC<{
  index: number;
  isCurrent: boolean;
  data: Collection;
  isPlaying: boolean;
}> = ({ index, isCurrent, data, isPlaying }) => {
  return (
    <>
      <span className="index">{index + 1}</span>
      <PlaybackButton className="play" data={data}>
        {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
      </PlaybackButton>
    </>
  );
};
