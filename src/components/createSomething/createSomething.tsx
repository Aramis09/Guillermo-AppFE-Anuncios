import React, { useState } from "react";
import s from "./s.module.scss";
import { Button, ButtonRound } from "../../styledComponents/Button";

interface Props {
  onClickSave: (listItems: string[]) => Promise<void>;
}

export default function CreateSomething({ onClickSave }: Props) {
  const [itemsList, setItemList] = useState<string[]>([]);

  const handleAddItem = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const fields = Object.fromEntries(new window.FormData(form));
    const newItem = fields["item"] as string;
    setItemList((prev) => [...prev, newItem]);
    form.reset();
  };

  const removeItemFromList = (itemToRemove: string) => {
    setItemList((prev) => prev.filter((itemIn) => itemIn !== itemToRemove));
  };

  const saveItems = async () => {
    if (!itemsList.length) alert("Antes de guardar agregue algun item");
    await onClickSave(itemsList);
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleAddItem}>
        <input type="text" name="item" placeholder="Agrega  los nombres" />
        <ButtonRound className={s.buttonAddItem} type="submit">
          +
        </ButtonRound>
      </form>
      <ul>
        {itemsList.map((item) => (
          <li key={crypto.randomUUID()}>
            {item}{" "}
            <ButtonRound onClick={() => removeItemFromList(item)}>
              x
            </ButtonRound>
          </li>
        ))}
      </ul>
      <Button className={s.save} onClick={saveItems}>
        Guardar
      </Button>
    </div>
  );
}
