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

import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);
  const [iconContact, setIconContact] = useState<string>("");

  const { statusUser } = useLogin();
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
    <div className={styleSize}>
      <AdvancedImage cldImg={myImage} alt="image" />
      <div className={s.containerIcons}>
        {iconContact ? (
          <img
            src={iconContact}
            alt="contact"
            className={s.contact}
            onClick={hanlderRedirectToContact}
          />
        ) : (
          <></>
        )}
        {statusUser.acces ? (
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
