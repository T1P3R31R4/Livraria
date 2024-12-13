import { excluirMembro, Membro } from '../classes/Membro'

const membros: Membro[] = []
const membro = new Membro('João', 'Rua x', '991953883', '12')
membros.push(membro)

describe('Testes de membros', () => {

  it('Deve cadastrar um novo membro', () => {
    expect(membro.nome).toBe('João')
    expect(membro.endereco).toBe('Rua x')
    expect(membro.telefone).toBe('991953883')
    expect(membro.matricula).toBe('12')
  })

  it('Deve editar um Membro', () => {
    const membro = new Membro('João', 'Rua x', '991953883', '12')
    membro.nome = 'Maria'
    expect(membro.nome).toBe('Maria')
  })

  it('Deve excluir um membro do array de mrmbros', () => {
    excluirMembro(membro, membros, 'tests/data/membros.csv')
    expect(membros).not.toContain(membro)
  })
})
