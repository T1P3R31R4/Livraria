import { Emprestimo } from '../classes/Emprestimo'
import { Livro } from '../classes/Livro'
import { Membro } from '../classes/Membro'

const emprestimos: Emprestimo[] = []

const livro = new Livro('Test Book', 'Author', '1234567890', 2010)
const membro = new Membro('Test Member', 'test@example.com', '1234567890', '123')
const emprestimo = new Emprestimo(livro, membro)
emprestimos.push(emprestimo)

describe('Emprestimo', () => {

  it('should create an instance of Emprestimo', () => {
    expect(emprestimo).toBeInstanceOf(Emprestimo)
  })

  it('should set the livro as alugado', () => {
    expect(livro.alugado).toBe(true)
  })

  it('should set the prazoDevolucao to 7 days from dataEmprestimo', () => {
    const expectedPrazo = new Date(emprestimo.dataEmprestimo)
    expectedPrazo.setDate(expectedPrazo.getDate() + 7)
    expect(emprestimo.prazoDevolucao).toEqual(expectedPrazo)
  })

  it('should register devolucao and set livro as not alugado', () => {
    emprestimo.registrarDevolucao(emprestimos, 'tests/data/emprestimos.csv')
    expect(emprestimo.dataDevolucao).toBeDefined()
    expect(livro.alugado).toBe(false)
  })

  it('should calculate the correct number of days atraso', () => {
    const dataDevolucao = new Date(emprestimo.prazoDevolucao)
    dataDevolucao.setDate(dataDevolucao.getDate() + 5)
    const diasAtraso = emprestimo.calcularDiasAtraso(dataDevolucao)
    expect(diasAtraso).toBe(5)
  })

  it('should save emprestimo to CSV', () => {
    const salvarEmprestimoCSVSpy = jest.spyOn(emprestimo, 'salvarCSV')
    emprestimo.salvarCSV('tests/data/emprestimos.csv')
    expect(salvarEmprestimoCSVSpy).toHaveBeenCalled()
  })
})
