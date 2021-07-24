import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(15, 11, 11, 0.2);
  backdrop-filter: blur(4px) contrast(0.8);
  /* display: grid; //why grid? */
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 40vh;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 60%;
  background-color: var(--light-gray);
  border-radius: 16px;
  padding: 8px 24px 24px 24px;
  h3 {
    margin: 4px 0;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 3rem;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
    color: var(--accent);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface ModalProps {
  handleClick: () => void;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  handleClick,
}) => {
  return (
    <Container>
      <ModalWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
          <CloseBtn onClick={handleClick}>
            <FontAwesomeIcon icon={faTimes} />{" "}
          </CloseBtn>
        </TitleWrapper>
        {children}
      </ModalWrapper>
    </Container>
  );
};
