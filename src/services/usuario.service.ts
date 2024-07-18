import { Prisma, PrismaClient } from '@prisma/client';
import { error } from 'elysia';

const db = new PrismaClient();

export const UsuarioService = {
  buscarUsuarios: async (id: number) => {
    try {
      const user = await db.user.findFirst({
        where: {
          id,
        }
      })
      if (!user) return error(204, []);
      return user
    } catch (e) {
      return error(500, e)
    }
  },
  criarUsuario: async (usuario: Prisma.UserCreateInput) => {
    try {
      await db.user.create({
        data: usuario,
      })
    } catch (e) {
      if (e && typeof e === 'object' && 'code' in e) {
        switch (e.code) {
          case 'P2002': return error(400, e);
          default: return error(500)
        }
      }
      console.log(e);
      return error(500)
    }
  },
  atualizarUsuario: async (usuario: Prisma.UserUpdateInput, id: number) => {
    try {
      await db.user.update({
        where: {
          id: id
        },
        data: {
          ...usuario,
        }
      })
    } catch (e) {
      console.log(e);
      if (e && typeof e === 'object' && 'code' in e) {
        switch (e.code) {
          case 'P2002': return error(400, e);
          case 'P2025': return error(400, 'Usuário não encontrado')
          default: return error(500)
        }
      }
      return error(500)
    }
  }
}