import jwt from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { authService } from "./services/auth.service";
import { UsuarioModel } from "./models/UsuarioModel";
import { UsuarioService } from "./services/usuario.service";

const app = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET ?? 'fallback_senha_super_secreta'
    })
  )
  .use(UsuarioModel)
  .post('/auth', async ({ jwt, cookie: { auth }, body }) => authService.autenticarUsuario(body, auth, jwt), {
    body: t.Object({
      email: t.String(),
      senha: t.String()
    })
  })
  .get('/profile', async ({ jwt, cookie: { auth } }) => authService.validarUsuario(jwt, auth))
  .group('/usuarios', (app) =>
    app
      .get("/:id", ({ params: { id } }) => UsuarioService.buscarUsuarios(+id))
      .post('/', ({ body }) => UsuarioService.criarUsuario(body), {
        body: 'usuario.criar',
      })
      .patch('/:id', ({ body, params }) => UsuarioService.atualizarUsuario(body, +params['id']), {
        body: 'usuario.atualizar'
      })
  )
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
