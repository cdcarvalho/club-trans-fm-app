import api from '../api'
import { getToken } from '../auth'
import Expense from '../../models/Expense'

export class ExpenseService {
  // eslint-disable-next-line
  constructor() { }

  async getExpenses(): Promise<Expense[]> {
    try {
      const expenses = api.get('expenses', {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(expenses => {
        return expenses.data;
      }).catch(() => {
        alert('Nenhum registro encontrado.')
        return [];
      })
      return expenses;
    } catch (error) {
      return [];
    }
  }

  async delete(id: number) {
    try {
      await api.delete(`expense/${id}`, {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(() => {
        alert('Registro removido com sucesso.')
      }).catch(error => {
        alert(error)
      })
    } catch (error) {
      alert('Ocorreu um erro ao remover a dispesa.')
    }
  }
}

export default ExpenseService;
