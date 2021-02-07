/**
 * vue 全局 CLI 配置
 * https://cli.vuejs.org/zh/config/#vue-config-js
 */
// yarn add -D postcss-pxtorem compression-webpack-plugin script-ext-html-webpack-plugin image-webpack-loader

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// 是否为生产环境
const isProduction = process.env.NODE_ENV === "production";

// 将单位转化为 rem，文档：https://github.com/cuth/postcss-pxtorem
// 行内样式不会转换
const pxtorem = require("postcss-pxtorem");

// 适配不同浏览器样式
const autoprefixer = require("autoprefixer");

// gzip压缩
const CompressionWebpackPlugin = require("compression-webpack-plugin");

// 代码压缩 uglifyjs-webpack-plugin 不支持es6， vue-cli 自带 terser-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");

// 抽离注入
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// CDN 资源
// const cdn = {
//   externals: {
//     'vue': "Vue",
//     "vue-router": "VueRouter",
//     "element-ui": "ELEMENT",
//     'axios': "axios"
//   },
//   js: {
//     Vue: ['https://cdn.bootcss.com/vue/2.6.10/vue.min.js', '/static/vue.min.js'],
//     VueRouter: ['https://cdn.bootcss.com/vue-router/3.0.4/vue-router.min.js', '/static/vue-router.min.js'],
//     axios: ['https://cdn.bootcss.com/axios/0.18.0/axios.min.js', '/static/axios.min.js']
//   }
// }

module.exports = {
  lintOnSave: true,
  outputDir: "dist",
  productionSourceMap: false, //  加速生产环境构建
  devServer: {
    port: 9999
    // proxy: { // 开发环境代理
    //   '/wx': {
    //     target: '', // process.env.VUE_APP_URL
    //     // ws: true, //  websockets
    //     // secure: false,  // https
    //     changeOrigin: true
    //   }
    // }
  },
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5, // 设计稿宽375。37.5是 vant 默认大小
            unitPrecision: 5, // 转换成rem后保留的小数点位数
            propList: ["*", '!font-size*'], // 将被转换的属性列表, ['*', '!border*']
            selectorBlackList: [], // 要忽略的选择器，保留为px
            replace: true, // 替换包含rems的规则，而不添加后备
            mediaQuery: true, // 允许在媒体查询中转换px
            minPixelValue: 2, // 要替换的最小像素值
            exclude: /node_modules/i // 要忽略并保留为px的文件路径
          })
        ]
      },
      less: {
        //  修改less变量：https://github.com/youzan/vant/issues/6029
        modifyVars: {
          "button-primary-background-color": "#000"
        }
      }
    },
    extract: {
      ignoreOrder: true // 忽略 css 引入顺序警告
    }
  },
  chainWebpack: config => {
    // title
    // config
    //   .plugin('html')
    //   .tap(args => {
    //     args[0].title = '中山医'
    //     return args
    //   })

    // 设置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("styles", resolve("src/styles"));

    if (isProduction) {
      // cdn 注入
      // config.plugin('html')
      //   .tap(args => {
      //       args[0].cdn = cdn;
      //       return args;
      //     })

      // 压缩图片 image-webpack-loader
      // 服务器安装失败
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({ bypassOnDebug: true })
      //   .end()

      // 把 runtime 从 preload 去除
      config.plugin("preload").tap(args => {
        args[0].fileBlacklist.push(/runtime~.+\.js$/); // 正则匹配runtime文件名，去除该文件的preload
        return args;
      });

      // 移除 prefetch 插件
      // config.plugins.delete('prefetch')
      // 或者 修改它的选项：
      // config.plugin('prefetch').tap(options => {
      //   options[0].fileBlacklist = options[0].fileBlacklist || []
      //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      //   return options
      // })

      // 分析打包文件 npm run build --report
      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
      }
    }
  },

  configureWebpack: config => {
    if (isProduction) {
      // 生成环境取消打包的依赖，改为cdn
      // config.externals = cdn.externals

      // gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 不删除原文件
        })
      );

      // 抽离 runtime
      config.plugins.push(
        new ScriptExtHtmlWebpackPlugin({
          inline: /runtime~.+\.js$/ // 正则匹配runtime文件名
        })
      );

      // webpack 优化
      config.optimization = {
        runtimeChunk: true, // 'single', // 单独抽离，利用缓存优化
        // 公共代码抽离
        splitChunks: {
          chunks: "all", // 代码块类型 “initial”（初始化） | “all”(默认就是 all) | async （动态加载）
          minSize: 200000, // （默认是30000）生成块的最小大小（以字节为单位）
          minChunks: 2, // （默认是1）在分割之前，这个代码块最小应该被引用的次数
          name: true,
          // maxAsyncRequests: 5,      // 按需加载时候最大的并行请求数
          // maxInitialRequests: 30,      // 入口点的最大并行请求数
          // enforceSizeThreshold: 50000,      // 强制执行拆分的大小阈值和其他限制（minRemainingSize，maxAsyncRequests，maxInitialRequests）将被忽略
          // automaticNameDelimiter: '_',
          // automaticNamePrefi: 'ven',
          cacheGroups: {
            vendors: {
              test: /node_modules/, // 匹配到的模块将被打包进这个缓存组
              priority: -10, // 缓存组打包的先后优先级，数值大的优先
              reuseExistingChunk: true // 当前的 chunk 已被从 split 出来将会直接复用而不是重新创建
              // enforce: false,            // 忽略 .minSize, .minChunks, .maxAsyncRequests, .maxInitialRequests条件强制创建 chunks
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        },

        // 压缩优化
        minimizer: [
          new TerserPlugin({
            sourceMap: false,
            parallel: true,
            cache: true,
            terserOptions: {
              warnings: false,
              compress: {
                drop_debugger: true, // remove debugger
                // drop_console: true,           // 注释console.*
                pure_funcs: ["console.log"] // 移除 console.log
              }
            }
          })
        ]
      };
    }
  }
};
