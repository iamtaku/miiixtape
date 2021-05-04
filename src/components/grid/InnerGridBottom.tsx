import React from "react";
import styled from "styled-components";

const InnerGridBottomWrapper = styled.div`
  grid-area: "bottom";
`;
interface PropTypes {
  data: any;
}
export const InnerGridBottom: React.FC<PropTypes> = ({ data }) => {
  return (
    <InnerGridBottomWrapper>
      <h2>this is the inner bottom grid</h2>
      {data?.tracks.items.map((item: any, index: any) => {
        return <p key={index}>{item.track.name}</p>;
      })}
    </InnerGridBottomWrapper>
  );
};
