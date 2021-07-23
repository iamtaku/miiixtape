import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  border-radius: 8px;
  padding: 2px 24px;
  background-color: var(--light-gray);
  width: 100%;
  background: #5c5c5c;
  border: 2px solid transparent;
  form {
    width: 100%;
  }

  input {
    background: transparent;
    box-shadow: none;
    border: 2px solid transparent;
    color: var(--secondary);
    opacity: 0.6;
    width: 100%;

    ::placeholder {
      color: var(--secondary);
    }
    &:focus {
      outline: none;
    }
  }

  :focus-within {
    border: 2px solid var(--accent);
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
