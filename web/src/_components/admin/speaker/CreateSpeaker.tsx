import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../_services/api';
import { getToken } from '../../../_services/auth';

import './speaker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CreateSpeaker = () => {

    const history = useHistory();


    const [inputData, setInputData] = useState({
        name: '',
        mobile_number: '',
        schedule: '',
    });

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault();

        const { name, mobile_number, schedule } = inputData;

        const data = {
            name, mobile_number, schedule
        };

        await api.post('speaker', data, {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
        });

        alert('Locutor Cadastrado com Sucesso!')

        history.goBack();
    }

    function cancel() {
        history.goBack();
    }

    return (
        <Container>
            <div id="page-create-speaker" className="body_form">
                <Form onSubmit={changeForm}>
                    <FormGroup>
                        <Label className="strong">Nome:</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={inputData.name}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Celular:</Label>
                        <Input
                            id="mobile_number"
                            type="text"
                            name="mobile_number"
                            placeholder="Celular"
                            value={inputData.mobile_number}
                            onChange={changeInput}></Input>

                        <Label className="strong">Horário:</Label>
                        <Input
                            id="schedule"
                            type="text"
                            name="schedule"
                            placeholder="Horário"
                            value={inputData.schedule}
                            onChange={changeInput}></Input>
                    </FormGroup>

                    <Button id="cancelar" onClick={cancel}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </Form>
            </div>
        </Container>
    )
}
export default CreateSpeaker;