import Elysia, { t } from "elysia";

export const UsuarioModel = new Elysia().model({
  'usuario.criar': t.Object({
    nome: t.String({minLength: 3, error: ({errors}) => errors.map(e => e.message)}),
    email: t.String({minLength: 3, error: ({errors}) => errors.map(e => e.message)}),
    password: t.String({minLength: 8, error: ({errors}) => errors.map(e => e.message)})
  }),
  'usuario.atualizar': t.Partial(t.Object({
    nome: t.String({minLength: 3, error: ({errors}) => errors.map(e => e.message)}),
    email: t.String({minLength: 3, error: ({errors}) => errors.map(e => e.message)}),
    password: t.String({minLength: 8, error: ({errors}) => errors.map(e => e.message)})
  }))
})