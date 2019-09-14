import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SalesList extends Component {
  state = {
    sales: []
  };

  componentDidMount() {
    axios
      .get('api/sales')
      .then(response => {
        console.log(response);
        this.setState({ sales: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { sales } = this.state;
    return (
      <Fragment>

        <div class="container px-0 my-3">
          <h1 class='d-inline-block'>
            <i class="fas fa-hand-holding-usd mr-2"></i>
            Ventas Registradas 
          </h1>
          
          <Link to={{ pathname: `/sales` }} >
            <button type="button" class="btn btn-primary float-right d-inline-block">
              <i class="fas fa-plus mr-2"></i>Nueva Venta
            </button>
          </Link>
          <hr></hr>
        </div>

          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th>Folio Venta</th>
                <th>Clave Cliente </th>
                <th>Nombre</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => {
                return (
                  <tr key={sale._id}>
                    <td>{sale._id}</td>
                    <td>{sale.clientId}</td>
                    <td>{sale.clientName}</td>
                    <td>{sale.total}</td>
                    <td>{sale.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </Fragment>
    );
  }
}

export default SalesList;
