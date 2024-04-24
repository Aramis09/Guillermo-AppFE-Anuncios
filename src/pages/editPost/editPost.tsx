import s from "./editPost.module.scss";
import FormToSavePost from "../createPost/formToSavePost";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import ImagesCloudinary from "../../components/imagesCloudinary/imagesCloudinary";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ResponseGetDetailPost } from "../../interfaces/interfaces";

export default function EditPost() {
  const { makeNewRequest } = useMakeRequest({});
  const [publicId, setPublicId] = useState<string>("");
  const { id } = useParams();
  const { result: postDetail } = useMakeRequest<ResponseGetDetailPost>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/posting/getPostDetail?id=${id}`,
  });

  const hanlderEditPost = async ({
    contactType,
    contactValue,
    importance,
    section,
    size,
    categoriesSelected,
    publicId,
    owner,
    expire,
  }: {
    size: string;
    importance: string;
    section: string;
    contactValue: string;
    contactType: string;
    publicId: string;
    categoriesSelected: string[];
    owner: string;
    expire: string;
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
        owner,
        expire,
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
        titleButton="Editar"
      />
      <div>
        <p>Nombre Cliente: {postDetail?.data.owner}</p>
        <p>Fecha de expiracion: {postDetail?.data.expire}</p>
        <p>Tipo de contacto: {postDetail?.data.contactType}</p>
        <p>Contacto: {postDetail?.data.contactValue}</p>
        <p>Categorias: {postDetail?.data.section.name}</p>
        <p>Importancia: {postDetail?.data.importance.importance}</p>
        <p>Tamaño: {postDetail?.data.size.size}</p>
        <p>Categorias: </p>
        {postDetail?.data.categories.map((cat) => (
          <p>{cat.name}</p>
        ))}
      </div>
      <div className={s.containerImages} style={{ width: "50%" }}>
        <ImagesCloudinary setImage={setPublicId} image={publicId} />
      </div>
    </div>
  );
}
