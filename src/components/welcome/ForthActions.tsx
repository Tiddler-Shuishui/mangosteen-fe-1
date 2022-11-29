import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
export const ForthActions = () => (
  <div class={s.actions}>
    <RouterLink class={s.fake} replace to="/start" >跳过</RouterLink>
    <RouterLink replace to="/start" >完成</RouterLink>
    <RouterLink class={s.fake} replace to="/start" >跳过</RouterLink>
  </div>
)

ForthActions.displayName = 'ForthActions'