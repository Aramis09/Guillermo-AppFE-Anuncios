import s from "./createCategory.module.scss";
import CreateSomething from "../../components/createSomething/createSomething";
import { useMakeRequest } from "../../hooks/useMakeRequest";

export default function CreateCategory() {
  const { makeNewRequest } = useMakeRequest({});

  const handleSaveItem = async (listItems: string[]) => {
    await makeNewRequest({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
      method: "POST",
      body: {
        categories: listItems,
      },
    })
      .then(() => alert("La categoria fue creada!"))
      .catch(() => alert("Hubo un error, contacte al desarrollador"));
  };

  return (
    <div className={s.container}>
      <div className={s.containerForm}>
        <CreateSomething onClickSave={handleSaveItem} />
      </div>
    </div>
  );
}
