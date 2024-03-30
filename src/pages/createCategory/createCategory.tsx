import s from "./createCategory.module.scss";
import CreateSomething from "../../components/createSomething/createSomething";
import { useMakeRequest } from "../../hooks/useMakeRequest";

export default function CreateCategory() {
  const { makeNewRequest } = useMakeRequest({});

  const handleSaveItem = async (listItems: string[]) => {
    console.log(listItems, "<<---- list");

    await makeNewRequest({
      url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
      method: "POST",
      body: {
        categories: listItems
      }
    }).then(r => alert(JSON.stringify(r))).catch(e => JSON.stringify(e));
  };

  return (
    <div className={s.container}>
      <div className={s.containerForm}>
        <CreateSomething onClickSave={handleSaveItem} />
      </div>
    </div>
  );
}
