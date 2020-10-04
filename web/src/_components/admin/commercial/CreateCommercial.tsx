import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../_services/api';
import { getToken } from '../../../_services/auth';

import './commercial.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const CreateCommercial = () => {

    const history = useHistory();

    const [inputData, setInputData] = useState({
        name: '',
        address: '',
        number: '',
        neighborhood: '',
        cnpj_cpf: '',
        phone: '',
        mobile_number: '',
        email: '',
        price: '',
        due_date: '',
        total_calls: '',
    });

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
    }

    async function changeForm(event: FormEvent) {
        event.preventDefault();

        const { name, address, number, neighborhood, cnpj_cpf,
            phone, mobile_number, email, price, due_date, total_calls } = inputData;

        const data = {
            name, address, number, neighborhood, cnpj_cpf,
            phone, mobile_number, email, price, due_date, total_calls
        };

        await api.post('commercial', data, {
            headers: {
                'Authorization': `Basic ${getToken()}`
            },
        });

        alert('Comercial Cadastrado com Sucesso!')

        history.goBack();
    }

    function cancel() {
        history.goBack();
    }

    return (
        <Container>
            <div id="page-create-commercial" className="body_form">
                <Form onSubmit={changeForm}>
                    <FormGroup>
                        <Label className="strong">CNPJ/CPF:</Label>
                        <Input
                            id="cnpj_cpf"
                            type="text"
                            name="cnpj_cpf"
                            placeholder="CNPJ/CPF"
                            value={inputData.cnpj_cpf}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Nome:</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={inputData.name}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Endereço:</Label>
                        <Input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Endereço"
                            value={inputData.address}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Número:</Label>
                        <Input
                            id="number"
                            type="text"
                            name="number"
                            placeholder="Número"
                            value={inputData.number}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Bairro:</Label>
                        <Input
                            id="neighborhood"
                            type="text"
                            name="neighborhood"
                            placeholder="Bairro"
                            value={inputData.neighborhood}
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

                        <Label className="strong">Celular:</Label>
                        <Input
                            id="mobile_number"
                            type="text"
                            name="mobile_number"
                            placeholder="Celular"
                            value={inputData.mobile_number}
                            onChange={changeInput}></Input>

                        <Label className="strong">Email:</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={inputData.email}
                            onChange={changeInput}></Input>

                        <Label className="strong">Preço:</Label>
                        <Input
                            id="price"
                            type="text"
                            name="price"
                            placeholder="Preço"
                            value={inputData.price}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Dia do Vencimento:</Label>
                        <Input
                            id="due_date"
                            type="text"
                            name="due_date"
                            placeholder="Dia do Vencimento"
                            value={inputData.due_date}
                            required
                            onChange={changeInput}></Input>

                        <Label className="strong">Total de Chamadas:</Label>
                        <Input
                            id="total_calls"
                            type="text"
                            name="total_calls"
                            placeholder="Toral de Chamapadas por Dia"
                            value={inputData.total_calls}
                            required
                            onChange={changeInput}></Input>
                    </FormGroup>

                    <Button id="cancelar" onClick={cancel}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </Form>
            </div>
        </Container>
    )
}
export default CreateCommercial;
