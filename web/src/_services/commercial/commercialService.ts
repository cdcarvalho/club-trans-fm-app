import api from '../api'
import { getToken } from '../auth'
import Commercial from '../../models/Commercial'

export class CommercialService {
  // eslint-disable-next-line
  constructor() { }

  async getCommercials(): Promise<Commercial[]> {
    try {
      const commercials = api.get('commercials', {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(commercials => {
        return commercials.data;
      }).catch(() => {
        alert('Nenhum registro encontrado.')
        return [];
      })
      return commercials;
    } catch (error) {
      return [];
    }
  }

  async delete(id: number) {
    try {
      await api.delete(`commercial/${id}`, {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(() => {
        alert('Registro removido com sucesso.')
      }).catch(error => {
        alert(error)
      })
    } catch (error) {
      alert('Ocorreu um erro ao remover o usuário.')
    }
  }
}

export default CommercialService;
