import React from "react";
import { FaSpotify, FaYoutube, FaSoundcloud } from "react-icons/fa";
import { IoIosWarning, IoMdCheckmark } from "react-icons/io";
import styled from "styled-components";
import { Service } from "../types/types";

const Container = styled.div`
  padding: 4px;
  margin: 8px 0 0 0;
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
  <IoMdCheckmark style={{ color: "green" }} />
);

export const Error = (): JSX.Element => (
  <IoIosWarning style={{ color: "var(--red)", placeSelf: "center end" }} />
);

export const ModalSection: React.FC<{ title: JSX.Element | string }> = ({
  title,
  children,
}) => {
  return (
    <Container>
      <SubHeader>
        {typeof title === "string" ? <span>{title}</span> : title}
      </SubHeader>
      {children}
    </Container>
  );
};

export const List = styled.ul`
  overflow: hidden;
  overflow-y: scroll;
  max-height: 300px;
  background: var(--light-gray);
  border-radius: 8px;
  padding: 8px 0;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 2px 26px;
  border: 1px solid transparent;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: var(--lighter-gray);
    border-radius: 4px;

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
