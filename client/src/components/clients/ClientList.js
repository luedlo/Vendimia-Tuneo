import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ClientList extends Component {
  state = {
    clients: []
  };

  componentDidMount() {
    axios
      .get('api/clients')
      .then(response => {
        console.log(response);
        this.setState({ clients: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { clients } = this.state;

    return (
      <Fragment>

        <div class="container px-0 my-3">
          <h1 class='d-inline-block'>
            <i class="fas fa-user mr-2"></i>
            Clientes Registrados
          </h1>
          
          <Link to='/clientes/form'>
          <button type="button" class="btn btn-primary float-right d-inline-block">
              <i class="fas fa-plus mr-2"></i>Agregar Cliente
            </button>
          </Link>
          <hr></hr>
        </div>

        <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
              <th>Clave Cliente</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => {
              return (
                <tr key={client._id}>
                  <td>{client._id}</td>
                  <td>
                    {client.name.concat(
                      ' ',
                      client.apellidoPaterno,
                      ' ',
                      client.apellidoMaterno
                    )}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/clientes/actualizar/${client._id}`,
                        state: {
                          client
                        }
                      }}
                    >
                      <button type="button" class="btn btn-info">
                        <i class="fas fa-pencil-alt mr-2"></i>Editar
                      </button>
                      
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default ClientList;
