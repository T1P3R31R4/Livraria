import { excluirLivro, Livro } from '../classes/Livro'

const livros: Livro[] = []
const livro = new Livro('O Senhor dos Anéis', 'J.R.R. Tolkien', '123456789', 1997)
livros.push(livro)

describe('Testes de Livro', () => {
  it('Deve cadastrar um novo livro', () => {
    expect(livro.titulo).toBe('O Senhor dos Anéis')
    expect(livro.autor).toBe('J.R.R. Tolkien')
    expect(livro.isbn).toBe('123456789')
    expect(livro.anoPublicacao).toBe(1997)
    expect(livro.alugado).toBe(false)
  })

  it('Deve alugar um livro', () => {
    livro.alugado = true
    expect(livro.alugado).toBe(true)
  })

  it('Deve editar um livro', () => {
    livro.editarLivro('To Kill a Mockingbird', 'Harper Lee', '9780061120084', 1960, livros)
    expect(livro.titulo).toBe('To Kill a Mockingbird')
    expect(livro.autor).toBe('Harper Lee')
    expect(livro.isbn).toBe('9780061120084')
    expect(livro.anoPublicacao).toBe(1960)
  })

  it('Deve excluir um livro do array de livros', () => {
    excluirLivro(livro, livros, 'tests/data/livros.csv')
    expect(livros).not.toContain(livro)
  })
})
