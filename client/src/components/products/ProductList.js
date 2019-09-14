import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class ProductList extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios
      .get('api/products')
      .then(response => {
        console.log(response);
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { products } = this.state;
    return (
      <Fragment>

        <div class="container px-0 my-3">
          <h1 class='d-inline-block'>
            <i class="fas fa-gift mr-2"></i>
            Artículos Registrados
          </h1>
          
          <Link to={{ pathname: `/productos/form` }} >
            <button type="button" class="btn btn-primary float-right d-inline-block">
              <i class="fas fa-plus mr-2"></i>Agregar Artículo
            </button>
          </Link>
          <hr></hr>
        </div>

        <table class="table table-striped">
            <thead class="thead-dark">
            <tr>
              <th>Clave Artículo</th>
              <th>Descripción</th>
              <th>Existencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/productos/actualizar/${product._id}`,
                        state: {
                          product
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

export default withRouter(ProductList);
