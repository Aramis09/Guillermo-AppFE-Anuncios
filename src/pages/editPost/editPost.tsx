import s from "./editPost.module.scss";
import FormToSavePost from "../createPost/formToSavePost";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import ImagesCloudinary from "../../components/imagesCloudinary/imagesCloudinary";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { makeNewRequest } = useMakeRequest({});
  const [publicId, setPublicId] = useState<string>("");
  const { id } = useParams();

  const hanlderEditPost = async ({
    contactType,
    contactValue,
    importance,
    section,
    size,
    categoriesSelected,
    publicId,
  }: {
    size: string;
    importance: string;
    section: string;
    contactValue: string;
    contactType: string;
    publicId: string;
    categoriesSelected: string[];
  }) => {
    await makeNewRequest<void>({
      method: "PUT",
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
      body: {
        id,
        size,
        importance,
        section,
        img: publicId,
        categories: categoriesSelected,
        contactValue,
        contactType,
      },
    });
    window.location.href = "/";
  };

  return (
    <div className={s.container}>
      <FormToSavePost
        onSave={hanlderEditPost}
        title="Editar anuncio"
        required={false}
        setPublicId={setPublicId}
        publicId={publicId}
      />
      <div className={s.containerImages} style={{ width: "50%" }}>
        <ImagesCloudinary setImage={setPublicId} image={publicId} />
      </div>
    </div>
  );
}
