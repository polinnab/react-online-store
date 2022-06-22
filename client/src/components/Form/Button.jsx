import React from "react";
import './button.scss';

const FormSubmitButton = ({ onSubmit, isDisabled, name, backgroundColor, color }) => {

    return(
        <button
        disabled={isDisabled}
        type="submit"
        className="FormSubmitButton"
        style={{backgroundColor, color}}
        onClick={onSubmit}>{name}</button>
    )
}

export default FormSubmitButton