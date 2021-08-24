import React, { useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Playlist } from "../../queries/api";
import { Collection, PlaylistParam, Song } from "../../types/types";
import { useEffect } from "react";
import { setIcon } from "../Shared";

const Container = styled.div`
  display: grid;
  height: 100%;
`;

const List = styled.ul`
  place-self: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ItemContainer = styled.li`
  display: grid;
  grid-template-columns: 0.1fr 0.8fr 0.1fr;
  grid-gap: 18px;
  overflow-x: hidden;
  width: 506px;
  height: 80;
  margin: 4px 0px;
`;

const Span = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-flex;
`;

const Button = styled(Link)`
  background: none;
  padding: 8px;
  border: none;
  margin: 0 8px;
  border-radius: 8px;
  text-align: center;
`;

const Item: React.FC<{ track: Song; index: number }> = ({ track, index }) => {
  return (
    <ItemContainer>
      <Span style={{ placeSelf: "center end" }}>{index}</Span>
      <Span style={{ fontWeight: "bold" }}>{track.name}</Span>
      <Span style={{ placeSelf: "center end" }}>{setIcon(track.service)}</Span>
    </ItemContainer>
  );
};

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 24px;
`;

export const PlaylistShare = (): JSX.Element | null => {
  const [data, setData] = useState<Collection | null>(null);
  const { id } = useParams<PlaylistParam>();

  useEffect(() => {
    if (data) return;
    Playlist.getPlaylist(id).then((res) => {
      setData(res);
    });
  }, [data]);

  const handleClick = () => {
    window.localStorage.setItem("referalId", id);
  };

  return (
    <Container>
      <Heading>
        <h3>{data?.playlistInfo.name}</h3>
        <Button
          to={"/login"}
          style={{ border: "1px solid var(--accent", color: "var(--accent)" }}
          onClick={handleClick}
        >
          Play
        </Button>
      </Heading>
      <List>
        {data?.tracks.map((track, index) => (
          <Item track={track} index={index} key={track.id} />
        ))}
      </List>
    </Container>
  );
};
