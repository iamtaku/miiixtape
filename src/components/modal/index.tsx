import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { AddModal } from "./AddModal";
import { ShareModal } from "./ShareModal";

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(15, 11, 11, 0.5);
  backdrop-filter: blur(4px) contrast(0.8);
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 25vh;
  width: 60%;
  max-height: 50%;
  max-width: 800px;
  /* background-color: var(--light-gray); */
  z-index: 100;
  border-radius: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(15, 11, 11, 0);
  padding-top: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  h3 {
    margin: 4px 0;
  }

  &::after {
    background-color: rgba(15, 11, 11, 0.5);
    -webkit-backdrop-filter: blur(8px) contrast(0.8);
    backdrop-filter: blur(10px) contrast(0.8);
  }
`;

const Title = styled.h3`
  font-size: 2.5rem;
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

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export const Modal: React.FC = () => {
  const { state, dispatch } = useGlobalContext();
  if (!state.ui.isModalOpen || state.ui.modalType === null) return null;

  const title = () => {
    switch (state.ui.modalType) {
      case "ADD_MODAL":
        return "Add Tracks";
      case "SHARE_MODAL":
        return "Share";
      default:
        return;
    }
  };
  return (
    <Wrapper>
      <ModalContainer>
        <Container>
          <TitleWrapper>
            <Title>{title()}</Title>
            <CloseBtn
              onClick={() => dispatch({ type: "CLOSE_MODAL", payload: {} })}
            >
              <FaTimes />
            </CloseBtn>
          </TitleWrapper>
          {state.ui.modalType === "ADD_MODAL" && <AddModal />}
          {state.ui.modalType === "SHARE_MODAL" && <ShareModal />}
        </Container>
      </ModalContainer>
    </Wrapper>
  );
};
