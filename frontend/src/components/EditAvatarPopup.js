import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    avatarRef.current.value = "";
    setButtonText("Сохранить")
  }, [props.isOpen]);

  function handleSubmit(evt){
    evt.preventDefault();
    props.onUpdateAvatar({
      link: avatarRef.current.value
    }, setButtonText)
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={buttonText}
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      isClose={props.isClose}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_pictures-name"
          id="avatar-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
