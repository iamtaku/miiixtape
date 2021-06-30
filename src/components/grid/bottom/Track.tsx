import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Song } from "../../../types/types";
import { timeConversion } from "../../../helpers/timeConversion";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../state/context";
import { TrackPlaybackButton } from "../../Buttons";
import { useIsCurrentTrack } from "../../../helpers/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";

interface TrackProps {
  track: Song;
  index: number;
}

const Container = styled.li<{ isAlbum?: Boolean; isCurrent?: Boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 50px 2.5fr 1fr 0.5fr "
      : "20px 50px 2fr 1fr 1fr 0.5fr 0.5fr"};
  grid-column-gap: 8px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
  max-height: 100ps;
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
  justify-content: ${(props) => (props.isRight ? "flex-end" : "default")};
  justify-content: ${(props) => (props.isCenter ? "center" : "default")};

  a:hover {
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  text-align: right;
  justify-self: end;
  /* display: flex; */
  /* justify-content: flex-end; */
  width: 16px;
`;

const Image = styled.img`
  width: 40px;
  justify-self: center;
`;

const PlaybackButton = styled(TrackPlaybackButton)<{ isActive?: Boolean }>`
  /* display: ${(props) => (props.isActive ? "initial" : "none")}; */
  display: ${(props) => (props.isActive ? "default" : "none")};
`;

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
            <Image src={track.img} alt={track.album?.name} />
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

                  // <span key={artist.uri}>{artist.name}</span>
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
          {isAlbum ? null : (
            // <Item isRight>
            <ExternalLink
              href={track.href}
              onClick={handleUrlClick}
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </ExternalLink>
            // </Item>
          )}
        </Container>
      )}
    </Draggable>
  );
};
