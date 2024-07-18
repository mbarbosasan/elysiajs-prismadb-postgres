import jwt, { JWTPayloadSpec } from "@elysiajs/jwt"
import { PrismaClient } from "@prisma/client"
import { Cookie, error } from "elysia"
import { jwtType } from "../types/jwt"

const db = new PrismaClient()

export const authService = {
  autenticarUsuario: async (body: { email: string; senha: string}, auth: Cookie<any>, jwt: jwtType) => {
    const usuario = await db.user.findFirst({
      where: {
        email: body.email
      }
    })
    if (!usuario || usuario && usuario.password !== body.senha) return error(400, 'Email ou senha incorreta ou inexistente, verifique e tente novamente.')
    auth.set({
      value: await jwt.sign(body),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: '/'
    })
    return `Sign in as ${auth.value}`
  },
  validarUsuario: async (jwt: jwtType, auth: Cookie<any>)  => {
    const profile = await jwt.verify(auth.value);
    if (!profile) return error(401, 'Unauthorized');
    return profile;
  }
}