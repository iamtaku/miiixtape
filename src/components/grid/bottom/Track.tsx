import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Song } from "../../../types/types";
import { TrackImg } from "./TrackImg";
import { timeConversion } from "../../../helpers/timeConversion";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../state/context";
import { mapTrackToPlaylist } from "../../../helpers/mappingHelpers";
import { PlaybackButton } from "../../PlaybackButton";

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
  min-height: 40px;
  background-color: ${(props) =>
    props.isCurrent ? "var(--dark-accent) !important" : "default"};

  &:hover {
    background-color: var(--light-gray);
  }
`;

const Item = styled.span<{
  isRight?: Boolean;
  isCenter?: Boolean;
  isHidden?: Boolean;
}>`
  display: ${(props) => (props.isHidden ? "none" : "flex")};
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

export const Track: React.FC<TrackProps> = ({ track, index }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = useGlobalContext();

  const isCurrent = state.player.currentSong?.id === track.id;
  const playlist = mapTrackToPlaylist(track);
  const isAlbum = location.pathname.includes("album");

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
          <Item isCenter isHidden={isActive}>
            {index + 1}
          </Item>
          {/* <PlaybackButton playlist={playlist} isActive={isActive} /> */}

          {isAlbum ? (
            <Item>{` `}</Item>
          ) : (
            <TrackImg img={track.img} alt={track.album?.name} />
          )}
          <Item>{track.name}</Item>
          <Item>
            {track.artists
              ? track.artists?.map((artist) => (
                  <span key={artist.uri}>{artist.name}</span>
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
          {isAlbum ? null : <Item isRight>{track.service}</Item>}
        </Container>
      )}
    </Draggable>
  );
};
