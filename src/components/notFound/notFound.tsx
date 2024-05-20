import s from "./notFound.module.scss";
import notFoundIcon from "../../assets/icons/404.svg";

export default function NotFound() {
  return (
    <div className={s.container}>
      <p>No se encontro la pagina... :*(</p>
      <img src={notFoundIcon} alt="404" />
    </div>
  );
}
