/**
 * 引入外部资源
 * */
import Vue from 'vue'

//  UI: vant
import './vant'
import 'styles/reset.css' // 基础样式重置，vant已有部分样式重置 normalize.less
import 'styles/vars.less' // vant自定义样式变量

/**
 * 设置 rem 基准值
 * body.fontSize = dpr * 2
 * html.fontSize = clientWidth / 10
 * */
import 'amfe-flexible'

// 封装vuex
import store from '@/store'
Vue.prototype.$store = store
