import React from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { useGlobalContext } from "../../state/context";
import { AddModal } from "./AddModal";
import { ShareModal } from "./ShareModal";
import { IoIosWarning, IoMdCheckmark } from "react-icons/io";

const BackDrop = styled.div`
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
`;

const ModalContainer = styled.div`
  z-index: 100;
  position: absolute;
  top: 25vh;
  max-height: 50%;
  width: fit-content;
  border-radius: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
  padding: 34px;
  background-color: var(--lighter-gray);
`;

const Title = styled.h2`
  font-size: 2.3rem;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
    color: var(--accent);
  }
`;

const CloseButton: React.FC<{
  onClick(event: React.MouseEvent<HTMLElement>): void;
}> = ({ onClick }) => {
  return (
    <CloseBtn onClick={onClick}>
      <IoClose />
    </CloseBtn>
  );
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding: 4px;
  margin: 8px 0 0 0;
`;

const SubHeader = styled.h3`
  font-weight: 400;
`;

const Loader = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    position: absolute;
    top: 20%;
    transform: translateY(-50%);
    left: 0;
    width: 10px;
    min-height: 10px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0, 0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export const Loading = () => (
  <Loader>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Loader>
);

export const Success = () => <IoMdCheckmark style={{ color: "green" }} />;

export const Error = () => (
  <IoIosWarning style={{ color: "var(--red)", placeSelf: "center end" }} />
);

export const ModalSection: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <SubHeader>{title}</SubHeader>
      {children}
    </Container>
  );
};

export const Modal = () => {
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
    <>
      <BackDrop />
      <ModalContainer>
        <TitleContainer>
          <Title>{title()}</Title>
          <CloseButton
            onClick={() => dispatch({ type: "CLOSE_MODAL", payload: {} })}
          />
        </TitleContainer>
        {state.ui.modalType === "ADD_MODAL" && <AddModal />}
        {state.ui.modalType === "SHARE_MODAL" && <ShareModal />}
      </ModalContainer>
    </>
  );
};
