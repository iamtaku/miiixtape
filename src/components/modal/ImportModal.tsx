import React from "react";
import { useFetchCache } from "../../queries/hooks";
import { useGlobalContext } from "../../state/context";
import { Collection } from "../../types/types";
import { Loading } from "../Shared";
import { Confirm } from "./Confirm";

export const ImportModal = (): JSX.Element => {
  const { state, dispatch } = useGlobalContext();
  const collectionCache = useFetchCache<Collection>([
    "collection",
    state.ui.currentModalId,
  ]);
  const handleConfirmClose = () => {
    dispatch({ type: "CLOSE_MODAL", payload: {} });
  };
  if (!collectionCache) return <Loading />;
  return (
    <Confirm data={collectionCache} handleConfirmClose={handleConfirmClose} />
  );
};
