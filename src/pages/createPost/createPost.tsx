import { useState } from "react";
import s from "./createPost.module.scss";

import FormToSavePost from "./formToSavePost";
import ImagesCloudinary from "../../components/imagesCloudinary/imagesCloudinary";
import { ParamsHanlderCreatePost } from "../../interfaces/interfaces";
import { useCreatePostMutation } from "../../redux/services/apiPost";

export default function CreatePost() {
  const [publicId, setPublicId] = useState<string>("");
  const [createPost] = useCreatePostMutation();
  const save = async ({
    contactType,
    contactValue,
    importance,
    section,
    size,
    categoriesSelected,
    publicId,
    owner,
    expire,
  }: ParamsHanlderCreatePost) => {
    createPost({
      size,
      importance,
      section,
      img: publicId,
      categories: categoriesSelected,
      contactValue,
      contactType,
      owner,
      expire,
    })
      .then(() => alert("El anuncio fue creado!"))
      .catch(() => alert("Hubo un error, contacte al desarrollador"));
  };

  return (
    <div className={s.container}>
      <FormToSavePost
        onSave={save}
        setPublicId={setPublicId}
        publicId={publicId}
      />
      <div className={s.containerImages}>
        <ImagesCloudinary setImage={setPublicId} image={publicId} />
      </div>
    </div>
  );
}
