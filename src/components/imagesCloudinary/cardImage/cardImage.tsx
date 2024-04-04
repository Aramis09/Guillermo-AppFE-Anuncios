import s from "./cardImage.module.scss";
import { ImageCloudinaryDetail } from "../../../interfaces/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import addIcon from "../../../assets/icons/plus.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useState } from "react";

interface Props {
  imageData: ImageCloudinaryDetail;
  selectedPublicId: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  onDelete: (publicId: string) => Promise<boolean>;
}

export default function CardImage({
  onSelect,
  imageData,
  selectedPublicId = "",
  onDelete,
}: Props) {
  const [hiden, setHiden] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_SOME_CLOUD_NAME,
    },
  });
  const imageToShow = cld.image(imageData.public_id);
  const hanlderDelete = async () => {
    const res = await onDelete(imageData.public_id);
    if (res) return setHiden(res);
    setHiden(false);
  };
  return (
    <div
      className={s.container}
      style={styleSelected(selectedPublicId, imageData.public_id, hiden)}
    >
      <AdvancedImage cldImg={imageToShow} alt="image" />
      <img
        src={addIcon}
        alt="addImage"
        className={s.iconAdd}
        onClick={() => onSelect(imageData.public_id)}
      />
      <img
        src={deleteIcon}
        alt="deleteImage"
        onClick={async () => await hanlderDelete()}
        className={s.iconDelete}
      />
    </div>
  );
}

const styleSelected = (
  selectedPublicId: string,
  publicId: string,
  hiden: boolean
) => {
  if (selectedPublicId === publicId) {
    return {
      boxShadow: "0px 0px 20px rgb(47, 137, 255)",
    };
  }

  if (hiden) {
    return {
      transition: "all 0.2s",
      opacity: 0,
    };
  }
};
