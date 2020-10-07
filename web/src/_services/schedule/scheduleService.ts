import api from '../api'
import { getToken } from '../auth'
import Schedule from '../../models/Schedule'

export class ScheduleService {
    // eslint-disable-next-line
    constructor() { }

    async getSchedules(idCommercial: String): Promise<Schedule[]> {
        try {
            const schedules = api.get(`schedule/commercial/${idCommercial}`, {
                headers: {
                    Authorization: `Basic ${getToken()}`
                }
            }).then(schedules => {
                return schedules.data;
            }).catch(() => {
                alert('Nenhum registro encontrado.')
                return [];
            })
            return schedules;
        } catch (error) {
            return [];
        }
    }

    async delete(id: number) {
        try {
            await api.delete(`schedule/${id}`, {
                headers: {
                    Authorization: `Basic ${getToken()}`
                }
            }).then(() => {
                alert('Registro removido com sucesso.')
            }).catch(error => {
                alert(error)
            })
        } catch (error) {
            alert('Ocorreu um erro ao remover o horário.')
        }
    }
}

export default ScheduleService;
