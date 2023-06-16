import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "external-svg-loader";

createApp(App)
  .use(router)
  .mount('#app');

