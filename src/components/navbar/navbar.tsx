import { Link } from "react-router-dom";
import s from "./navbar.module.scss";

export default function Navbar() {
  return (
    <div className={s.container}>
      <Link to="/" className={s.links}>
        Principal
      </Link>
      <Link to="/useful-info" className={s.links}>
        Informacio Util
      </Link>
      <Link to="/events" className={s.links}>
        Eventos
      </Link>
    </div>
  );
}
