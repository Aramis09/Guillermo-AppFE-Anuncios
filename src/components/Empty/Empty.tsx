import s from "./empty.module.scss";
import smileIcon from "../../assets/icons/smile.svg";

export default function Empty() {
  return (
    <div className={s.container}>
      No hay anuncios !!
      <img src={smileIcon} alt="smile" />
    </div>
  );
}
