import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardContext } from "../contexts/CardContext.js";
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CardContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__two-columns">
          <button
            onClick={props.onEditAvatar}
            className="profile__edit-avatar"
            type="button"
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
          </button>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__edit-button"
                type="button"
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
