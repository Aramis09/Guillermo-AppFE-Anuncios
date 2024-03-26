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

interface Props {
  postDetail: PostDetail;
}

export default function PostCard({ postDetail }: Props) {
  const [styleSize, setSyleSize] = useState<string>(s.size1);
  const [iconContact, setIconContact] = useState<string>("");
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
    console.log(postDetail);

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
    console.log("Entro ??");
    if (
      postDetail.contactType === "personal-page" ||
      postDetail.contactType === "whatsapp"
    ) {
      window.location.href = postDetail.contactValue;
    }
  };

  return (
    <div className={styleSize}>
      {/* <h3 style={{ color: "black" }}>
        {postDetail.importance.importance} {postDetail.size.size}
      </h3> */}
      {/* <img src={postDetail.img} alt="image" className={styleSize} /> */}
      <AdvancedImage cldImg={myImage} alt="image" />
      {!!iconContact ? (
        <img
          src={iconContact}
          alt="contact"
          className={s.contact}
          onClick={hanlderRedirectToContact}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
