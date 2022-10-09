import { defineComponent, ref } from "vue";

export const App = defineComponent({
    setup() {
        const countRef = ref(0)
        const onClick = () => {
            countRef.value += 1
        }
        return () => <>
        <div>
            {countRef.value}
        </div>
        <div>
            <button onClick={onClick}>+1</button>
        </div>
        </>
    }
})
