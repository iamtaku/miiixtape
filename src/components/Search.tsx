import React from "react";
import { useParams } from "react-router-dom";
import { QueryClient } from "react-query";
import styled from "styled-components";

interface SearchParam {
  search: string;
}

const SearchWrapper = styled.div`
  grid-area: inner;
`;

export const Search = (): JSX.Element => {
  const location = useParams<SearchParam>();
  const queryClient = new QueryClient();
  const data = queryClient.getQueryData(["userInfo"]);
  console.log(data);
  return (
    <SearchWrapper>
      this is the search page
      {location.search}
    </SearchWrapper>
  );
};
