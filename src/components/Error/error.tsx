import s from "./error.module.scss";
import errorImage from "../../assets/icons/error.svg";

export default function Error() {
  return (
    <div className={s.container}>
      Lo sentimos, hubo un error ! <br />
      Intente recargar la pagina
      <img src={errorImage} alt="Error!" />
    </div>
  );
}
