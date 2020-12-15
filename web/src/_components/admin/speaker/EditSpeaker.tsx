import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../_services/api'
import { getToken } from '../../../_services/auth'

import './speaker.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const EditSpeaker = () => {

  const history = useHistory()
  const { id }: any = useParams();

  const [inputData, setInputData] = useState({
    name: '',
    mobile_number: '',
    schedule: '',
  });

  function changeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setInputData({ ...inputData, [name]: value })
  }

  async function changeForm(event: FormEvent) {
    event.preventDefault()

    const { name, mobile_number, schedule } = inputData;

    const data = {
      name, mobile_number, schedule
    };

    await api.put(`speaker/${id}`, data, {
      headers: {
        Authorization: `Basic ${getToken()}`
      }
    })

    alert('Locutor Alterado com Sucesso!')

    history.goBack()
  }

  useEffect(() => {
    loadSpeaker(id)
  }, [id])

  async function loadSpeaker(id: string) {
    const response = await api.get(`speaker/${id}`, {
      headers: {
        Authorization: `Basic ${getToken()}`
      }
    })

    const speaker = {
      name: response.data.name,
      mobile_number: response.data.mobile_number,
      schedule: response.data.schedule
    }

    setInputData(speaker)
  }

  function cancel() {
    history.goBack()
  }

  return (
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
        <Button type="submit">Alterar</Button>
      </Form>
    </div>
  )
}
export default EditSpeaker