import s from "./createCategory.module.scss";
import CreateSomething from "../../components/createSomething/createSomething";
import { useNavigate } from "react-router-dom";
import Categories from "../../components/categories/categories";
import iconDelete from "../../assets/icons/delete.svg";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/services/apiPost";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleSaveItem = async (listItems: string[]) => {
    createCategory({
      categories: listItems,
    })
      .then(() => {
        alert("La categoria fue creada!");
        navigate("/create");
      })
      .catch(() => alert("Hubo un error, contacte al desarrollador"));
  };

  const hanlderDeleteCategory = ({
    categorySelected,
  }: {
    categorySelected: string;
  }) => {
    deleteCategory(categorySelected)
      .then(() => alert("Categoria borrada"))
      .catch(() => alert("Ocurrio un error al borrar"));
  };

  return (
    <div className={s.container}>
      <div className={s.containerForm}>
        <CreateSomething onClickSave={handleSaveItem} />
      </div>
      <Categories
        onClick={hanlderDeleteCategory}
        showType="table"
        iconItemsTableSrc={iconDelete}
      />
    </div>
  );
}
