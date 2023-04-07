import { useEffect } from "react";

function PopupWithForm(props) {
  useEffect(() => {
    if(!props.isOpen) return;

    const onKeypress = (evt) => {
      if (evt.key === "Escape") {
        props.isClose();
      }
    };

    document.addEventListener("keydown", onKeypress);
  
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, [props.isOpen]);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name="form"
          onSubmit={props.onSubmit}
        >
          <button
            onClick={props.isClose}
            className={`popup__button-close popup__button-close_type_${props.name}`}
            type="button"
          ></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className={`popup__button-submit button-submit-${props.name}`}
            type="submit"
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
