import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const picturesNameRef = useRef();
  const picturesLinkRef = useRef();
  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    picturesNameRef.current.value = "";
    picturesLinkRef.current.value = "";
    setButtonText("Создать")
  }, [props.isOpen]);

  function handleSubmit(evt){
    evt.preventDefault();
    props.onAddPlace({
      name: picturesNameRef.current.value,
      link: picturesLinkRef.current.value
    }, setButtonText)
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={buttonText}
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      isClose={props.isClose}
    >
      <label className="popup__field">
        <input
          ref={picturesNameRef}
          className="popup__input popup__input_type_pictures-name"
          id="pictures-name-input"
          type="text"
          placeholder="Название"
          name="name"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error pictures-name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          ref={picturesLinkRef}
          className="popup__input popup__input_type_pictures-link"
          id="pictures-link-input"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
        />
        <span className="popup__input-error pictures-link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
