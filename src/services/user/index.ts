import { AtualizarUsuarioDTO } from '@src/models/DTO/AtualizarUsuarioDTO';
import { CriarUsuarioDTO } from '@src/models/DTO/CriarUsuarioDTO';

export const UsuarioService = {
  buscarUsuarios: (id: number) => `usuário: ${id}`,
  criarUsuario: (usuario: CriarUsuarioDTO) => `Usuário criado: ${JSON.stringify(usuario)}`,
  atualizarUsuario: (usuario: AtualizarUsuarioDTO) => `Usuario atualizado: ${JSON.stringify(usuario)}`
}