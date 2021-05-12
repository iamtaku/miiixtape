import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { PlaylistInfo, Tracks } from "../../types/types";

const InnerGridTopWrapper = styled.div`
  grid-area: "top";
  img {
    width: 150px;
  }

  h2 {
    text-decoration: underline;
    text-decoration-color: var(--primary);
  }
`;

interface PropTypes {
  data?: PlaylistInfo;
  tracks?: Tracks;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, tracks }) => {
  const { dispatch, state } = useGlobalContext();

  const handleClick = (id: string, tracks: Tracks) => {
    dispatch({
      type: "PLAY_PLAYLIST",
      payload: {
        id,
        tracks,
      },
    });
  };
  if (!data || !tracks) return <h1>loading...</h1>;
  return (
    <InnerGridTopWrapper>
      <h2>{data.name}</h2>
      <img src={data.img} alt={data.description} />
      <p>{data.description}</p>
      <button onClick={() => handleClick(data.id, tracks)}>Play</button>
    </InnerGridTopWrapper>
  );
};
