import { useEffect } from "react";

function ImagePopup(props) {
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
    <div className={`popup popup_type_full-image ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <button
          onClick={props.isClose}
          className="popup__button-close popup__button-close_type_full-image"
          type="button"
        ></button>
        <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card.name} />
        <p className="popup__image-name">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
