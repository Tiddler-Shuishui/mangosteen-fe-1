import s from './welcome.module.scss'
import pig from '../../assets/icons/pig.svg'
export const First = () => (
  <div class={s.card}>
    <img src={pig}/>
    <h2>会挣钱<br />还会省钱</h2>
  </div>
)

First.displayName = 'First'