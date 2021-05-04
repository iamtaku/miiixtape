import React from "react";
import styled from "styled-components";

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
  data?: SpotifyApi.SinglePlaylistResponse;
  pageType: string;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data, pageType }) => {
  // const { images, description, href, owner } = data;
  if (!data) return <h1>loading...</h1>;
  return (
    <InnerGridTopWrapper>
      <h2>{data.name}</h2>
      <img src={data.images[0].url} alt="" />
      <p>{data.description}</p>
    </InnerGridTopWrapper>
  );
};
