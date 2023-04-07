import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  return (
    <li className="elements__element">
      {isOwn && (
        <button
          className="elements__delete-button"
          onClick={() => props.onCardDelete(props.card)}
        />
      )}
      <img
        className="elements__image"
        onClick={() => props.onCardClick(props.card)}
        src={props.link}
        alt={props.name}
      />
      <div className="elements__block">
        <h2 className="elements__name">{props.name}</h2>
        <div className="elements__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => props.onCardLike(props.card)}
          ></button>
          <p className="elements__like-counter">{props.likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
