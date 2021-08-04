import { ActionMap, UIPayload, UIType } from "../types";

export type UIActions = ActionMap<UIPayload>[keyof ActionMap<UIPayload>];

export const uiReducer = (state: UIType, action: UIActions): UIType => {
  switch (action.type) {
    case "OPEN_MODAL":
      if (action.payload.modalType === "ADD_MODAL") {
        return {
          ...state,
          isModalOpen: true,
          modalType: "ADD_MODAL",
        };
      }

      if (action.payload.modalType === "SHARE_MODAL") {
        return {
          ...state,
          isModalOpen: true,
          modalType: "SHARE_MODAL",
        };
      }
      return state;
    case "CLOSE_MODAL":
      console.log(action.type);
      return {
        ...state,
        isModalOpen: false,
        modalType: null,
      };
    default:
      return state;
  }
};
