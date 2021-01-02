import React, { useEffect, useState } from 'react'
import { Button, Table, Label } from 'reactstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Schedule from '../../../models/Schedule'
import ScheduleService from '../../../_services/schedule/scheduleService';
import ScheduleCommercialManual from '../schedule/ScheduleCommercialManual';
import ScheduleCommercialAutomatic from '../schedule/ScheduleCommercialAutomatic';

import './schedule.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export const ScheduleCommercialList = ({ idCommercial, total_calls }) => {

    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [open, setOpen] = useState(false);
    const scheduleService = new ScheduleService();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let findSchedule = true;
        try {
            if (open) {
                scheduleService.getSchedules(idCommercial).then(schedules => {
                    if (findSchedule) {
                        setSchedules(schedules);
                    }
                }).catch((error: string) => {
                    alert(error)
                });
            }
        } catch (error) {
            alert(error);
        }

        return function cleanup() {
            findSchedule = false
        }

    }, [scheduleService, idCommercial, open])

    function getSchedules() {
        try {
            scheduleService.getSchedules(idCommercial).then(commecials => {
                setSchedules(schedules);
            });
        } catch (error) {
            alert(error);
        }
    }

    const deleteBy = async (event: any, id: number) => {
        event.persist()
        try {
            scheduleService.delete(id).then(() => {
                getSchedules()
            });
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Horários
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="xs">

                <DialogTitle id="alert-dialog-title">Horários</DialogTitle>
                <DialogContent>
                    <Label className="strong">Total de chamadas ao dia: {total_calls}</Label>


                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="cabecalho">Horário</th>
                                <th className="cabecalho">Ação</th>
                            </tr>
                        </thead>
                        {schedules.map(schedule => (
                            <tbody key={schedule._id}>
                                <tr>
                                    <td className="row_center" style={{ width: '50%' }}>{schedule.schedule}</td>
                                    <td style={{ width: '10%' }}>
                                        <div className="ml-auto">
                                            <Button color="danger"
                                                style={{ width: '100%', marginTop: '2px' }}
                                                title="Remover"
                                                onClick={e => deleteBy(e, schedule._id)}>x</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                    <Label className="strong">Total de Registros: {schedules.length}</Label>
                </DialogContent>
                <DialogActions>
                    <ScheduleCommercialManual idCommercial={idCommercial} limitCalls={total_calls - schedules.length} />
                    <ScheduleCommercialAutomatic idCommercial={idCommercial} limitCalls={total_calls - schedules.length} />
                    <Button onClick={handleClose} color="secondary">
                        Fechar
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleCommercialList;