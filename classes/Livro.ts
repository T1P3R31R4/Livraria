import { excluirLivroCSV, salvarLivroCSV, alterarStatusAluguelLivroCSV, editarLivroCSV } from '../utils/fileUtils'

let idGlobal = 1

export class Livro {
  readonly _id: number
  private _titulo: string
  private _autor: string
  private _isbn: string
  private _anoPublicacao: number
  private _alugado: boolean = false

  constructor(titulo: string, autor: string, isbn: string, anoPublicacao: number, id?: number) {
    this._titulo = titulo
    this._autor = autor
    this._isbn = isbn
    this._anoPublicacao = anoPublicacao

    if (id) {
      this._id = id
      idGlobal = idGlobal < id ? id : idGlobal
    } else {
      this._id = idGlobal++
    }
  }

  get id(): number {
    return this._id
  }

  get titulo(): string {
    return this._titulo
  }
  set titulo(titulo: string) {
    this._titulo = titulo
  }

  get autor(): string {
    return this._autor
  }
  set autor(autor: string) {
    this._autor = autor
  }

  get isbn(): string {
    return this._isbn
  }
  set isbn(isbn: string) {
    this._isbn = isbn
  }

  get anoPublicacao(): number {
    return this._anoPublicacao
  }
  set anoPublicacao(anoPublicacao: number) {
    this._anoPublicacao = anoPublicacao
  }

  get alugado(): boolean {
    return this._alugado
  }
  
  set alugado(alugado: boolean) {
    this._alugado = alugado
    alterarStatusAluguelLivroCSV(this)
  }

  public editarLivro(titulo: string, autor: string, isbn: string, anoPublicacao: number, livros: Livro[]): void {
    this.titulo = titulo
    this.autor = autor
    this.isbn = isbn
    this.anoPublicacao = anoPublicacao
    editarLivroCSV(this, livros)
  }

  public salvarCSV(filename?: string): void {
    salvarLivroCSV(this, filename)
  }
}

export function excluirLivro(livroExcluido: Livro, livros: Livro[], filename?: string): void {
  const index = livros.indexOf(livroExcluido)
  livros.splice(index, 1)
  excluirLivroCSV(livros, filename)
}
