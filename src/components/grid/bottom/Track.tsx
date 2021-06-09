import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Playlist, Song } from "../../../types/types";
import { TrackImg } from "./TrackImg";
import { timeConversion } from "../../../helpers/timeConversion";
import { Link, useLocation } from "react-router-dom";
import { stripURI } from "../../../helpers/stripURI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../../../state/context";

interface TrackProps {
  track: Song;
  index: number;
}

const Container = styled.li<{ isAlbum?: boolean; isCurrent?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 50px 2.5fr 1fr 0.5fr "
      : "20px 50px 2fr 1fr 1fr 0.5fr 0.5fr"};
  grid-column-gap: 8px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 40px;
  background-color: ${(props) =>
    props.isCurrent ? "var(--dark-accent) !important" : "default"};

  &:hover {
    background-color: var(--light-gray);
  }
`;

const Item = styled.span<{ isRight?: boolean; isCenter?: boolean }>`
  display: flex;
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

const PlayButton = styled.button<{ isPlaying?: boolean }>`
  background: none;
  border: none;
  color: var(--white);
  &:hover {
    cursor: pointer;
  }
`;

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useGlobalContext();

  const isPlaying = () => isCurrent() && state.player.isPlaying;
  const isCurrent = () => state.player.currentSong?.id === track.id;

  const handleClick = (track: Song) => {
    const playlist: Playlist = {
      playlistInfo: { name: track.name, id: track.id, service: track.service },
      tracks: [{ ...track }],
    };
    isCurrent()
      ? dispatch({ type: "PAUSE_CURRENT", payload: {} })
      : dispatch({
          type: "PLAY_PLAYLIST",
          payload: { playlist },
        });
  };

  return (
    <Draggable draggableId={`${track.id}-${index.toString()}}`} index={index}>
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
          isCurrent={isCurrent()}
        >
          {isAlbum ? (
            <>
              {isActive ? (
                <PlayButton onClick={() => handleClick(track)}>
                  <FontAwesomeIcon icon={isPlaying() ? faPause : faPlay} />
                </PlayButton>
              ) : (
                <Item isCenter>{index + 1}</Item>
              )}

              <Item>{` `}</Item>
              <Item>{track.name}</Item>
              <Item>
                {track.artists?.map((artist) => (
                  <span key={artist.uri}>{artist.name}</span>
                ))}
              </Item>
              <Item isRight>
                {track.time ? timeConversion(track.time) : "-"}
              </Item>
            </>
          ) : (
            <>
              {isActive ? (
                <PlayButton onClick={() => handleClick(track)}>
                  <FontAwesomeIcon icon={isPlaying() ? faPause : faPlay} />
                </PlayButton>
              ) : (
                <Item isCenter>{index + 1}</Item>
              )}
              <TrackImg img={track.img} alt={track.album?.name} />
              <Item>{track.name}</Item>
              <Item>
                {track.artists
                  ? track.artists?.map((artist) => (
                      <span key={artist.uri}>{artist.name}</span>
                    ))
                  : "-"}
              </Item>
              <Item>
                {track.album ? (
                  <Link
                    to={`/app/album/${track.service}/${stripURI(
                      track.album.uri
                    )}`}
                  >
                    {track.album.name}
                  </Link>
                ) : (
                  "-"
                )}
              </Item>
              <Item isRight>
                {track.time ? timeConversion(track.time) : "-"}
              </Item>
              <Item isRight>{track.service}</Item>
            </>
          )}
        </Container>
      )}
    </Draggable>
  );
};
