import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    deleteClass: "animate__fadeIn"
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            };
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            };
        case types.uiChangeDeleteClass:
            return {
                ...state,
                deleteClass: "animate__fadeOut",
            };
        default:
            return state;
    }
};