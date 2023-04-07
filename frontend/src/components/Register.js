import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props){
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  function handleChange(evt){
    const {name, value} = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  };

  function handleSubmit(evt){
    evt.preventDefault();
    const {email, password} = userData;
    props.handleRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={userData.email || ""}
          onChange={handleChange}/>
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={userData.password || ""}
          onChange={handleChange}/>
        <button className="auth__button" type="submit">Зарегистрироваться</button>
      </form>
      <p className="auth__subtitle">Уже зарегистрированы?
        <Link to="/sign-in" className="auth__link">Войти</Link>
      </p>
      <Link to="sign-in" className="auth__header-link">Войти</Link>
    </div>
  )
}

export default Register;