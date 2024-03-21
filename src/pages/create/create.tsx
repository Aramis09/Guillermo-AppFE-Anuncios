import s from './create.module.scss'
import { Link } from 'react-router-dom'

export default function Create() {
  return (
    <div className={s.container}>
        <Link to="/create-post" className={s.link}>Nuevo anuncio</Link>
        <Link to="/create-categories" className={s.link}>Nueva categoria</Link>
        <Link to="/create-sections" className={s.link}>Nueva seccion</Link>
    </div>
  ) 
}
