# 踩坑

## 使用自建 TSX 渲染器将 TSX 代码渲染为 HTML

- 需要将 `.ts` 文件修改为 `.tsx` 文件，同时修改引用的位置。
- `.tsx` 中返回客户端的内容需为 TSX 表达式，不可 HTML 字符串，否则不会被编译。
- 需要声明 `JSX.IntrinsicElements` 以识别合法标签，否则会报错。
- 需要在入口文件的 `.tsx` 文件中导入自建 TSX 渲染器（不需要调用也不会报没使用）。
  - JSX factory 必须在当前文件作用域可见，否则编译后的调用无法解析。
- `tsconfig.json` 中需要定义 `jsx`, `jsxFactory` 字段。
  - `jsx` 运行时必须是 `react`，如为 `react-jsx`，后者不会识别 `jsxFactory`。
  - `jsxFactory` 为自建 TSX 渲染器方法名。
- 需要更改响应的 `content-type` 为 `text/html`。
