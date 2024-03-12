import { Link, useLocation } from "react-router-dom";
import s from "./navbar.module.scss";

export default function Navbar() {
  const location = useLocation().pathname;
  console.log(location);

  return (
    <div className={s.container}>
      <Link to="/" className={s.links} style={styleSelected("/", location)}>
        Principal
      </Link>
      <Link
        to="/useful-info"
        className={s.links}
        style={styleSelected("/useful-info", location)}
      >
        Informacio Util
      </Link>
      <Link
        to="/events"
        className={s.links}
        style={styleSelected("/events", location)}
      >
        Eventos
      </Link>
    </div>
  );
}

const styleSelected = (name: string, pathname: string) => {
  if (name === pathname) {
    return {
      color: "red",
    };
  }
};
