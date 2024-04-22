import { useState } from "react";
import s from "./createPost.module.scss";

import { useMakeRequest } from "../../hooks/useMakeRequest";
import FormToSavePost from "./formToSavePost";
import ImagesCloudinary from "../../components/imagesCloudinary/imagesCloudinary";

export default function CreatePost() {
  const { makeNewRequest } = useMakeRequest({});
  const [publicId, setPublicId] = useState<string>("");

  const save = async ({
    contactType,
    contactValue,
    importance,
    section,
    size,
    categoriesSelected,
    publicId,
    owner,
  }: {
    size: string;
    importance: string;
    section: string;
    contactValue: string;
    contactType: string;
    publicId: string;
    categoriesSelected: string[];
    owner: string;
  }) => {
    await makeNewRequest<void>({
      method: "POST",
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
      body: {
        size,
        importance,
        section,
        img: publicId,
        categories: categoriesSelected,
        contactValue,
        contactType,
        owner,
      },
    });
    // alert("El anuncio fue creado");
    // window.location.href = "/";
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
