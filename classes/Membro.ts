import { editarMembroCSV, excluirMembroCSV, salvarMembroCSV } from '../utils/fileUtils'
import { Pessoa } from './Pessoa'

export class Membro extends Pessoa {
  readonly _matricula: string

  constructor(nome: string, endereco: string, telefone: string, matricula: string, id?: number) {
    super(nome, endereco, telefone, id)
    this._matricula = matricula
  }

  get matricula(): string {
    return this._matricula
  }

  public editarMembro(nome: string, endereco: string, telefone: string, membros: Membro[]): void {
    this.nome = nome
    this.endereco = endereco
    this.telefone = telefone

    editarMembroCSV(this, membros)
  }

  public salvarCSV(filename?: string): void {
    salvarMembroCSV(this, filename)
  }
}

export function excluirMembro(membro: Membro, membros: Membro[], filename?: string): void {
  const index = membros.indexOf(membro)
  membros.splice(index, 1)
  excluirMembroCSV(membros, filename)
}
