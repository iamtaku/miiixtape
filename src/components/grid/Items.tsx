import React from "react";
import styled, { css } from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import { TrackPlaybackButton as PlaybackButton } from "../Buttons";
import DefaultMusicImage from "../../assets/music-cover.png";
import { Song } from "../../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

const Index = styled.span`
  margin: 0 auto;
  font-size: 0.8rem;
`;

const Link = styled(ReactLink)`
  ${Item}
`;

const TitleAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  overflow: "hidden";
  text-overflow: "ellipsis";
  &:hover {
    text-decoration: underline;
  }
`;

const TrackTitle = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-block;
`;

export const TitleAlbum: React.FC<{ data: Song; isAlbum: boolean }> = ({
  data,
  isAlbum,
}) => {
  return (
    <TitleAlbumContainer>
      <TrackTitle>{data.name}</TrackTitle>
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
      <Index className="index">{index + 1}</Index>
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
      {isAlbum ? null : (
        <LazyLoadImage
          src={trackImg}
          alt={data.album?.name}
          width="30px"
          height="30px"
          style={{ justifySelf: "center" }}
          effect="blur"
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
