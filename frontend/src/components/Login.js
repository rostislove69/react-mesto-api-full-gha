import { useState } from "react";
import { Link } from "react-router-dom";

function Login(props){
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
    if (!userData.email || !userData.password){
      return;
    }
    const {email, password} = userData;
    props.handleLogin(email,password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={userData.email || ''}
          onChange={handleChange}/>
        <input
          className="auth__input"
          id="password"
          name="password" type="password"
          placeholder="Пароль"
          value={userData.password || ''}
          onChange={handleChange}/>
        <button className="auth__button" type="submit">Войти</button>
      </form>
      <Link to="/sign-up" className="auth__header-link">Регистрация</Link>
    </div>
  )
}

export default Login;