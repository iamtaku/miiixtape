import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
  margin-left: 24px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 1rem;
    text-transform: uppercase;
    opacity: 0.8;
    margin-right: 8px;
  }
`;

const List = styled.ul<{ isCurrent?: boolean }>`
  /* padding: 8px; */
  /* margin: 8px 0; */
`;

const Icon = styled.div`
  border: 1px solid var(--gray);
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background: #353535;
  box-shadow: 16px 16px 32px #303030, -16px -16px 32px #3a3a3a;
`;

export const SidebarCollection: React.FC<SidebarCollectionProps> = ({
  data,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <List
      onMouseEnter={(e) => {
        setIsActive(true);
      }}
      onMouseLeave={(e) => {
        setIsActive(false);
      }}
    >
      <TitleSection>
        <Container>
          <span>{title}</span>
        </Container>
      </TitleSection>
      {isOpen &&
        data?.map((playlist) => (
          <SidebarItem playlist={playlist} key={playlist.playlistInfo.id} />
        ))}
    </List>
  );
};
