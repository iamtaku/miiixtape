import React from "react";
import { Modal as ModalWrapper } from "./index";

export const ShareModal: React.FC<{ handleClick: () => void }> = ({
  handleClick,
}) => {
  return <ModalWrapper title="Share" handleClick={handleClick}></ModalWrapper>;
};
