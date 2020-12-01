import React, { useEffect, useState } from 'react'
import { Table, Button, Navbar, Nav, NavItem, NavbarBrand, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Commercial from '../../../models/Commercial'
import CommercialService from '../../../_services/commercial/commercialService';
import ScheduleCommercial from './../schedule/schedule';


import './commercial.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const ListCommercial = () => {
  const [commecials, setCommecials] = useState<Commercial[]>([])
  const [incoming, setIncoming] = useState<Number>();
  const commercialService = new CommercialService();

  useEffect(() => {
    let findCommercial = true;
    try {
      commercialService.getCommercials().then(commecials => {
        if (findCommercial) {
          setCommecials(commecials);
        }
      }).catch((error: string) => {
        alert(error)
      });
    } catch (error) {
      alert(error);
    }

    return function cleanup() {
      findCommercial = false
    }

  }, [commercialService])

  function getCommercials() {
    try {
      commercialService.getCommercials().then(commecials => {
        setCommecials(commecials);
      });
    } catch (error) {
      alert(error);
    }
  }

  /*
  function teste() {
    try {
      var total = 2;

      commecials.map(commercial => (
        total = + commercial.price
      ))

      setIncoming(total)
      console.log(incoming)
    } catch (error) {
      alert(error);
    }
  }

*/

  const deleteBy = async (event: any, id: number) => {
    event.persist()
    try {
      commercialService.delete(id).then(() => {
        getCommercials()
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="body">

      <Navbar color="dark" dark>
        <NavbarBrand href="/commercial/list">Comercial</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to="/commercial/create" className="btn btn-primary link-menu">Novo</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Table bordered>
        <thead>
          <tr>
            <th className="cabecalho">CNPJ/CPF</th>
            <th className="cabecalho">Nome</th>
            <th className="cabecalho">Telefone</th>
            <th className="cabecalho">Responsável</th>
            <th className="cabecalho">Percentual (%)</th>
            <th className="cabecalho">Preço</th>
            <th className="cabecalho">Total de Chamadas</th>
            <th className="cabecalho">Dia do Vencimento</th>
            <th className="cabecalho">Ação</th>
          </tr>
        </thead>
        {commecials.map(commercial => (
          <tbody key={commercial._id}>
            <tr>
              <td className="row_center" style={{ width: '10%' }}>{commercial.cnpj_cpf}</td>
              <td className="row_center" style={{ width: '30%' }}>{commercial.name}</td>
              <td className="row_center" style={{ width: '25%' }}>{commercial.phone} - {commercial.mobile_number}</td>
              <td className="row_center" style={{ width: '20%' }}>{commercial.speaker}</td>
              <td className="row_center" style={{ width: '25%' }}>{commercial.percentage}</td>
              <td className="row_center" style={{ width: '15%' }}>{commercial.price}</td>
              <td className="row_center" style={{ width: '15%' }}>{commercial.total_calls}</td>
              <td className="row_center" style={{ width: '15%' }}>{commercial.due_date}</td>
              <td>
                <div className="ml-auto">
                  <ScheduleCommercial idCommercial={commercial._id} total_calls={commercial.total_calls} />
                  <Link className="btn btn-warning mr-1" style={{ width: '100%', marginTop: '2px' }}
                    to={`/commercial/edit/${commercial._id}`}>Editar</Link>
                  <Button color="danger" style={{ width: '100%', marginTop: '2px' }}
                    onClick={e => deleteBy(e, commercial._id)}>Remover</Button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <Label className="strong"> Total:  {incoming}</Label>

      <footer>
        <Link to="/dashboard">
          <FiArrowLeft />
                Voltar
        </Link>
      </footer>
    </div>
  )
}

export default ListCommercial
