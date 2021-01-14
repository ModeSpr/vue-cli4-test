module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        // style: true,
        style: name => `${name}/style/less` // 设置变量
      },
      "vant"
    ]
  ]
};
