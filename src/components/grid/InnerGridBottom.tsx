import React from "react";
import styled from "styled-components";
import { ServerPlaylist } from "../../queries/types";

const InnerGridBottomWrapper = styled.div`
  grid-area: "bottom";
`;
interface PropTypes {
  data?: ServerPlaylist;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data }) => {
  return (
    <InnerGridBottomWrapper>
      <h2>this is the inner bottom grid</h2>
      {data?.included.map((item, index: any) => {
        return <p key={index}>{item.attributes.name}</p>;
      })}
    </InnerGridBottomWrapper>
  );
};
