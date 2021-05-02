import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, QueryClient } from "react-query";

interface SearchParam {
  search: string;
}

const Search = () => {
  const location = useParams<SearchParam>();
  console.log(location);
  const queryClient = new QueryClient();
  const data = queryClient.getQueryData(["userInfo"]);
  console.log(data);
  //   console.log(queryClient.getQueryData(["userInfo"]));
  return (
    <div>
      this is the search page
      {location.search}
    </div>
  );
};

export default Search;
