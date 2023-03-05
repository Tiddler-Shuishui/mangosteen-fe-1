import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { SkipFeatures } from '../../shared/SkipFeatures';
export const FirstActions = () => (
    <div class={s.actions}>
        <SkipFeatures class={s.fake} />
        <RouterLink replace to="/welcome/2" >下一页</RouterLink>
        <SkipFeatures/>
    </div>
)

FirstActions.displayName = 'FirstActions'