import { Link, useLocation } from "react-router-dom";
import iconMain from "../../assets/icons/main.svg";
import iconEvents from "../../assets/icons/evets.svg";
import iconNews from "../../assets/icons/news.svg";
import iconUser from "../../assets/icons/user.svg";
import iconPlus from "../../assets/icons/plus.svg";

import s from "./navbar.module.scss";
import useLogin from "../../hooks/useLogin";

export default function Navbar() {
  const location = useLocation().pathname;
  const { statusUser, logOutUser } = useLogin();

  return (
    <div className={s.container}>
      <Link to="/" className={s.links} style={styleSelected("/", location)}>
        <img src={iconMain} alt="homeImg" />
        <p className={s.textHiden}>Principal</p>
      </Link>
      <Link
        to="/useful-info"
        className={s.links}
        style={styleSelected("/useful-info", location)}
      >
        <img src={iconNews} alt="eventsImg" />
        <p className={s.textHiden}>Informacio Util</p>
      </Link>
      <Link
        to="/events"
        className={s.links}
        style={styleSelected("/events", location)}
      >
        <img src={iconEvents} alt="eventsImg" />
        <p className={s.textHiden}>Eventos</p>
      </Link>
      <Link
        to={!statusUser.acces ? "/login" : "/" + location}
        className={s.linkUser}
        style={styleSelected("/login", location)}
        onClick={logOutUser}
      >
        <img src={iconUser} alt="eventsImg" />
        <p className={s.textHiden}>{!statusUser.acces ? "Login" : "Log Out"}</p>
      </Link>

      <Link
        to="/create"
        className={s.linkAdmin}
        style={{
          ...styleSelected("/create", location),
          display: !statusUser.acces ? "none" : "block",
        }}
      >
        <img src={iconPlus} alt="eventsImg" />
        <p className={s.textHiden}>Crear</p>
      </Link>
    </div>
  );
}
// Informacio Util    Principal
const styleSelected = (name: string, pathname: string) => {
  if (name === pathname) {
    return {
      color: "#4CCD99",
    };
  }
};
