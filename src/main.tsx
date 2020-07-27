import { defineComponent , createApp, h} from 'vue'

import { createUseStyles, JssProvider } from '../lib'

const useStyle = createUseStyles({
  div: {
    color: 'red'
  }
})

const App = defineComponent({
  setup() {

    const classes = useStyle({})

    return () => {
      const cx = classes.value

      const props: any = {
        class: cx.div
      }

      return <div {...props}>123</div>
    }
  }
})

const Main = () => h(JssProvider, null, {
  default: () => App
})

createApp(Main).mount('#app')
