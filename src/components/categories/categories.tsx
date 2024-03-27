import s from './categories.module.scss'
import { useMakeRequest } from '../../hooks/useMakeRequest'
import { ResponseGetAllCategories } from '../../interfaces/interfaces';

interface Props {
    positionCoordinates: string
}

export default function Categories({ }: Props) {
    const { result: categories, makeNewRequest } = useMakeRequest<ResponseGetAllCategories>({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
    });

    const handleCategoriesSelected = async (evt: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(evt.target.value);
        await makeNewRequest({
            url: `${import.meta.env.VITE_SOME_BASE_URL}/posting/getListFiltered`
        })
    }

    return (
        <select name="categories" id="categories" required onChange={handleCategoriesSelected} className={s.container}>
            <option value="" disabled selected>
                Elija una categoria
            </option>
            {categories?.data.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
        </select>
    )
}
