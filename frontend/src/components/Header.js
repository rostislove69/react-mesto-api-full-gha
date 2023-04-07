import MestoLogo from "../images/MestoLogo.svg";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  
  function signOut(){
    localStorage.removeItem("jwt");
    props.updateLoggedState(false);
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img
        className="header__logo"
        src={MestoLogo}
        alt="Логотип проекта Mesto"
      />
      {props.isLogged && 
        <div className="header__container">
          <p className="header__user-email">{props.userData.email}</p>
          <button onClick={signOut} className="header__button">Выйти</button>
        </div> 
        }
    </header>
  );
}

export default Header;
