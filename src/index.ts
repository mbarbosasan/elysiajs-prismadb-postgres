import { Elysia, t } from "elysia";
import { UsuarioService } from "./services/user";
import { UsuarioModel } from "./models/UsuarioModel";

const app = new Elysia()
  .use(UsuarioModel)
  .get("/", () => "Hello Elysia")
  .get("/usuarios/:id", ({ params: { id } }) => UsuarioService.buscarUsuarios(+id))
  .post('/usuarios', ({body}) => UsuarioService.criarUsuario(body), {
    body: 'usuario.criar',
  })
  .patch('/usuarios/:id', ({body}) => UsuarioService.atualizarUsuario(body), {
    body: 'usuario.atualizar'
  })
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
