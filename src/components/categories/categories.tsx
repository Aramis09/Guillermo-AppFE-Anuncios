import s from "./categories.module.scss";
import { useContextAuth } from "../../contexts/hooks/useContextAuth";
import { useGetCategoryListQuery } from "../../redux/services/apiPost";

interface Props {
  positionCoordinates?: string;
  onClick: ({ categorySelected }: { categorySelected: string }) => void;
  valueSelected?: string;
  showType?: "table" | "select";
  iconItemsTableSrc?: string;
}

export default function Categories({
  onClick,
  valueSelected,
  showType = "select",
  iconItemsTableSrc,
}: Props) {
  const contextAuth = useContextAuth();

  const { data: categories } = useGetCategoryListQuery();

  const handleCategoriesSelected = async (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onClick({ categorySelected: evt.target.value });
  };
  if (showType === "select")
    return (
      <select
        name="categories"
        id="categories"
        required
        value={valueSelected || ""}
        onChange={handleCategoriesSelected}
        className={s.container}
        style={{
          top:
            contextAuth && contextAuth.statusUser.acces ? "126px" : undefined,
        }}
      >
        <option value="" disabled selected>
          Elija una categoria
        </option>
        <option value="delete">Sin filtro</option>
        {categories?.data.map((category) => (
          <option
            key={category.id}
            value={category.name}
            style={
              valueSelected === category.name
                ? {
                    backgroundColor: "#136fc6",
                    color: "white",
                  }
                : undefined
            }
          >
            {category.name}
          </option>
        ))}
      </select>
    );

  if (showType === "table")
    return (
      <div className={s.containerTable}>
        {categories?.data.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              onClick({
                categorySelected: category.name,
              })
            }
            className={s.itemTable}
            style={
              valueSelected === category.name
                ? {
                    backgroundColor: "#136fc6",
                    color: "white",
                  }
                : undefined
            }
          >
            <p>{category.name}</p>
            <img src={iconItemsTableSrc} alt="iconAction" />
          </div>
        ))}
      </div>
    );
}
