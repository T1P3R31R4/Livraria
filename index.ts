import Prompt from 'prompt-sync'
import { excluirLivro, Livro } from './classes/Livro'
import { excluirMembro, Membro } from './classes/Membro'
import { Emprestimo } from './classes/Emprestimo'
import { carregarEmprestimos, carregarLivros, carregarMembros } from './utils/fileUtils'

export const livros: Livro[] = carregarLivros()
export const membros: Membro[] = carregarMembros()
export const emprestimos: Emprestimo[] = carregarEmprestimos(livros, membros)

// VARIÁVEIS
const prompt = Prompt()

// MENU PRINCIPAL
function menuPrincipal(): void {
  while (true) {
    console.clear()
    console.log('=======================================')
    console.log('       📚 Sistema de Biblioteca 📚      ')
    console.log('=======================================')
    console.log('Selecione uma das opções abaixo:')
    console.log('')
    console.log('  [1] 📖 Gerenciar Livros')
    console.log('  [2] 👥 Gerenciar Membros')
    console.log('  [3] 🔄 Gerenciamento de Empréstimos')
    console.log('  [0] ❌ Sair')
    console.log('')
    console.log('=======================================')
    const opcao = prompt('Digite o número da sua escolha: ')

    switch (opcao) {
      case '1':
        console.clear()
        console.log('📖 Você escolheu: Gerenciar Livros')
        menuLivros()
        break
      case '2':
        console.clear()
        console.log('👥 Você escolheu: Gerenciar Membros')
        menuMembros()
        break
      case '3':
        console.clear()
        console.log('🔄 Você escolheu: Gerenciamento de Empréstimos')
        menuEmprestimos()
        break
      case '0':

        console.clear()
        console.log('❌ Saindo do sistema...')
        return
      default:
        console.clear()
        console.log('⚠️ Opção inválida. Tente novamente.')
    }
  }
}

// FUNÇÕES DO MENU DE LIVROS
function menuLivros(): void {
  function _cadastrarLivro(): void {
    console.clear()
    console.log('➕ Cadastro de Livro')
    const titulo = prompt('Informe o título do livro: ')
    const autor = prompt('Informe o autor do livro: ')
    const isbn = prompt('Informe o ISBN do livro: ')
    const anoPublicacao = parseInt(prompt('Informe o ano de publicação: '))

    const novoLivro = new Livro(titulo, autor, isbn, anoPublicacao)
    novoLivro.salvarCSV()

    livros.push(novoLivro)
    console.log(`Livro ${novoLivro.titulo} cadastrado com sucesso!`)
  }

  function _listarLivros(): void {
    console.clear()
    console.log('📋 Listagem de Livros')
    if (livros.length === 0) {
      console.log('ℹ️  Nenhum livro cadastrado.')
    } else {
      const livrosOrdenados = livros
        .sort((a, b) => a.titulo.localeCompare(b.titulo))
        .map(livro => ({
          id: livro.id,
          titulo: livro.titulo,
          autor: livro.autor,
          isbn: livro.isbn,
          anoPublicacao: livro.anoPublicacao
        }))
      console.table(livrosOrdenados, ['id', 'titulo', 'autor', 'isbn', 'anoPublicacao'])
    }
  }

  function _excluirLivro(): void {
    console.clear()
    console.log('❌ Exclusão de Livro')
    const idLivro = Number(prompt('Informe o ID do livro que deseja excluir: '))
    const livroEncontrado = livros.find(livro => livro.id === idLivro)

    if (!livroEncontrado) {
      return console.log('ℹ️  Livro não encontrado.')
    }
    excluirLivro(livroEncontrado, livros)
    console.log('Livro excluído com sucesso!')
  }

  function _editarLivro(): void {
    console.clear()
    console.log('✏️  Edição de Livro')
    const id = Number(prompt('Informe o ID do livro que deseja editar: '))
    const livroEncontrado = livros.find(livro => livro.id === id)

    if (!livroEncontrado) {
      return console.log('ℹ️  Livro não encontrado.')
    }
    const titulo = prompt('Informe o novo título do livro: ')
    const autor = prompt('Informe o novo autor do livro: ')
    const novoIsbn = prompt('Informe o novo ISBN do livro: ')
    const anoPublicacao = parseInt(prompt('Informe o novo ano de publicação: '))

    livroEncontrado.editarLivro(titulo, autor, novoIsbn, anoPublicacao, livros)
    console.log('Livro editado com sucesso!')
  }

  // MENU DE LIVROS
  while (true) {
    console.clear()
    console.log('=======================================')
    console.log('          📖 Gerenciar Livros 📖        ')
    console.log('=======================================')
    console.log('Selecione uma das opções abaixo:')
    console.log('')
    console.log('  [1] ➕ Cadastrar Livro')
    console.log('  [2] 📋 Listar Livros')
    console.log('  [3] ❌ Excluir Livro')
    console.log('  [4] ✏️  Editar Livro')
    console.log('  [0] 🔙 Voltar ao Menu Principal')
    console.log('')
    console.log('=======================================')
    const opcao = prompt('Digite o número da sua escolha: ')

    switch (opcao) {
      case '1':
        console.clear()
        console.log('➕ Você escolheu: Cadastrar Livro')
        _cadastrarLivro()
        break
      case '2':
        console.clear()
        console.log('📋 Você escolheu: Listar Livros')
        _listarLivros()
        break
      case '3':
        console.clear()
        console.log('❌ Você escolheu: Excluir Livro')
        _excluirLivro()
        break
      case '4':
        console.clear()
        console.log('✏️  Você escolheu: Editar Livro')
        _editarLivro()
        break
      case '0':
        console.clear()
        console.log('🔙 Retornando ao Menu Principal...')
        return
      default:
        console.clear()
        console.log('⚠️ Opção inválida. Tente novamente.')
    }
    if (opcao !== '0') {
      prompt('Pressione Enter para continuar...')
    }
  }
}

