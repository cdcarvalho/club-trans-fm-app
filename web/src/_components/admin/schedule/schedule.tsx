import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Schedule from '../../../models/Schedule'
import ScheduleService from '../../../_services/schedule/scheduleService';

export const ScheduleCommercial = ({ idCommercial }) => {

    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [open, setOpen] = React.useState(false);
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
            scheduleService.getSchedules(idCommercial).then(schedules => {
                if (findSchedule) {
                    setSchedules(schedules);
                }
            }).catch((error: string) => {
                alert(error)
            });
        } catch (error) {
            alert(error);
        }

        return function cleanup() {
            findSchedule = false
        }

    }, [scheduleService, idCommercial])

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
                style={{ width: '100%' }}
            >
                <DialogTitle id="alert-dialog-title">{"Horários"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
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
                                        <td className="row_center" style={{ width: '25%' }}>{schedule.schedule}</td>
                                        <td>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleCommercial;