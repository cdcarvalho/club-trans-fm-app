import React, { useEffect, useState } from 'react'
import { Table, Button, Navbar, Nav, NavItem, NavbarBrand, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Expense from '../../../models/Expense'
import ExpenseService from '../../../_services/expense/expenseService';


import './expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'


const ListExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [output, setOutput] = useState<Number>();
  const expenseService = new ExpenseService();

  useEffect(() => {
    let findExpense = true;
    try {
      expenseService.getExpenses().then(expenses => {
        if (findExpense) {
          setExpenses(expenses);
        }
      }).catch((error: string) => {
        alert(error)
      });

      if (findExpense) {
        totalOutputs()
      }

    } catch (error) {
      alert(error);
    }

    return function cleanup() {
      findExpense = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenseService])

  function getExpenses() {
    try {
      expenseService.getExpenses().then(expenses => {
        setExpenses(expenses);
      });
    } catch (error) {
      alert(error);
    }
  }

  function totalOutputs() {
    try {
      var total = 0;

      expenses.map(expenses => (
        total = + total + expenses.price
      ))
      setOutput(total)
    } catch (error) {
      alert(error);
    }
  }

  const deleteBy = async (event: any, id: number) => {
    event.persist()
    try {
      expenseService.delete(id).then(() => {
        getExpenses()
      });
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div className="body">

      <Navbar color="dark" dark>
        <NavbarBrand href="/expense/list">Dispensas</NavbarBrand>
        <Nav>
          <NavItem>
            <Link to="/expense/create" className="btn btn-primary link-menu">Novo</Link>
          </NavItem>
        </Nav>
      </Navbar>

      <Table bordered>
        <thead>
          <tr>
            <th className="cabecalho">Descrição</th>
            <th className="cabecalho">Telefone</th>
            <th className="cabecalho">Mês</th>
            <th className="cabecalho">Preço</th>
            <th className="cabecalho">Ação</th>
          </tr>
        </thead>
        {expenses.map(expense => (
          <tbody key={expense._id}>
            <tr>
              <td className="row_center" style={{ width: '30%' }}>{expense.description}</td>
              <td className="row_center" style={{ width: '30%' }}>{expense.phone}</td>
              <td className="row_center" style={{ width: '30%' }}>{expense.month}</td>
              <td className="row_center" style={{ width: '30%' }}>{expense.price}</td>
              <td>
                <div className="ml-auto">
                  <Link className="btn btn-warning mr-1" style={{ width: '100%', marginTop: '2px' }}
                    to={`/expense/edit/${expense._id}`}>Editar</Link>
                  <Button color="danger" style={{ width: '100%', marginTop: '2px' }}
                    onClick={e => deleteBy(e, expense._id)}>Remover</Button>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>

      <Label className="strong" style={{ color: 'red' }}> Total de Dispesas: R$: {output?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Label>

      <footer>
        <Link to="/dashboard">
          <FiArrowLeft />
                Voltar
        </Link>
      </footer>
    </div>
  )
}

export default ListExpense;
