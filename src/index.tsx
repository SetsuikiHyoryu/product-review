import { Elysia } from 'elysia'
import { html } from './view'

const app = new Elysia()
  .get('/', ({ set }) => {
    set.headers['content-type'] = 'text/html;charset=utf-8'
    return <h1>Hello Elysia</h1>
  })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
