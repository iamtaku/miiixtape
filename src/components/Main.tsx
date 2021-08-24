import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled, { CSSProperties } from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { useGetAllPlaylists, useGetAllSpotifyPlaylist } from "../queries/hooks";
import DefaultMusicImage from "../assets/music-cover.png";
import { Collection } from "../types/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useIsCurrentPlaylist } from "../helpers/hooks";
import { PlaybackButton } from "./Buttons";
import { FaPause, FaPlay } from "react-icons/fa";

const Wrapper = styled.div`
  margin: 24px;
`;

const CardLink = styled(ReactLink)``;
const Title = styled.span`
  font-weight: bold;
`;
const Container = styled.div`
  overflow: auto;
  height: 100vh;
`;
const Cards = styled.ul`
  margin-top: 12px;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 0.8fr));
  grid-template-rows: auto;
  grid-gap: 16px;
`;

const Item = styled.li`
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 1px solid var(--gray);
  border-radius: 8px;
  background: var(--light-gray);
  padding: 16px 8px;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
  text-align: center;
  opacity: 0.8;
  transition: 0.5s ease;
  &:hover {
    opacity: 1;
    .playButton {
      display: initial;
    }
  }
`;

const PlayButton = styled(PlaybackButton)<{
  $isPlaying?: boolean;
}>`
  display: ${(props) => (props.$isPlaying ? "initial" : "none")};
  background: none;
  border: none;
  padding: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 20px;
  border-radius: 0;
  color: var(--accent);
  z-index: 100;
  font-size: 3rem;
  box-shadow: none;

  &:hover {
    cursor: pointer;
    background: none;
    box-shadow: none;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
`;

const Card: React.FC<{ playlist: Collection }> = ({ playlist }) => {
  const { isPlaying, isCurrent } = useIsCurrentPlaylist(playlist);
  const styles = {
    borderRadius: "50%",
    minHeight: "185px",
    // marginBottom: "8px",
  };

  return (
    <Item key={playlist.playlistInfo.id}>
      <ImageWrapper>
        <LazyLoadImage
          src={playlist.playlistInfo.img || DefaultMusicImage}
          effect="blur"
          style={styles}
        />
        <PlayButton
          data={playlist}
          $isPlaying={isCurrent}
          className="playButton"
        >
          {isPlaying && isCurrent ? <FaPause /> : <FaPlay />}
        </PlayButton>
      </ImageWrapper>
      <CardLink
        to={`/app/playlist/${playlist.playlistInfo.service}/${playlist.playlistInfo.id}`}
      >
        <Title>{playlist.playlistInfo.name}</Title>
      </CardLink>
    </Item>
  );
};

const PlaylistSection: React.FC<{
  data?: Collection[];
  title: string;
  style?: CSSProperties;
}> = ({ data, title, style }) => {
  return (
    <Wrapper style={style}>
      <Title>{title}</Title>
      <Cards>
        {data?.map((playlist) => (
          <Card playlist={playlist} key={playlist.playlistInfo.id} />
        ))}
      </Cards>
    </Wrapper>
  );
};

export const Main = (): JSX.Element => {
  const { search } = useLocation();
  const history = useHistory();
  const { data: playlists, isLoading } = useGetAllPlaylists();
  const { data: spotifyPlaylists, isLoading: _spotifyLoading } =
    useGetAllSpotifyPlaylist();

  const referalId = window.localStorage.getItem("referalId");
  if (referalId) {
    history.push(`/app/playlist/plaaaylist/${referalId}`);
    window.localStorage.removeItem("referalId");
  }

  if (search === "?error=access_denied") {
    console.error("You need to authorize spotify for this App to work");
    history.push("/error");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <PlaylistSection data={playlists} title={"My miiixtapes"} />
      <PlaylistSection
        data={spotifyPlaylists}
        title={"Spotify Playlists"}
        style={{ paddingBottom: "124px" }}
      />
    </Container>
  );
};
