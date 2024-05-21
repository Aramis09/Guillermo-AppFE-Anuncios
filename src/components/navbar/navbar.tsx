import { Link, useLocation } from "react-router-dom";
import iconMain from "../../assets/icons/main.svg";
import iconEvents from "../../assets/icons/evets.svg";
import iconNews from "../../assets/icons/news.svg";
import iconSearch from "../../assets/icons/search.svg";
import iconPlus from "../../assets/icons/plus.svg";
import iconLogout from "../../assets/icons/logout.svg";

import s from "./navbar.module.scss";
import { useChangeStylesClick } from "../../hooks/useChangeStylesClick";
import { useContextAuth } from "../../contexts/hooks/useContextAuth";
import { useAppSelector } from "../../redux/hooks/hooks";

export default function Navbar() {
  const location = useLocation().pathname;
  const contextAuth = useContextAuth();
  const { categorySelected } = useAppSelector((state) => state.post);
  const { style, changeStyles } = useChangeStylesClick({
    styles: s,
    first: "containerHiden",
    second: "containerMobile",
  });

  const conditionMobile =
    window.innerWidth < 1024 && contextAuth?.statusUser.acces;

  return (
    <>
      {conditionMobile ? (
        <button className={s.mobileMenuButton} onClick={changeStyles}>
          X
        </button>
      ) : (
        <></>
      )}
      <div
        className={s.container}
        style={{ top: conditionMobile ? "2rem" : "0rem" }}
      >
        <Link
          to="/"
          className={s.links}
          // onClick={changeStyles}
          style={styleSelected("/", location, categorySelected)}
        >
          <img src={iconMain} alt="homeImg" />
          <p className={s.textHiden}>Principal</p>
        </Link>
        <Link
          to="/useful-info"
          className={s.links}
          // onClick={changeStyles}
          style={styleSelected("/useful-info", location, categorySelected)}
        >
          <img src={iconNews} alt="eventsImg" />
          <p className={s.textHiden}>Informacio Util</p>
        </Link>
        <Link
          to="/events"
          className={s.links}
          // onClick={changeStyles}
          style={styleSelected("/events", location, categorySelected)}
        >
          <img src={iconEvents} alt="eventsImg" />
          <p className={s.textHiden}>Eventos</p>
        </Link>
        {contextAuth?.statusUser.acces ? (
          <Link
            to="/search"
            className={s.linkSearch}
            onClick={changeStyles}
            style={styleSelected("/search", location, categorySelected)}
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
            ...styleSelected("/create", location, categorySelected),
            display:
              !contextAuth?.statusUser.acces || window.innerWidth < 1024
                ? "none"
                : "block",
          }}
        >
          <img src={iconPlus} alt="eventsImg" />
          <p className={s.textHiden}>Crear</p>
        </Link>
      </div>
      {conditionMobile ? (
        <div className={style}>
          <Link //!adasdklajksdjkaskd
            to="/create"
            className={s.linkAdmin}
            onClick={() => contextAuth?.logOutUser()}
            style={{
              display: !contextAuth?.statusUser.acces ? "none" : "flex",
            }}
          >
            <img src={iconLogout} alt="eventsImg" />
            <p className={s.textHiden}>Cerrar sesion</p>
          </Link>
          <Link
            to="/create"
            className={s.linkAdmin}
            onClick={changeStyles}
            style={{
              ...styleSelected("/create", location, categorySelected),
              display: !contextAuth?.statusUser.acces ? "none" : "flex",
            }}
          >
            <img src={iconPlus} alt="eventsImg" />
            <p className={s.textHiden}>Crear</p>
          </Link>
          <Link
            to="/search"
            className={s.linkSearch}
            onClick={changeStyles}
            style={{
              ...styleSelected("/search", location, categorySelected),
              display: !contextAuth?.statusUser.acces ? "none" : "flex",
            }}
          >
            <img src={iconSearch} alt="eventsImg" />
            <p className={s.textHiden}>Buscar anuncio</p>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
// Informacio Util    Principal
const styleSelected = (name: string, pathname: string, disable: boolean) => {
  if (disable) return {};
  if (name === pathname) {
    return {
      color: "#4CCD99",
    };
  }
};
