import React, { useState } from 'react'
import { Button, Label, Input } from 'reactstrap'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Schedule from '../../../models/Schedule'
import ScheduleService from '../../../_services/schedule/scheduleService';

import './schedule.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export const ScheduleCommercialAutomatic = ({ idCommercial, limitCalls }) => {

    const [open, setOpen] = useState(false);
    const scheduleService = new ScheduleService();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Gerar Automático
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
                    <Label className="strong">Total de chamadas restantes: {limitCalls}</Label>
                </DialogContent>
                <DialogActions>
                    <Button id="gerar-horarios" className="btn-schedule"
                        style={{ width: '50%', marginTop: '2px' }}>Salvar
                        </Button>
                    <Button onClick={handleClose} color="secondary">
                        Fechar
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleCommercialAutomatic;