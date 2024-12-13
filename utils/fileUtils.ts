import { Livro } from '../classes/Livro'
import { Membro } from '../classes/Membro'
import { Emprestimo } from '../classes/Emprestimo'
import * as fs from 'fs'
import * as path from 'path'

const livrosCsvPath = 'database/livros.csv'
const membrosCsvPath = 'database/membros.csv'
const emprestimosCsvPath = 'database/emprestimos.csv'

//---------------- LIVRO ----------------

// Função para salvar um livro em um arquivo CSV
export function salvarLivroCSV(livro: Livro, filename: string = livrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  const data = `${livro.id},${livro.titulo},${livro.autor},${livro.isbn},${livro.anoPublicacao},${livro.alugado}\n`
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data)
  } else {
    fs.appendFileSync(filePath, data)
  }
}

// Função para carregar livros de um arquivo CSV
export function carregarLivros(filename: string = livrosCsvPath): Livro[] {
  try {
    const filePath = path.resolve(process.cwd(), filename)
    const data = fs.readFileSync(filePath, 'utf-8')
    let lines = data.split('\n')
    if (lines[lines.length - 1] === '') {
      lines.pop()
    }

    return lines.map(line => {
      let [id, titulo, autor, isbn, anoPublicacao, alugado] = line.split(',')
      return new Livro(titulo, autor, isbn, Number(anoPublicacao), Number(id))
    })
  } catch (error) {
    return []
  }
}

// Função para editar um livro em um arquivo CSV
export function editarLivroCSV(livro: Livro, livros: Livro[], filename: string = livrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  const newData = livros.map(l => {
    if (l.id === livro.id) {
      return livro
    }
    return l
  })
  fs.writeFileSync(filePath, '')
  newData.forEach(livro => salvarLivroCSV(livro))
}

// Função para alterar o status do livro para alugado
export function alterarStatusAluguelLivroCSV(livro: Livro, filename: string = livrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  const data = carregarLivros()
  const newData = data.map(l => {
    if (l.id === livro.id) {
      return new Livro(l.titulo, l.autor, l.isbn, l.anoPublicacao, l.id)
    }
    return l
  })
  fs.writeFileSync(filePath, '')
  newData.forEach(livro => salvarLivroCSV(livro, filename))
}

// Função para excluir um livro de um arquivo CSV
export function excluirLivroCSV(livros: Livro[], filename: string = livrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  fs.writeFileSync(filePath, '')
  livros.forEach(livro => salvarLivroCSV(livro))
}

//---------------- MEMBRO ----------------

// Função para salvar um membro em um arquivo CSV
export function salvarMembroCSV(membro: Membro, filename: string = membrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  const data = `${membro.id},${membro.nome},${membro.endereco},${membro.telefone},${membro.matricula}\n`
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data)
  } else {
    fs.appendFileSync(filePath, data)
  }
}

// Função para carregar membros de um arquivo CSV
export function carregarMembros(filename: string = membrosCsvPath): Membro[] {
  try {
    const filePath = path.resolve(process.cwd(), filename)
    const data = fs.readFileSync(filePath, 'utf-8')
    let lines = data.split('\n')
    if (lines[lines.length - 1] === '') {
      lines.pop()
    }

    return lines.map(line => {
      const [id, nome, endereco, telefone, matricula] = line.split(',')
      return new Membro(nome, endereco, telefone, matricula, Number(id))
    })
  } catch (error) {
    return []
  }
}

// Função para editar um membro em um arquivo CSV
export function editarMembroCSV(membro: Membro, membros: Membro[], filename: string = membrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  const newData = membros.map(m => {
    if (m.matricula === membro.matricula) {
      return membro
    }
    return m
  })
  fs.writeFileSync(filePath, '')
  newData.forEach(membro => salvarMembroCSV(membro))
}

// Função para excluir um membro de um arquivo CSV
export function excluirMembroCSV(membros: Membro[], filename: string = membrosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  fs.writeFileSync(filePath, '')
  membros.forEach(membro => salvarMembroCSV(membro))
}

//---------------- EMPRÉSTIMO ----------------

// Função para salvar um empréstimo em um arquivo CSV
export function salvarEmprestimoCSV(emprestimo: Emprestimo, filename: string = emprestimosCsvPath): void {
  let livrosFilename = 'database/livros.csv'
  if (filename.split('/')[0] === 'tests') {
    livrosFilename = 'tests/data/livros.csv'
  }

  const filePath = path.resolve(process.cwd(), filename)
  const data = `${emprestimo.id},${emprestimo.livro.id},${emprestimo.membro.id},${emprestimo.dataEmprestimo.toISOString()},${emprestimo.dataDevolucao?.toISOString()},${emprestimo.prazoDevolucao.toISOString()}\n`
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, data)
  } else {
    alterarStatusAluguelLivroCSV(emprestimo.livro, livrosFilename)
    fs.appendFileSync(filePath, data)
  }
}

// Função para carregar empréstimos de um arquivo CSV
export function carregarEmprestimos(livros: Livro[], membros: Membro[], filename: string = emprestimosCsvPath): Emprestimo[] {
  try {
    const filePath = path.resolve(process.cwd(), filename)
    const data = fs.readFileSync(filePath, 'utf-8')
    let lines = data.split('\n')
    if (lines[lines.length - 1] === '') {
      lines.pop()
    }
    return lines.map(line => {
      const [id, idLivro, idMembro, dataEmprestimo, dataDevolucao, prazoDevolucao] = line.split(',')
      const livro = livros.find(livro => livro.id === Number(idLivro))
      const membro = membros.find(membro => membro.id === Number(idMembro))

      if (!livro || !membro) {
        throw new Error('Livro ou membro não encontrado')
      }

      if (dataDevolucao === 'undefined') {
        return new Emprestimo(livro, membro, Number(id))
      }
      return new Emprestimo(livro, membro, Number(id), new Date(dataDevolucao))
    })
  }
  catch (error) {
    return []
  }
}

// Função para adicionar um data de devolução a um empréstimo
export function devolverLivroCSV(emprestimos: Emprestimo[], filename: string = emprestimosCsvPath): void {
  const filePath = path.resolve(process.cwd(), filename)
  fs.writeFileSync(filePath, '')
  emprestimos.forEach(emprestimo => salvarEmprestimoCSV(emprestimo, filename))
}
