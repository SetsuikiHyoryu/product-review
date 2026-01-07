# AI 提义的目录结构

好 👍
我们就**把结构压扁，继续在“一个程序”的语义里往前走**。

下面我会做三件事：

1. 给你 **最终推荐的压扁目录结构**
2. 把刚才那套骨架 **完整迁移到新结构**
3. 解释这个结构**为什么能长期不乱**

你可以直接照着改 / 新建。

---

# 一、压扁后的「正确心智模型」

> **这是一个本地程序**
>
> - 有入口
> - 有页面
> - 有数据
> - 有静态资源（以后）

所以目录也应该长这样。

---

# 二、推荐的压扁目录结构（第一稳态）

```text
product-review/
├── src/
│   ├── index.ts        # 程序入口（Elysia）
│   ├── db.ts           # SQLite 初始化 & 访问
│   ├── view.tsx        # TSX 渲染核心（h 函数）
│   ├── pages/
│   │   └── home.tsx    # 首页（第一个页面）
│   └── layouts/
│       └── main.tsx    # 基础布局（可选，但很快就会需要）
│
├── data/
│   └── app.db          # 本地数据库
│
├── package.json
├── tsconfig.json
└── README.md
```

注意几个关键点：

- **没有 backend / frontend**
- `pages` 是“页面”，不是组件
- `layouts` 是 HTML 结构，不是 UI 框架
- 所有 TS / TSX 都在 `src/`

---

# 三、代码迁移（一步不漏）

下面是**可直接运行的一整套最小骨架**。

---

## 1️⃣ tsconfig.json（保持不变）

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react",
    "jsxFactory": "h",
    "types": ["bun-types"]
  }
}
```

---

## 2️⃣ TSX 渲染核心（src/view.tsx）

```ts
/** @jsx h */

type Child = string | number | boolean | null | undefined

export function h(
  tag: string,
  props: Record<string, any> | null,
  ...children: Child[]
): string {
  const attrs = props
    ? Object.entries(props)
        .filter(([_, v]) => v !== false && v != null)
        .map(([k, v]) => ` ${k}="${String(v)}"`)
        .join('')
    : ''

  const content = children
    .flat()
    .map((c) => (c == null || c === false ? '' : c))
    .join('')

  return `<${tag}${attrs}>${content}</${tag}>`
}
```

> 这是**整个渲染系统的地基**
> 以后 80% 的改动都不会碰它。

---

## 3️⃣ SQLite 初始化（src/db.ts）

```ts
import { Database } from 'bun:sqlite'
import { mkdirSync } from 'fs'

mkdirSync('data', { recursive: true })

export const db = new Database('data/app.db')

db.query(
  `
  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`,
).run()
```

---

## 4️⃣ 主布局（src/layouts/main.tsx）

> 这是你**很快就会庆幸自己有的文件**

```tsx
import { h } from '../view'

export function MainLayout(props: { title: string; children: string }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </head>
      <body>
        <header>
          <h1>本地商品评价</h1>
          <hr />
        </header>

        <main>{props.children}</main>
      </body>
    </html>
  )
}
```

---

## 5️⃣ 首页页面（src/pages/home.tsx）

```tsx
import { h } from '../view'
import { MainLayout } from '../layouts/main'

export function HomePage() {
  return (
    <MainLayout title="首页">
      <p>骨架已成功运行。</p>
      <p>
        <a href="/products/new">新增商品</a>
      </p>
    </MainLayout>
  )
}
```

---

## 6️⃣ 程序入口（src/index.ts）

```ts
import { Elysia } from 'elysia'
import { HomePage } from './pages/home'

const app = new Elysia()

app.get('/', () => HomePage())

app.listen(3000)

console.log('🚀 http://localhost:3000')
```

---

## 7️⃣ package.json scripts

```json
{
  "scripts": {
    "dev": "bun run src/index.ts"
  }
}
```

---

# 四、现在你验证 3 件事

运行：

```bash
bun run dev
```

然后确认：

1. 浏览器能打开 `http://localhost:3000`
2. 页面是 TSX 渲染的 HTML
3. `data/app.db` 被创建

如果这三件事都成立：

> ✅ **你的“本地 Web 程序骨架”已经稳定落地**

---

# 五、为什么这个结构「不会越写越乱」

这是重点。

- `index.ts`：只做路由
- `pages/`：一页 = 一个文件
- `layouts/`：HTML 骨架
- `db.ts`：数据入口唯一
- `view.tsx`：渲染机制唯一

👉 **每个文件都有“不可替代的职责”**

这就是长期项目不腐烂的关键。

---

# 六、下一步（非常自然，而且只该做一件）

接下来我**只建议你做一件事**（别贪）：

### 👉 写第一个真实业务页面：**新增商品**

它会迫使我们解决：

- 表单
- POST
- SQLite insert
- redirect

这是整个应用的“第一次呼吸”。

你可以直接告诉我：
👉 **“下一步我们做新增商品”**
