import { ActionMap, UIPayload, UIType } from "../types";

export type UIActions = ActionMap<UIPayload>[keyof ActionMap<UIPayload>];

export const uiReducer = (state: UIType, action: UIActions): UIType => {
  switch (action.type) {
    case "OPEN_MODAL":
      if (
        action.payload.modalType === "ADD_MODAL" &&
        action.payload.currentModalId
      ) {
        return {
          ...state,
          isModalOpen: true,
          modalType: "ADD_MODAL",
          currentModalId: action.payload.currentModalId,
        };
      }

      if (
        action.payload.modalType === "SHARE_MODAL" &&
        action.payload.currentModalId
      ) {
        return {
          ...state,
          isModalOpen: true,
          modalType: "SHARE_MODAL",
          currentModalId: action.payload.currentModalId,
        };
      }
      if (action.payload.modalType === "ADD_ITEM_MODAL") {
        if (!action.payload.track) return state;
        return {
          ...state,
          isModalOpen: true,
          modalType: "ADD_ITEM_MODAL",
          currentTrack: action.payload.track,
        };
      }
      return state;
    case "CLOSE_MODAL":
      console.log(action.type);
      return {
        ...state,
        isModalOpen: false,
        modalType: null,
        currentModalId: null,
        currentTrack: null,
      };
    case "DISABLE_DROP":
      return {
        ...state,
        disabledSection: action.payload.section,
      };
    case "RESET_DROP":
      return {
        ...state,
        disabledSection: null,
      };
    default:
      return state;
  }
};
