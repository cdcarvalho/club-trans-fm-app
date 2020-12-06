import React, { useEffect, useState } from 'react'
import { Table, Button, Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Speaker from '../../../models/Speaker'
import SpeakerService from '../../../_services/speaker/speakerService';


import './speaker.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const ListSpeaker = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const speakerService = new SpeakerService();

  useEffect(() => {
    let findSpeaker = true;
    try {
      speakerService.getSpeakers().then(speakers => {
        if (findSpeaker) {
          setSpeakers(speakers);
        }
      }).catch((error: string) => {
        alert(error)
      });

    } catch (error) {
      alert(error);
    }

    return function cleanup() {
      findSpeaker = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakerService])

  function getSpeakers() {
    try {
      speakerService.getSpeakers().then(speakers => {
        setSpeakers(speakers);
      });
    } catch (error) {
      alert(error);
    }
  }

  const deleteBy = async (event: any, id: number) => {
    event.persist()
    try {
      speakerService.delete(id).then(() => {
        getSpeakers()
      });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="body">

      <Navbar color="dark" dark>
        <NavbarBrand href="/speaker/list">Locutores</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to="/speaker/create" className="btn btn-primary link-menu">Novo</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Table bordered>
        <thead>
          <tr>
            <th className="cabecalho">Nome</th>
            <th className="cabecalho">Celular</th>
            <th className="cabecalho">Horário</th>
            <th className="cabecalho">Ação</th>
          </tr>
        </thead>
        {speakers.map(speaker => (
          <tbody key={speaker._id}>
            <tr>
              <td className="row_center" style={{ width: '30%' }}>{speaker.name}</td>
              <td className="row_center" style={{ width: '30%' }}>{speaker.mobile_number}</td>
              <td className="row_center" style={{ width: '30%' }}>{speaker.schedule}</td>
              <td>
                <div className="ml-auto">
                  <Link className="btn btn-warning mr-1" style={{ width: '100%', marginTop: '2px' }}
                    to={`/speaker/edit/${speaker._id}`}>Editar</Link>
                  <Button color="danger" style={{ width: '100%', marginTop: '2px' }}
                    onClick={e => deleteBy(e, speaker._id)}>Remover</Button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <footer>
        <Link to="/dashboard">
          <FiArrowLeft />
                Voltar
        </Link>
      </footer>
    </div>
  )
}

export default ListSpeaker;
