import s from "./presentations.module.scss";
import imgBk from "../../assets/images/bk.jpg";
import { Link } from "react-router-dom";
import { useContextAuth } from "../../contexts/hooks/useContextAuth";
import shareicon from "../../assets/icons/share.svg";

export default function Presentation() {
  const contextAuth = useContextAuth();

  const handlerShareSite = () => {
    navigator.share({
      text: "Busca lo que necesitas en Parque Patriciois",
      url: `${window.origin}`,
    });
  };

  return (
    <div
      className={s.container}
      style={{ top: contextAuth?.statusUser ? "70px" : undefined }}
    >
      <img src={imgBk} alt="background" />
      <div className={s.containerText}>
        <h2 className={s.containerBigText}>
          Comercial
          <br /> <span>PARQUE PATRICIOS</span>
        </h2>
        <p>
          Ud. encontrara Información útil, anuncios y eventos del barrio...
          <br />
          {/* todo para hacer de nuestro barrio cada dia mejor... */}
        </p>
        <div className={s.containerLinks}>
          <button onClick={handlerShareSite} className={s.share}>
            <img src={shareicon} alt="share" />
          </button>
          <Link to="/contact" className={s.button}>
            PUBLICITE AQUI
          </Link>
        </div>
      </div>
    </div>
  );
}
