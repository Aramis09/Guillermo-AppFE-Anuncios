import { useMakeRequest } from "../../hooks/useMakeRequest";
import FormToSavePost from "./formToSavePost";

export default function CreatePost() {
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
      },
    });
  };

  return <FormToSavePost onSave={save} />;
}
