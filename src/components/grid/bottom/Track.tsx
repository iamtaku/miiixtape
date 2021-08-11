import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { FaEllipsisV, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import { Song } from "../../../types/types";
import { timeConversion } from "../../../helpers/utils";
import { useGlobalContext } from "../../../state/context";
import { TrackPlaybackButton } from "../../Buttons";
import { useIsCurrentTrack } from "../../../helpers/hooks";
import DefaultMusicImage from "../../..//assets/music-cover.png";
import {
  useDeletePlaylistItem,
  useFetchSongCache,
  useGetTrack,
} from "../../../queries/hooks";
import { BaseParams } from "../../../queries/types";
import { TitleAlbum, IndexPlayButton } from "./Items";

interface TrackProps {
  track: Song;
  index: number;
  provided?: DraggableProvided;
  isDragging?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
}

export const ItemContainer = styled.li`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 20px 50px 3fr 2fr 0.5fr 0.2fr;
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
`;

const Container = styled(ItemContainer)<{ isCurrent?: boolean }>`
  display: grid;
  grid-column-gap: 8px;
  padding: 0px 12px;
  align-items: center;
  border-radius: 8px;
  min-height: 40px;
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
      visibility: initial;
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--red);
`;

const Item = styled.span<{
  isRight?: boolean;
  isCenter?: boolean;
  isActive?: boolean;
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

const PlaybackButton = styled(TrackPlaybackButton)<{ isActive?: boolean }>`
  display: ${(props) => (props.isActive ? "default" : "none")};
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  visibility: hidden;
  color: var(--secondary);
`;

interface ISubMenu {
  offsetX?: boolean;
  offsetY?: boolean;
  offsetXWidth?: number;
  offsetYWidth?: number;
}

type SubMenuProps = ISubMenu & { children: React.ReactNode };

const SubMenuContainer = styled.div<ISubMenu>`
  border: 1px solid red;
  position: absolute;
  right: 12px;
  transform: ${(props) =>
    props.offsetXWidth ? `translateX(-${props.offsetXWidth}px)` : "initial"};
  display: flex;
  flex-direction: column;
`;

interface ISub extends ISubMenu, HTMLDivElement {}

const SubMenu: React.FC<SubMenuProps> = ({
  children,
  offsetX,
  offsetXWidth,
  offsetY,
  offsetYWidth,
}) => {
  const ref = useRef<ISub | null>(null);
  useEffect(() => {
    if (ref.current == null) return;
    ref.current.offsetXWidth = ref.current.parentElement?.offsetWidth;
    console.log(ref.current.offsetXWidth);
  }, []);
  return <SubMenuContainer ref={ref}>{children}</SubMenuContainer>;
};

const MenuButton: React.FC<{ track: Song }> = ({ track }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { dispatch, state } = useGlobalContext();
  const mutation = useDeletePlaylistItem();
  const songCache = useFetchSongCache(track.id);
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleDeletePlaylistItem = () => {
    mutation.mutateAsync(track.id).then(() => {
      dispatch({ type: "DELETE_ITEM", payload: { id: track.id } });
      setIsOptionsOpen(false);
      if (state.player?.currentSong?.id === track.id) {
        dispatch({
          type: "SONG_END",
          payload: {},
        });
        dispatch({
          type: "SET_NEXT",
          payload: {},
        });
        dispatch({
          type: "PLAY",
          payload: {},
        });
      }
    });
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <OptionsButton className="options" onClick={handleClick}>
        <FaEllipsisV />
      </OptionsButton>
      {isOptionsOpen && (
        <SubMenu>
          <a href={songCache?.href} target="_blank" rel="noreferrer">
            <FiExternalLink />
          </a>
          <DeleteButton onClick={handleDeletePlaylistItem}>
            <FaTrash />
          </DeleteButton>
        </SubMenu>
      )}
    </div>
  );
};

const Placeholder = () => <h1>Placeholder</h1>;

export const Track: React.FC<TrackProps> = ({
  track,
  index,
  provided,
  isDragging,
}) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const isAlbum = location.pathname.includes("album");
  const { isPlaying, isCurrent } = useIsCurrentTrack(track);
  const params = useParams<BaseParams>();
  const { data } = useGetTrack(track, params.id);

  const trackImg = data?.img ? data.img : DefaultMusicImage;

  if (!data) return null;

  return (
    <Draggable draggableId={track.id} index={index}>
      {(provided) => (
        <LazyLoad
          placeholder={<Placeholder />}
          height={40}
          scrollContainer={".main"}
          key={index.toString()}
        >
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={(e) => {
              setIsActive(true);
            }}
            onMouseLeave={(e) => {
              setIsActive(false);
            }}
            isCurrent={isCurrent}
          >
            <Item className="" isCenter>
              <IndexPlayButton
                index={index}
                isPlaying={isPlaying}
                isCurrent={isCurrent}
                data
              />
            </Item>
            {isAlbum ? (
              <Item>{` `}</Item>
            ) : (
              <img
                src={trackImg}
                alt={data.album?.name}
                width="30px"
                height="30px"
                style={{ justifySelf: "center" }}
              />
            )}
            <TitleAlbum data={data} isAlbum={isAlbum} />
            <Item>
              {data.artists
                ? data.artists?.map((artist, index) => (
                    <Link
                      key={index}
                      to={`/app/artist/${data.service}/${artist.uri}`}
                    >
                      {index > 0 && ", "}
                      {artist.name}
                    </Link>
                  ))
                : "-"}
            </Item>
            <Item isRight>{data.time ? timeConversion(data.time) : "-"}</Item>
            <Item isRight style={{ overflow: "initial" }}>
              <MenuButton track={track} />
            </Item>
          </Container>
        </LazyLoad>
      )}
    </Draggable>
  );
};
