import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  border-radius: 8px;
  padding: 4px 24px;
  background-color: var(--primary);
  width: 100%;
  border: 1px solid transparent;
  form {
    width: 100%;
  }

  input {
    box-shadow: none;
    color: var(--secondary);
    background: transparent;
    border: none;
    opacity: 0.7;
    width: 100%;

    ::placeholder {
      color: var(--secondary);
    }
    &:focus {
      outline: none;
    }
  }

  :focus-within {
    border: 1px solid var(--secondary);
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
