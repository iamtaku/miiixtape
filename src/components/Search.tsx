import { useParams } from "react-router-dom";
import { QueryClient } from "react-query";
import styled from "styled-components";
import { Layout } from "./Layout";
import { InnerLayout } from "./grid/InnerLayout";

interface SearchParam {
  search: string;
}

const SearchWrapper = styled.div`
  grid-area: main;
`;

export const Search = () => {
  const location = useParams<SearchParam>();
  console.log(location);
  const queryClient = new QueryClient();
  const data = queryClient.getQueryData(["userInfo"]);
  console.log(data);
  return (
    <Layout>
      <InnerLayout>
        <SearchWrapper>
          this is the search page
          {location.search}
        </SearchWrapper>
      </InnerLayout>
    </Layout>
  );
};
