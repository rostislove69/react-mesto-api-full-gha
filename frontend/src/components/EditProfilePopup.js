import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setButtonText("Сохранить");
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt){
    setName(evt.target.value);
  }

  function handleChangeAbout(evt){
    setAbout(evt.target.value);
  }

  function handleSubmit(evt){
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about
    }, setButtonText);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={buttonText}
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      isClose={props.isClose}
    >
      <label className="popup__field">
        <input
          onChange={handleChangeName}
          className="popup__input popup__input_type_user-name"
          id="user-name-input"
          type="text"
          placeholder="Имя"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
        />
        <span className="popup__input-error user-name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          onChange={handleChangeAbout}
          className="popup__input popup__input_type_user-about"
          id="user-about-input"
          type="text"
          placeholder="О себе"
          name="about"
          required
          minLength="2"
          maxLength="200"
          value={about || ""}
        />
        <span className="popup__input-error user-about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
