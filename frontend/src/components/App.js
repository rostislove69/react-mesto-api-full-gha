import { useState, useEffect } from "react";
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardContext } from "../contexts/CardContext.js";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import DeleteConfirmPopup from "./DeleteConfirmPopup.js";
import api from "../utils/Api.js";
import authApi from "../utils/MestoAuth.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip .js";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isFullImagePopupOpen, setIsFullImagePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopup] = useState(false);
  const [isInfoTolltipPopupOpen, setIsInfoTolltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    _id: "",
    avatar: "",
    email: "",
  });
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [err, setErr] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsFullImagePopupOpen(true);
  };

  function handleCardDelete(card) {
    setIsDeleteConfirmPopup(true);
    setCurrentCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsFullImagePopupOpen(false);
    setIsDeleteConfirmPopup(false);
    setIsInfoTolltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => ((c._id === card._id) ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data, setButtonText) {
    setButtonText("Сохранение...");
    api
      .updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data, setButtonText) {
    setButtonText("Сохранение...");
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data, setButtonText) {
    setButtonText("Создание...");
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleConfirmDeleteCard(setButtonText) {
    setButtonText("Удаление...");
    api
      .deleteCard(currentCard._id)
      .then(() => {
        setCards((items) =>
          items.filter((c) => c._id !== currentCard._id && c)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    authApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setCurrentUser({ ...currentUser, email: email });
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setIsInfoTolltipPopupOpen(true);
      });
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then(() => {
        setErr(false);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      })
      .finally(() => {
        setIsInfoTolltipPopupOpen(true);
      })
  }

  function updateLoggedState(value){
    setLoggedIn(value);
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .tokenCheck(jwt)
        .then((res) => {
          setCurrentUser({ ...currentUser, email: res.email });
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser({
            ...currentUser,
            name: userData.name,
            about: userData.about,
            _id: userData._id,
            avatar: userData.avatar,
          });
          setCards(cards);
        })
        .catch((err) => {
          console.log("Ошибка: ", err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <Header 
        isLogged={loggedIn}
        userData={currentUser}
        updateLoggedState={updateLoggedState}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
        />
        <DeleteConfirmPopup
          onDeleteConfirm={handleConfirmDeleteCard}
          isOpen={isDeleteConfirmPopupOpen}
          isClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isFullImagePopupOpen}
          isClose={closeAllPopups}
        />
        <InfoTooltip
          result={err}
          isClose={closeAllPopups}
          isOpen={isInfoTolltipPopupOpen}
          successMessage="Вы успешно зарегистрировались!"
          failMessage="Что-то пошло не так! Попробуйте ещё раз."
        />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
