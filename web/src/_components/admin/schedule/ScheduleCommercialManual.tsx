import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, Button, Label, Input } from 'reactstrap'
import InputMask from 'react-input-mask';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../_services/api'
import { getToken } from '../../../_services/auth'

import './schedule.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { clear } from 'console';


export const ScheduleCommercialManual = ({ idCommercial, limitCalls }) => {

    const [open, setOpen] = useState(false);

    const [inputData, setInputData] = useState({
        schedule: '',
    })

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setInputData({ ...inputData, [name]: value })
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault()

        const { schedule } = inputData;

        const data = {
            schedule,
            idCommercial,
        };
        await api.post('schedule', data, {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
        }
        );
        limitCalls = limitCalls - 1;
        alert('Horário cadastrado com Sucesso!')

        handleClose();
    }

    const handleClickOpen = () => {
        setOpen(true);
        clear();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clear = () => {
        inputData.schedule = '';
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Gerar Manual
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="xs">

                <Form onSubmit={changeForm}>
                    <DialogTitle id="alert-dialog-title">Horário</DialogTitle>
                    <DialogContent>

                        <InputMask id="schedule"
                            mask="99:99"
                            name="schedule"
                            required
                            value={inputData.schedule}
                            onChange={changeInput}></InputMask>

                        <br /><br />
                        <Label className="strong">Total de chamadas restantes: {limitCalls}</Label>
                    </DialogContent>


                    <DialogActions>
                        <Button id="salvar"
                            className="btn-schedule"
                            type="submit">Salvar
                    </Button>
                        <Button onClick={handleClose} color="secondary">
                            Fechar
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </div>
    );
}

export default ScheduleCommercialManual;