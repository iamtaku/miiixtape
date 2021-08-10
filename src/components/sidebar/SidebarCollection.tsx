import React from "react";
import styled from "styled-components";
import { Collection } from "../../types/types";
import { SidebarItem } from "./SidebarItem";

interface SidebarCollectionProps {
  data?: Collection[];
  title: string;
}

const TitleSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  span {
    font-size: 1.1rem;
    opacity: 0.7;
    margin-right: 8px;
  }
`;

const List = styled.ul<{ isCurrent?: boolean }>`
  margin-bottom: 8px;
`;

export const SidebarCollection: React.FC<SidebarCollectionProps> = ({
  data,
  title,
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  // const [isActive, setIsActive] = useState(false);

  // const handleClick = () => {
  // setIsOpen(!isOpen);
  // };

  return (
    <List
    // onMouseEnter={(e) => {
    //   setIsActive(true);
    // }}
    // onMouseLeave={(e) => {
    //   setIsActive(false);
    // }}
    >
      <TitleSection>
        <Container>
          <span>{title}</span>
        </Container>
      </TitleSection>
      {data?.map((playlist) => (
        <SidebarItem playlist={playlist} key={playlist.playlistInfo.id} />
      ))}
    </List>
  );
};
