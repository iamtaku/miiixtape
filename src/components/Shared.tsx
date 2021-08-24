import React from "react";
import { FaSpotify, FaYoutube, FaSoundcloud } from "react-icons/fa";
import { IoIosWarning, IoMdCheckmark } from "react-icons/io";
import styled, { CSSProperties } from "styled-components";
import { Service } from "../types/types";

const Container = styled.div`
  padding: 4px;
  margin: 8px 0 0 0;
  min-width: 500px;
`;

const SubHeader = styled.div`
  font-weight: 400;
  margin-bottom: 8px;
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

export const Loading: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <Loader style={style}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </Loader>
);

export const Success = (): JSX.Element => (
  <IoMdCheckmark style={{ color: "green", fontSize: "1.5rem" }} />
);

export const Error = (): JSX.Element => (
  <IoIosWarning
    style={{ color: "var(--red)", placeSelf: "center end", fontSize: "1.5rem" }}
  />
);

const SubTitle = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const ModalSection: React.FC<{
  title: JSX.Element | string;
  onClick?: () => void;
}> = ({ title, children, onClick }) => {
  return (
    <Container>
      <SubHeader>
        {typeof title === "string" ? (
          onClick ? (
            <SubTitle onClick={onClick}>{title}</SubTitle>
          ) : (
            <span>{title}</span>
          )
        ) : (
          title
        )}
      </SubHeader>
      {children}
    </Container>
  );
};

const Wrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: var(--gray);

  ::-webkit-scrollbar-track {
    background: var(--lighter-gray);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray);
  }

  .create-new {
    border-radius: 0;
    text-align: left;
    box-shadow: none;
    padding: 2px 32px;
    button {
      width: auto;
      font-size: 1rem;
    }
  }
`;

const ListContainer = styled.ul`
  overflow-y: auto;
  max-height: 300px;
`;

export const List: React.FC<{
  style?: CSSProperties;
  listStyle?: CSSProperties;
}> = ({ children, style, listStyle }) => (
  <Wrapper style={style}>
    <ListContainer style={listStyle}>{children}</ListContainer>
  </Wrapper>
);

export const Item = styled.li`
  display: flex;
  min-height: 30px;
  justify-content: space-between;
  align-items: center;
  padding: 2px 32px;
  border: 1px solid transparent;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: var(--lighter-gray);
    border-radius: 8px;

    button {
      visibility: visible;
    }
  }
`;
export const setIcon = (
  service?: Service,
  index?: number
): JSX.Element | null => {
  if (!service) return null;
  switch (service) {
    case "spotify":
      return <FaSpotify key={index} />;
    case "youtube":
      return <FaYoutube key={index} />;
    case "soundcloud":
      return <FaSoundcloud key={index} />;
    default:
      return null;
  }
};
