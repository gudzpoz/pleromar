import { createApp } from 'vue'
import App from './App.vue'
import mdiVue from 'mdi-vue/v3'
import { mdiWeb, mdiEmail, mdiLock, mdiLockOpenVariant } from '@mdi/js'

document.getElementById('start').onclick = () => {
  createApp(App)
    .use(mdiVue, {
      icons: {
        mdiWeb, mdiEmail, mdiLock, mdiLockOpenVariant
      },
    })
    .mount('#app')
  document.getElementById('start').style.display = 'none'
}
