import s from "./editPost.module.scss";
import FormToSavePost from "../createPost/formToSavePost";
import { useMakeRequest } from "../../hooks/useMakeRequest";

export default function EditPost() {
  const { makeNewRequest } = useMakeRequest({});
  const save = async ({
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
    console.log(contactType);

    await makeNewRequest<void>({
      method: "PUT",
      url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
      body: {
        size,
        importance,
        section,
        img: publicId,
        categories: categoriesSelected,
        contactValue,
        contactType,
      },
    });
  };

  return (
    <FormToSavePost onSave={save} title="Editar anuncio" required={false} />
  );
}
