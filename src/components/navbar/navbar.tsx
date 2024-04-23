import { Link, useLocation } from "react-router-dom";
import iconMain from "../../assets/icons/main.svg";
import iconEvents from "../../assets/icons/evets.svg";
import iconNews from "../../assets/icons/news.svg";
import iconSearch from "../../assets/icons/search.svg";
import iconPlus from "../../assets/icons/plus.svg";

import s from "./navbar.module.scss";
import useLogin from "../../hooks/useLogin";
import { useChangeStylesClick } from "../../hooks/useChangeStylesClick";

export default function Navbar() {
  const location = useLocation().pathname;
  const { statusUser } = useLogin();

  const { style, changeStyles } = useChangeStylesClick({
    styles: s,
    first: "containerHiden",
    second: "container",
  });

  return (
    <>
      <button className={s.mobileMenuButton} onClick={changeStyles}>
        X
      </button>
      <div className={style}>
        <Link
          to="/"
          className={s.links}
          onClick={changeStyles}
          style={styleSelected("/", location)}
        >
          <img src={iconMain} alt="homeImg" />
          <p className={s.textHiden}>Principal</p>
        </Link>
        <Link
          to="/useful-info"
          className={s.links}
          onClick={changeStyles}
          style={styleSelected("/useful-info", location)}
        >
          <img src={iconNews} alt="eventsImg" />
          <p className={s.textHiden}>Informacio Util</p>
        </Link>
        <Link
          to="/events"
          className={s.links}
          onClick={changeStyles}
          style={styleSelected("/events", location)}
        >
          <img src={iconEvents} alt="eventsImg" />
          <p className={s.textHiden}>Eventos</p>
        </Link>
        {statusUser.acces ? (
          <Link
            to="/search"
            className={s.linkSearch}
            onClick={changeStyles}
            style={styleSelected("/search", location)}
          >
            <img src={iconSearch} alt="eventsImg" />
            <p className={s.textHiden}>Buscar anuncio</p>
          </Link>
        ) : (
          <></>
        )}

        <Link
          to="/create"
          className={s.linkAdmin}
          onClick={changeStyles}
          style={{
            ...styleSelected("/create", location),
            display: !statusUser.acces ? "none" : "block",
          }}
        >
          <img src={iconPlus} alt="eventsImg" />
          <p className={s.textHiden}>Crear</p>
        </Link>
      </div>
    </>
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
