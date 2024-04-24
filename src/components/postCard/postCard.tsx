// import s from "./postCard.module.scss";
import s from "./prueba.module.scss";

import { PostDetail } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import wppIcon from "../../assets/icons/wpp.svg";
import phoneIcon from "../../assets/icons/phone.svg";
import webIcon from "../../assets/icons/web.svg";
import linkIcon from "../../assets/icons/web.svg";
import editIcon from "../../assets/icons/edit.svg";

import { Link } from "react-router-dom";
import { useContextAuth } from "../../contexts/hooks/useContextAuth";

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);
  const [iconContact, setIconContact] = useState<string>("");
  const [slowlyShow, setSlowlyShow] = useState(postDetail.slowly);
  const contextAuth = useContextAuth();
  // const { statusUser } = useLogin();
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
    },
  });

  useEffect(() => {
    switch (postDetail.size.size) {
      case 1:
        setSyleSize(s.size1);
        break;
      case 2:
        setSyleSize(s.size2);
        break;
      case 3:
        setSyleSize(s.size3);
        break;
      case 4:
        setSyleSize(s.size4);
        break;
      default:
        setSyleSize(s.size1);
    }

    switch (postDetail.contactType) {
      case "whatsapp":
        setIconContact(wppIcon);
        break;
      case "direct-phone":
        setIconContact(phoneIcon);
        break;
      case "personal-page":
        setIconContact(webIcon);
        break;
      case "none":
        setIconContact(linkIcon);
        break;
      default:
        setIconContact("");
    }
  }, [postDetail.size.size]);
  const myImage = cld.image(postDetail.img);

  useEffect(() => {
    if (slowlyShow) {
      const time = generateRandomTime();

      setTimeout(() => {
        setSlowlyShow(false);
      }, time);
    }
  });

  const hanlderRedirectToContact = () => {
    if (
      postDetail.contactType === "personal-page" ||
      postDetail.contactType === "whatsapp"
    ) {
      window.location.href = postDetail.contactValue;
    }
    if (postDetail.contactType === "direct-phone") {
      navigator.clipboard.writeText(postDetail.contactValue);
      alert(
        `El telefono ${postDetail.contactValue} fue copiado en su portapapeles`
      );
    }
  };

  return (
    <div
      className={styleSize}
      style={{
        opacity: slowlyShow ? 0 : 1,
        transition: "all 0.5s",
      }}
    >
      <AdvancedImage cldImg={myImage} alt="image" />
      <div className={s.containerIcons}>
        {iconContact && iconContact !== "none" ? (
          <img
            src={iconContact}
            alt="contact"
            className={s.contact}
            onClick={hanlderRedirectToContact}
          />
        ) : (
          <></>
        )}
        {contextAuth?.statusUser.acces ? ( //!Esto me esta matando el rendimiento
          <Link to={`/edit/${postDetail.id}`} className={s.contact}>
            <img src={editIcon} alt="contact" className={s.contact} />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
function generateRandomTime() {
  // Generate a random number between 0.5 and 1.5 seconds
  const randomTime = Math.random() * 1 + 0.5;

  // Convert time from seconds to milliseconds
  const timeInMilliseconds = randomTime * 1000;

  return timeInMilliseconds;
}
