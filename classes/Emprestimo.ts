import { devolverLivroCSV, salvarEmprestimoCSV } from '../utils/fileUtils'
import { Livro } from './Livro'
import { Membro } from './Membro'

let idGlobal = 1

export class Emprestimo {
  readonly _id: number
  readonly _livro: Livro
  readonly _membro: Membro
  readonly _dataEmprestimo: Date = new Date()
  private _dataDevolucao?: Date
  readonly _prazoDevolucao: Date

  constructor(
    livro: Livro,
    membro: Membro,
    id?: number,
    dataDevolucao?: Date
  ) {
    this._livro = livro
    this._membro = membro

    this._prazoDevolucao = new Date(this.dataEmprestimo)
    this._prazoDevolucao.setDate(this._prazoDevolucao.getDate() + 7)

    this.livro.alugado = true

    if (id) {
      this._id = id
      idGlobal = idGlobal < id ? id : idGlobal
    } else {
      this._id = idGlobal++
    }

    dataDevolucao ? this.dataDevolucao = dataDevolucao : undefined
  }

  get id(): number {
    return this._id
  }

  get livro(): Livro {
    return this._livro
  }

  get membro(): Membro {
    return this._membro
  }

  get dataEmprestimo(): Date {
    return this._dataEmprestimo
  }

  get dataDevolucao(): Date | undefined {
    return this._dataDevolucao
  }

  get prazoDevolucao(): Date {
    return this._prazoDevolucao
  }

  set dataDevolucao(dataDevolucao: Date) {
    this._dataDevolucao = dataDevolucao
  }

  registrarDevolucao(emprestimos: Emprestimo[], filename?: string): void {
    this.dataDevolucao = new Date()
    this.livro.alugado = false
    devolverLivroCSV(emprestimos, filename)
  }

  calcularDiasAtraso(dataDevolucao: Date): number {
    const diffTime = Math.abs(
      dataDevolucao.getTime() - this._prazoDevolucao.getTime()
    )
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  public salvarCSV(filename?: string): void {
    salvarEmprestimoCSV(this, filename)
  }
}