// FUNÇÕES DO MENU DE MEMBROS
function menuMembros(): void {
  function _cadastrarMembro(): void {
    console.clear()
    console.log('➕  Cadastro de Membro')
    const nome = prompt('Informe o nome do membro: ')
    const endereco = prompt('Informe o endereço do membro: ')
    const telefone = prompt('Informe o telefone do membro: ')
    const matricula = prompt('Informe a matrícula do membro: ')

    const novoMembro = new Membro(nome, endereco, telefone, matricula)
    novoMembro.salvarCSV()

    membros.push(novoMembro)
    console.log(`Membro ${novoMembro.nome} cadastrado com sucesso!`)
  }

  function _listarMembros(): void {
    console.clear()
    console.log('📋 Listagem de Membros')
    if (membros.length === 0) {
      return console.log('ℹ️  Nenhum membro cadastrado.')
    }
    const membrosOrdenados = membros
      .map(membro => ({
        matricula: membro.matricula,
        nome: membro.nome,
        endereco: membro.endereco,
        telefone: membro.telefone
      }))
    console.table(membrosOrdenados, ['matricula', 'nome', 'endereco', 'telefone'])
  }

  function _excluirMembro(): void {
    console.clear()
    console.log('❌  Exclusão de Membro')
    const matricula = prompt('Informe a matrícula do membro que deseja excluir: ')
    const membroEncontrado = membros.find(membro => membro.matricula === matricula)

    if (!membroEncontrado) {
      return console.log('ℹ️  Membro não encontrado.')
    }
    excluirMembro(membroEncontrado, membros)
    membros.splice(membros.indexOf(membroEncontrado), 1)
    console.log('Membro excluído com sucesso!')
  }

  function _editarMembro(): void {
    console.clear()
    console.log('✏️  Edição de Membro')
    const matricula = prompt('Informe a matrícula do membro que deseja editar: ')
    const membroEncontrado = membros.find(membro => membro.matricula === matricula)

    if (!membroEncontrado) {
      return console.log('ℹ️  Membro não encontrado.')
    }
    const nome = prompt('Informe o novo nome do membro: ')
    const endereco = prompt('Informe o novo endereço do membro: ')
    const telefone = prompt('Informe o novo telefone do membro: ')

    membroEncontrado.editarMembro(nome, endereco, telefone, membros)
    console.log('Membro editado com sucesso!')
  }

  // MENU DE MEMBROS
  while (true) {
    console.clear()
    console.log('=======================================')
    console.log('         👥 Gerenciar Membros 👥        ')
    console.log('=======================================')
    console.log('Selecione uma das opções abaixo:')
    console.log('')
    console.log('  [1] ➕ Cadastrar Membro')
    console.log('  [2] 📋 Listar Membros')
    console.log('  [3] ❌ Excluir Membro')
    console.log('  [4] ✏️  Editar Membro')
    console.log('  [0] 🔙 Voltar ao Menu Principal')
    console.log('')
    console.log('=======================================')
    const opcao = prompt('Digite o número da sua escolha: ')

    switch (opcao) {
      case '1':
        console.clear()
        console.log('➕ Você escolheu: Cadastrar Membro')
        _cadastrarMembro()
        break
      case '2':
        console.clear()
        console.log('📋 Você escolheu: Listar Membros')
        _listarMembros()
        break
      case '3':
        console.clear()
        console.log('❌ Você escolheu: Excluir Membro')
        _excluirMembro()
        break
      case '4':
        console.clear()
        console.log('✏️  Você escolheu: Editar Membro')
        _editarMembro()
        break
      case '0':
        console.clear()
        console.log('🔙 Retornando ao Menu Principal...')
        return
      default:
        console.clear()
        console.log('⚠️ Opção inválida. Tente novamente.')
    }
    if (opcao !== '0') {
      prompt('Pressione Enter para continuar...')
    }
  }
}

