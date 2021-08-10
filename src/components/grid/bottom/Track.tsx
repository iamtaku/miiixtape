import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lazyload from "react-lazyload";
import { FaEllipsisV, FaPause, FaPlay } from "react-icons/fa";

import { Song } from "../../../types/types";
import { timeConversion } from "../../../helpers/utils";
import { useGlobalContext } from "../../../state/context";
import { TrackPlaybackButton } from "../../Buttons";
import { useIsCurrentTrack } from "../../../helpers/hooks";
import DefaultMusicImage from "../../..//assets/music-cover.png";
import { useGetTrack } from "../../../queries/hooks";
import { BaseParams } from "../../../queries/types";

interface TrackProps {
  track: Song;
  index: number;
  provided?: DraggableProvided;
  isDragging?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
}

const Container = styled.li<{ isAlbum?: boolean; isCurrent?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 50px 2.5fr 1fr 0.5fr 0.2fr "
      : "20px 50px 2fr 1fr 1fr 0.5fr 0.2fr"};
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
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <OptionsButton className="options" onClick={handleClick}>
        <FaEllipsisV />
      </OptionsButton>
      {isOptionsOpen && (
        <SubMenu>
          <p>Link</p>
          <p>delete</p>
        </SubMenu>
      )}
    </div>
  );
};

const Placeholder = () => <h3>Placeholder...</h3>;

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
              data={data}
              isActive={isActive || isCurrent}
            >
              {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
            </PlaybackButton>
          </Item>
          {isAlbum ? (
            <Item>{` `}</Item>
          ) : (
            <LazyLoadImage
              src={trackImg}
              alt={data.album?.name}
              width="30px"
              height="30px"
              style={{ justifySelf: "center" }}
              placeholderSrc={DefaultMusicImage}
            />
          )}
          <Item>{data.name}</Item>
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
          {isAlbum ? null : data.album ? (
            <Item>
              <Link to={`/app/album/${data.service}/${data.album.uri}`}>
                {data.album.name}
              </Link>
            </Item>
          ) : (
            "-"
          )}
          <Item isRight>{data.time ? timeConversion(data.time) : "-"}</Item>
          <Item isRight style={{ overflow: "initial" }}>
            <MenuButton track={track} />
          </Item>
        </Container>
      )}
    </Draggable>
  );
};
