/**
 * 全局按需引入 vant 常用组件
 * */

import Vue from "vue";
import { Button, Icon, Image as VanImage, Toast, Dialog } from "vant";

// 桌面端适配 mouse 事件
import "@vant/touch-emulator";

Vue.use(Button);
Vue.use(Icon);
Vue.use(VanImage);
// Vue.use(Toast);
// Vue.use(Dialog);

// 修改默认配置
Dialog.setDefaultOptions({
  showCancelButton: true
});
Toast.setDefaultOptions({
  duration: 3000,
  position: "bottom"
});
// Notify.setDefaultOptions({
//   type: "warning",
//   duration: 5000,
//   color: "#999",
//   background: "#ffe1e1"
// });

// Vue.prototype.$toast = Toast; // 自动挂载
// Vue.prototype.$dialog = Dialog; // 自动挂载
