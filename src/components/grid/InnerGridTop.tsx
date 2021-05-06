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

type ServiceType = "spotify" | "youtube";

interface Data {
  coverImg?: string;
  coverImgAlt?: string;
  services: ServiceType[];
  type: "album" | "playlist" | "artist";
  description?: string;
  name: string;
}

interface PropTypes {
  data?: any;
  // pageType: string;
}

export const InnerGridTop: React.FC<PropTypes> = ({ data }) => {
  // const { images, description, href, owner } = data;
  if (!data) return <h1>loading...</h1>;
  return (
    <InnerGridTopWrapper>
      <h2>{data.name}</h2>
      <img src={data.coverImg} alt={data.coverImgAlt} />
      <p>{data.description}</p>
    </InnerGridTopWrapper>
  );
};
