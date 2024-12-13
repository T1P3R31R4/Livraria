let idGlobal = 1

export class Pessoa {
  readonly _id: number
  private _nome: string
  private _endereco: string
  private _telefone: string

  constructor(nome: string, endereco: string, telefone: string, id?: number) {
    this._nome = nome
    this._endereco = endereco
    this._telefone = telefone

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

  get nome(): string {
    return this._nome
  }

  set nome(nome: string) {
    this._nome = nome
  }

  get endereco(): string {
    return this._endereco
  }

  set endereco(endereco: string) {
    this._endereco = endereco
  }

  get telefone(): string {
    return this._telefone
  }

  set telefone(telefone: string) {
    this._telefone = telefone
  }
}
