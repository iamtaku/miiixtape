import React from "react";
import styled from "styled-components";
import defaultMusicImg from "../../../assets/music-cover.png";
interface Props {
  img?: string;
  alt?: string;
}

const Image = styled.img`
  width: 40px;
`;

export const TrackImg: React.FC<Props> = ({ img, alt }) => {
  return <Image src={img ? img : defaultMusicImg} alt={alt} />;
};
