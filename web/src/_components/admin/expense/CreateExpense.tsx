import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../_services/api';
import { getToken } from '../../../_services/auth';

import './expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CreateExpense = () => {

    const history = useHistory();


    const [inputData, setInputData] = useState({
        description: '',
        phone: '',
        month: '',
        price: '',
    });

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault();

        const { description, phone, month, price } = inputData;

        const data = {
            description, phone, month, price
        };

        await api.post('expense', data, {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
        });

        alert('Dispesa Cadastrado com Sucesso!')

        history.goBack();
    }

    function cancel() {
        history.goBack();
    }

    return (
        <Container>
            <div id="page-create-expense" className="body_form">
                <Form onSubmit={changeForm}>
                    <FormGroup>
                        <Label className="strong">Descrição:</Label>
                        <Input
                            id="description"
                            type="text"
                            name="description"
                            placeholder="Descrição"
                            value={inputData.description}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Telefone:</Label>
                        <Input
                            id="phone"
                            type="text"
                            name="phone"
                            placeholder="Telefone"
                            value={inputData.phone}
                            onChange={changeInput}></Input>

                        <Label className="strong">Mês:</Label>
                        <Input
                            id="month"
                            type="text"
                            name="month"
                            placeholder="Mês"
                            value={inputData.month}
                            onChange={changeInput}></Input>

                        <Label className="strong">Preço:</Label>
                        <Input
                            id="price"
                            type="number"
                            name="price"
                            placeholder="Preço"
                            value={inputData.price}
                            onChange={changeInput}></Input>
                    </FormGroup>

                    <Button id="cancelar" onClick={cancel}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </Form>
            </div>
        </Container>
    )
}
export default CreateExpense;