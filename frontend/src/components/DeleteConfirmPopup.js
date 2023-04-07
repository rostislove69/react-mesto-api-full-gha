import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function DeleteConfirmPopup(props){
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setButtonText("Да");
  },[props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteConfirm(setButtonText);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={buttonText}
      name="delete-confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      isClose={props.isClose}
    />
  );
}

export default DeleteConfirmPopup;