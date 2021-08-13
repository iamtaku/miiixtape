import React from "react";
import styled, { css } from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import { Song } from "../../../types/types";
import { TrackPlaybackButton as PlaybackButton } from "../../Buttons";
import DefaultMusicImage from "../../..//assets/music-cover.png";

export const Item = css<{
  isRight?: boolean;
  isCenter?: boolean;
}>`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-self: ${(props) => (props.isRight ? "flex-end" : "default")};
  justify-self: ${(props) => (props.isCenter ? "center" : "default")};
  a:hover {
    text-decoration: underline;
  }
`;

const Link = styled(ReactLink)`
  ${Item}
`;

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
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          flexGrow: 2,
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        {data.name}
      </span>
      {isAlbum ? null : data.album ? (
        <Link
          to={`/app/album/${data.service}/${data.album.uri}`}
          style={{ fontSize: "0.8rem", opacity: 0.8 }}
        >
          {data.album.name}
        </Link>
      ) : null}
    </TitleAlbumContainer>
  );
};

export const IndexPlayButton: React.FC<{
  index: number;
  isCurrent: boolean;
  data: Song;
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

export const AlbumImage: React.FC<{ data: Song; isAlbum: boolean }> = ({
  data,
  isAlbum,
}) => {
  const trackImg = data?.img ? data.img : DefaultMusicImage;
  return (
    <>
      {isAlbum ? (
        <span>{` `}</span>
      ) : (
        <img
          src={trackImg}
          alt={data.album?.name}
          width="30px"
          height="30px"
          style={{ justifySelf: "center" }}
        />
      )}
    </>
  );
};

const ArtistsContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const Artists: React.FC<{ data: Song }> = ({ data }) => {
  return (
    <ArtistsContainer>
      {data.artists
        ? data.artists?.map((artist, index) => (
            <Link key={index} to={`/app/artist/${data.service}/${artist.uri}`}>
              {index > 0 && ", "}
              {artist.name}
            </Link>
          ))
        : "-"}
    </ArtistsContainer>
  );
};
