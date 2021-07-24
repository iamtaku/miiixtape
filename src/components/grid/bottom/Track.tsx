import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import { Song } from "../../../types/types";
import { timeConversion } from "../../../helpers/utils";
import { useGlobalContext } from "../../../state/context";
import { TrackPlaybackButton } from "../../Buttons";
import { useIsCurrentTrack } from "../../../helpers/hooks";
import DefaultMusicImage from "../../..//assets/music-cover.png";

interface TrackProps {
  track: Song;
  index: number;
}

const Container = styled.li<{ isAlbum?: Boolean; isCurrent?: Boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 50px 2.5fr 1fr 0.5fr 0.2fr "
      : "20px 50px 2fr 1fr 1fr 0.5fr 0.2fr"};
  grid-column-gap: 8px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 44px;
  background-color: ${(props) =>
    props.isCurrent ? "var(--dark-accent) !important" : "default"};

  .index {
    display: ${(props) => (props.isCurrent ? "none" : "default")};
  }

  &:hover {
    background-color: var(--light-gray);
    .index {
      display: none;
    }
    .play {
      display: block;
    }
    .options {
      display: block;
    }
  }

  .index {
    margin: 0 auto;
    text-align: center;
  }

  button {
    ${(props) => (props.isCurrent ? "svg {color: var(--white)}" : null)}
  }
`;

const Item = styled.span<{
  isRight?: Boolean;
  isCenter?: Boolean;
  isActive?: Boolean;
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

const ExternalLink = styled.a`
  text-align: right;
  justify-self: end;
  width: 16px;
`;

const PlaybackButton = styled(TrackPlaybackButton)<{ isActive?: Boolean }>`
  display: ${(props) => (props.isActive ? "default" : "none")};
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  display: none;
`;

const MenuButton: React.FC<{ track: Song; handleUrlClick: () => void }> = ({
  track,
  handleUrlClick,
}) => {
  return (
    <OptionsButton className="options">
      <FontAwesomeIcon icon={faEllipsisV} />
      {/* <ExternalLink
        href={track.href}
        onClick={handleUrlClick}
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </ExternalLink> */}
    </OptionsButton>
  );
};

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useGlobalContext();

  const isAlbum = location.pathname.includes("album");
  const { isPlaying, isCurrent } = useIsCurrentTrack(track);

  const handleUrlClick = () => {
    if (isPlaying && isCurrent) {
      dispatch({
        type: "PAUSE_CURRENT",
        payload: {},
      });
    }
  };

  const trackImg = track.img ? track.img : DefaultMusicImage;

  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isAlbum={isAlbum}
          onMouseEnter={(e) => {
            setIsActive(true);
          }}
          onMouseLeave={(e) => {
            setIsActive(false);
          }}
          isCurrent={isCurrent}
        >
          <Item className="" isCenter>
            <div className="index">{index + 1}</div>
            <PlaybackButton
              className="play"
              data={track}
              isActive={isActive || isCurrent}
            >
              <FontAwesomeIcon
                icon={isPlaying && isCurrent ? faPause : faPlay}
              />
            </PlaybackButton>
          </Item>
          {isAlbum ? (
            <Item>{` `}</Item>
          ) : (
            <LazyLoadImage
              src={trackImg}
              alt={track.album?.name}
              width="40px"
              style={{ justifySelf: "center" }}
            />
          )}
          <Item>{track.name}</Item>
          <Item>
            {track.artists
              ? track.artists?.map((artist, index) => (
                  <Link
                    key={index}
                    to={`/app/artist/${track.service}/${artist.uri}`}
                  >
                    {artist.name}
                  </Link>
                ))
              : "-"}
          </Item>
          {isAlbum ? null : track.album ? (
            <Item>
              <Link to={`/app/album/${track.service}/${track.album.uri}`}>
                {track.album.name}
              </Link>
            </Item>
          ) : (
            "-"
          )}
          <Item isRight>{track.time ? timeConversion(track.time) : "-"}</Item>
          {/* <ExternalLink
            href={track.href}
            onClick={handleUrlClick}
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </ExternalLink> */}
          <Item isRight>
            <MenuButton track={track} handleUrlClick={handleUrlClick} />
          </Item>
        </Container>
      )}
    </Draggable>
  );
};
