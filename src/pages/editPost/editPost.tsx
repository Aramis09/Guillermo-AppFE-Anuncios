import s from "./editPost.module.scss";
import FormToSavePost from "../createPost/formToSavePost";
import { useMakeRequest } from "../../hooks/useMakeRequest";
import ImagesCloudinary from "../../components/imagesCloudinary/imagesCloudinary";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponseGetDetailPost } from "../../interfaces/interfaces";
import { Button } from "../../styledComponents/Button";
import { useDeletePostMutation } from "../../redux/services/apiPost";

export default function EditPost() {
  const navigate = useNavigate();
  const { makeNewRequest } = useMakeRequest({});
  const [publicId, setPublicId] = useState<string>("");
  const { id } = useParams();
  const { result: postDetail } = useMakeRequest<ResponseGetDetailPost>({
    url: `${import.meta.env.VITE_SOME_BASE_URL}/posting/getPostDetail?id=${id}`,
  });
  const [deletePost] = useDeletePostMutation();
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

  const hanlderDeletePost = () => {
    const responseUser = confirm(
      "Estas seguro de que quiere borrar definitivamente el post ?"
    );
    if (!responseUser) return;
    if (!id) return alert("No se puro borrar, recargue la pagina");
    deletePost(id)
      .then(() => {
        alert("Borrado con exito");
        navigate("/");
      })
      .catch(() => alert("No se pudo borrar..."));
  };

  if (!postDetail) return <>No hay datos de este publicacion</>;
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
      <Button onClick={hanlderDeletePost} className={s.buttonDelete}>
        Borrar
      </Button>
      <div className={s.currentData}>
        <p>Nombre Cliente: {postDetail?.data.owner}</p>
        <p>
          Fecha de expiracion:{" "}
          {new Date(postDetail.data.expire).toLocaleDateString()}
        </p>
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
      <div className={s.containerImages} style={{ width: "100%" }}>
        <ImagesCloudinary setImage={setPublicId} image={publicId} />
      </div>
    </div>
  );
}
