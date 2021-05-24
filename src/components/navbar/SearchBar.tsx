import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  border-radius: 50px;
  padding: 4px 36px;
  background-color: var(--gray);

  input {
    background: transparent;
    box-shadow: none;
    border: none;
    color: var(--secondary);
    width: 300px;
    ::placeholder {
      color: var(--secondary);
    }
    &:focus {
      outline: none;
    }
  }

  :focus-within {
    border: 3px solid var(--accent);
  }
`;

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/app/search/${search}`);
    setSearch("");
  };
  return (
    <SearchBarWrapper>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={(e) => (e.currentTarget.placeholder = "")}
          onBlur={(e) => (e.currentTarget.placeholder = "Search...")}
        />
      </form>
    </SearchBarWrapper>
  );
};
