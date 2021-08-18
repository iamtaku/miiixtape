import styled from "styled-components";
export const ItemContainer = styled.li<{ isAlbum?: boolean }>`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: ${(props) =>
    props.isAlbum
      ? "20px 4.5fr 2fr 150px 0.2fr "
      : "20px 50px 3.5fr 2fr 150px 0.2fr"};
  padding: 4px 12px;
  align-items: center;
  border-radius: 8px;
`;
