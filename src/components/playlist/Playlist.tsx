import React from "react";
import styled from "styled-components";
import { useGetSinglePlaylist } from "../../queries/hooks";
import { Bottom } from "../grid/Bottom";
import { Loading } from "../Shared";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Playlist: React.FC = () => {
  const { data, isLoading, error } = useGetSinglePlaylist();

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }
  return <Bottom data={data} isLoading={isLoading} error={error} />;
};
