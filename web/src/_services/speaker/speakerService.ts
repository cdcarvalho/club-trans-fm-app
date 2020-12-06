import api from '../api'
import { getToken } from '../auth'
import Speaker from '../../models/Speaker'

export class SpeakerService {
  // eslint-disable-next-line
  constructor() { }

  async getSpeakers(): Promise<Speaker[]> {
    try {
      const speakers = api.get('speakers', {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(speakers => {
        return speakers.data;
      }).catch(() => {
        alert('Nenhum registro encontrado.')
        return [];
      })
      return speakers;
    } catch (error) {
      return [];
    }
  }

  async delete(id: number) {
    try {
      await api.delete(`speaker/${id}`, {
        headers: {
          Authorization: `Basic ${getToken()}`
        }
      }).then(() => {
        alert('Registro removido com sucesso.')
      }).catch(error => {
        alert(error)
      })
    } catch (error) {
      alert('Ocorreu um erro ao remover o locutor.')
    }
  }
}

export default SpeakerService;
