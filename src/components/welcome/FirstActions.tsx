import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
export const FirstActions = () => (
    <div class={s.actions}>
        <RouterLink class={s.fake} replace to="/start" >跳过</RouterLink>
        <RouterLink replace to="/welcome/2" >下一页</RouterLink>
        <RouterLink to="/start" >跳过</RouterLink>
    </div>
)

FirstActions.displayName = 'FirstActions'