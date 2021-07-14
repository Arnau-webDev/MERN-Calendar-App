import React from "react";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const AddNewFab = () => {

    const uiDispatch = useDispatch(uiReducer);

    const handleModalOpen = () => {
        uiDispatch(uiOpenModal());
    };

    return (
        <button className="btn btn-primary fab" onClick={handleModalOpen}>
            <i className="fas fa-plus"></i>
        </button>
    );
};

export default AddNewFab;