// FUNÇÕES DO MENU DE EMPRÉSTIMOS
function menuEmprestimos(): void {
  function _cadastrarEmprestimo(): void {
    console.clear()
    console.log('➕ Cadastro de Empréstimo')
    const idLivro = Number(prompt('Informe o ID do livro: '))
    const idMembro = Number(prompt('Informe o ID do membro: '))
    const livro = livros.find(livro => livro.id === idLivro)
    const membro = membros.find(membro => membro.id === idMembro)

    if (!livro || !membro) {
      return console.log('Livro ou membro não encontrado.')
    }

    if (livro.alugado) {
      return console.log(`Livro indisponivel para empréstimos no momento`)
    }

    const novoEmprestimo = new Emprestimo(livro, membro)
    novoEmprestimo.salvarCSV()

    emprestimos.push(novoEmprestimo)
    console.log('Empréstimo realizado com sucesso!')
    console.log('Seu ticket para devolução é: ', novoEmprestimo.id)
  }

  function _devolverLivro(): void {
    console.clear()
    console.log('🔄 Devolução de Livro')
    const id = Number(prompt('Informe o ticket do empréstimo: '))
    const emprestimoEncontrado = emprestimos.find(emprestimo => emprestimo.id === id)
    if (!emprestimoEncontrado) {
      return console.log('ℹ️  Empréstimo não encontrado.')
    }

    emprestimoEncontrado.registrarDevolucao(emprestimos)
    return console.log('Empréstimo devolvido com sucesso!')
  }

  function _listarEmprestimosAtivos(): void {
    console.clear()
    console.log('📋 Listagem de Empréstimos')
    const emprestimosAtivos = emprestimos.filter(emprestimo => !emprestimo.dataDevolucao)

    if (emprestimosAtivos.length === 0) {
      return console.log('ℹ️  Nenhum Empréstimo ativo.')
    }

    const emprestimosOrdenados = emprestimosAtivos
      .sort((a, b) => a.dataEmprestimo.getTime() - b.dataEmprestimo.getTime())
      .map(emprestimo => ({
        ticket: emprestimo.id,
        livro: emprestimo.livro.titulo,
        membro: emprestimo.membro.nome,
        dataEmprestimo: emprestimo.dataEmprestimo.toLocaleString('pt-BR').split(',')[0],
        prazoDevolucao: emprestimo.prazoDevolucao.toLocaleString('pt-BR').split(',')[0]
      }))
    console.table(emprestimosOrdenados, ['ticket', 'livro', 'membro', 'dataEmprestimo', 'prazoDevolucao'])
  }

  function _listarEmprestimosTotal(): void {
    console.clear()
    console.log('📋 Listagem do Histórico de Empréstimos')
    if (membros.length === 0) {
      return console.log('ℹ️  Nenhum Empréstimo cadastrado.')
    }

    const emprestimosOrdenados = emprestimos
      .sort((a, b) => a.dataEmprestimo.getTime() - b.dataEmprestimo.getTime())
      .map(emprestimo => ({
        ticket: emprestimo.id,
        livro: emprestimo.livro.titulo,
        membro: emprestimo.membro.nome,
        dataEmprestimo: emprestimo.dataEmprestimo.toLocaleString('pt-BR').split(',')[0],
        dataDevolucao: emprestimo.dataDevolucao ? emprestimo.dataDevolucao.toLocaleString('pt-BR').split(',')[0] : 'Em aberto',
        prazoDevolucao: emprestimo.prazoDevolucao.toLocaleString('pt-BR').split(',')[0]
      }))
    console.table(emprestimosOrdenados, ['ticket', 'livro', 'membro', 'dataEmprestimo', 'dataDevolucao', 'prazoDevolucao'])
  }

  // MENU DE EMPRÉSTIMOS
  while (true) {
    console.clear()
    console.log('=======================================')
    console.log('    🔄 Gerenciamento de Empréstimos 🔄  ')
    console.log('=======================================')
    console.log('Selecione uma das opções abaixo:')
    console.log('')
    console.log('  [1] ➕ Realizar Empréstimo')
    console.log('  [2] 🔄 Devolução de Livro')
    console.log('  [3] 📋 Listar Empréstimos Ativos')
    console.log('  [4] 📋 Listar Histórico de Empréstimos')
    console.log('  [0] 🔙 Voltar ao Menu Principal')
    console.log('')
    console.log('=======================================')
    const opcao = prompt('Digite o número da sua escolha: ')

    switch (opcao) {
      case '1':
        console.clear()
        console.log('➕ Você escolheu: Realizar Empréstimo')
        _cadastrarEmprestimo()
        break
      case '2':
        console.clear()
        console.log('🔄 Você escolheu: Devolução de Livro')
        _devolverLivro()
        break
      case '3':
        console.clear()
        console.log('📋 Você escolheu: Listar Empréstimos Ativos')
        _listarEmprestimosAtivos()
        break
      case '4':
        console.clear()
        console.log('📋 Você escolheu: Listar Histórico Empréstimos')
        _listarEmprestimosTotal()
        break
      case '0':
        console.clear()
        console.log('🔙 Retornando ao Menu Principal...')
        return
      default:
        console.clear()
        console.log('⚠️ Opção inválida. Tente novamente.')
    }

    if (opcao !== '0') {
      prompt('Pressione Enter para continuar...')
    }
  }
}

// CHAMADA PARA O MENU PRINCIPAL
if (require.main === module) {
  menuPrincipal()
}
