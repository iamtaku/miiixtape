import React, { useState } from "react";
import { Collection } from "../../types/types";
import { AddbyExisting } from "./AddbyExisting";
import { AddByUrl } from "./AddByUrl";
import { Confirm } from "./Confirm";
import { Modal as ModalWrapper } from "./index";

export const AddModal = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [data, setData] = useState<Collection>();

  const handleFetch = async (collection: Collection) => {
    setData(collection);
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => setIsConfirmOpen(false);

  return (
    // <ModalWrapper>
    <>
      <p>Add modal inside</p>
      {isConfirmOpen && data ? (
        <Confirm data={data} handleConfirmClose={handleConfirmClose} />
      ) : (
        <>
          <AddByUrl handleFetch={handleFetch} />
          <AddbyExisting />
        </>
      )}
    </>
    // </ModalWrapper>
  );
};
