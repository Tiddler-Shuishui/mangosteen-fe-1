import { defineComponent } from "vue";
import './App.scss';

export const App = defineComponent({
    setup() {
        return () => <>
        <header>
            <ul>
                <li>
                    <routerLink to="/">Go to Home</routerLink>
                </li>
                <li>
                    <routerLink to="/about">Go to About</routerLink>
                </li>
            </ul>
        </header>
        <div>
            <routerView></routerView>
        </div>
        </>
    }
})
