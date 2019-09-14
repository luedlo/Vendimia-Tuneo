import React, { Fragment, Component } from 'react';
import axios from 'axios';
import Product from './Product';
import Swal from 'sweetalert2';

class Sales extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    clients: [],
    products: [],
    productsSelected: [],
    configuration: [],
    client: '',
    calculations: [],
    totalSelected: ''
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

    axios
      .get('api/products')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('api/configurations')
      .then(response => {
        if (response.data === undefined || response.data.length === 0) {
          alert(
            'Favor de configurar lso parámetros en la pestaña de configuracion'
          );
          return this.props.history.push('/configuracion');
        }
        this.setState({ configuration: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = async e => {
    e.preventDefault();
    var body = {
      clientId: this.state.client._id,
      clientName: `${this.state.client.name} ${this.state.client.apellidoPaterno} ${this.state.client.apellidoMaterno} `,
      total: this.state.totalSelected
    };

    const products = this.state.productsSelected;

    if (products === undefined || products.length === 0) {
      return alert('Favor de selecionar un producto');
    }
    products.map(async product => {
      if (product.quantity === 0) {
        return alert('La cantidad mínima por producto debe ser 1');
      }
    });

    await axios.post('/api/sales', body);

    products.map(async product => {
      if (product.quantity === 0) {
        return alert('La cantidad mínima por producto debe ser 1');
      }
      const body = {
        stock: product.stock - product.quantity
      };

      await axios.patch(`/api/products/product/${product._id}`, body);
    });

    Swal.fire({
      title: 'Bien Hecho!',
      text: "Venta Realizada con Éxito",
      type: 'success',
      confirmButtonColor: '#3085d6',  
      confirmButtonText: '<i class="fas fa-check mr-2"></i>Aceptar'
    });
  };

  handleReset = e => {
    e.preventDefault();
    
    Swal.fire({
      title: 'Cancelar',
      text: "¿Estás seguro que quieres cancelar?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fas fa-check mr-2"></i>Sí',
      cancelButtonText: '<i class="fas fa-times mr-2"></i>No'
    }).then((result) => {
      if (result.value) {
        return this.props.history.push('/ventas');
      }
    });
  };

  calculateDebt(totalAmount) {
    var calculations = Object.assign([], this.state.calculations);
    calculations.deposit = +(
      (this.state.configuration[0].deposit / 100) *
      totalAmount
    ).toFixed(2);
    calculations.depositBonus = +(
      calculations.deposit *
      ((this.state.configuration[0].financeRate *
        this.state.configuration[0].timeLimit) /
        100)
    ).toFixed(2);
    calculations.totalDebt = +(
      totalAmount -
      calculations.deposit -
      calculations.depositBonus
    ).toFixed(2);
    calculations.cashPrice = (
      calculations.totalDebt /
      (1 +
        (this.state.configuration[0].financeRate *
          this.state.configuration[0].timeLimit) /
          100)
    ).toFixed(2);
    calculations.timelimit3 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 3) / 100)
    ).toFixed(2);
    calculations.timelimit6 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 6) / 100)
    ).toFixed(2);
    calculations.timelimit9 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 9) / 100)
    ).toFixed(2);
    calculations.timelimit12 = +(
      calculations.cashPrice *
      (1 + (this.state.configuration[0].financeRate * 12) / 100)
    ).toFixed(2);
    calculations.bonds3 = +(calculations.timelimit3 / 3).toFixed(2);
    calculations.bonds6 = +(calculations.timelimit3 / 6).toFixed(2);
    calculations.bonds9 = +(calculations.timelimit3 / 9).toFixed(2);
    calculations.bonds12 = +(calculations.timelimit3 / 12).toFixed(2);
    calculations.savings3 = +(
      calculations.totalDebt - calculations.timelimit3
    ).toFixed(2);
    calculations.savings6 = +(
      calculations.totalDebt - calculations.timelimit6
    ).toFixed(2);
    calculations.savings9 = +(
      calculations.totalDebt - calculations.timelimit9
    ).toFixed(2);
    calculations.savings12 = +(
      calculations.totalDebt - calculations.timelimit12
    ).toFixed(2);

    this.setState({ calculations: calculations });
  }

  calculatePrice(product) {
    const price =
      product.cost *
      (1 +
        (this.state.configuration[0].financeRate *
          this.state.configuration[0].timeLimit) /
          100);

    return +price.toFixed(2);
  }

  calculateTotalAmount(products) {
    var totalAmount = products.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);
    this.calculateDebt(+totalAmount.toFixed(2));
  }

  calculateAmount(product) {
    const amount = product.price * product.quantity;
    return +amount.toFixed(2);
  }
  handleChangeRadio(e) {
    this.setState({ totalSelected: e });
  }

  handleChangeProducts(e) {
    const product = JSON.parse(e);
    if (product.stock <= 0) {
      return alert(
        'El artículo seleccionado no cuenta con existencia, favor de verificar'
      );
    }
    product.price = this.calculatePrice(product);
    this.setState({
      productsSelected: [...this.state.productsSelected, product]
    });
  }

  handleChangeClients(e) {
    const client = JSON.parse(e);
    this.setState({ client: client });
  }
  deleteProduct = (index, e) => {
    const products = Object.assign([], this.state.productsSelected);
    products.splice(index, 1);
    this.calculateTotalAmount(products);
    this.setState({ productsSelected: products });
  };

  handleChangeQuantity = (index, e) => {
    const products = Object.assign([], this.state.productsSelected);
    if (e > products[index].stock) {
      return alert(
        `Lo sentimos, sólo tenemos ${products[index].stock} en stock`
      );
    }
    products[index].quantity = e;
    products[index].amount = this.calculateAmount(products[index]);
    this.calculateTotalAmount(products);
    this.setState({ productsSelected: products });
  };

  render() {
    const { client } = this.state;
    const { products } = this.state;
    const { clients } = this.state;

    return (
      <Fragment>

        <div class="container px-0 my-3 pb-5">
          <h1 class='d-inline-block'>
            <i class="fas fa-hand-holding-usd mr-2"></i>
            Registro de Ventas
          </h1>
          <hr></hr>

          <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
            
            <div class="form-group row">
              <label class="col-sm-1 col-form-label">Cliente:</label>
              <div class="col-sm-11">
                <select
                  required
                  onChange={e => this.handleChangeClients(e.target.value)}
                  class="form-control custom-select"
                >
                  <option disabled value='' selected hidden>
                    Seleccione un Cliente
                  </option>
                  {clients.map(client => {
                    return (
                      <option value={JSON.stringify(client)}>
                        {client.name.concat(
                          ' ',
                          client.apellidoPaterno,
                          ' ',
                          client.apellidoMaterno
                        )}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-1 col-form-label">RFC:</label>
              <label class="col-sm-11 col-form-label">{client.RFC}</label>
            </div>

            <div class="form-group row">
              <label class="col-sm-1 col-form-label">Artículo:</label>
              <div class="col-sm-11">
                <select
                  className='dropdown'
                  onChange={e => this.handleChangeProducts(e.target.value)}
                  class="form-control custom-select"
                >
                  <option className='select' disabled value='' selected hidden>
                    Seleccione un Artículo
                  </option>
                  {products.map(product => {
                    return (
                      <option value={JSON.stringify(product)}>
                        {product.description}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th>Descripción de Articulo</th>
                  <th>Modelo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Importe</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.productsSelected.map((product, index) => {
                  return (
                    <Product
                      delEvent={this.deleteProduct.bind(this, index)}
                      changeQuantity={e =>
                        this.handleChangeQuantity(index, e.target.value)
                      }
                      product={product}
                    />
                  );
                })}
                <br></br>
                <br></br>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Enganche</td>
                  <td>{this.state.calculations.deposit}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Bonificacion Enganche</td>
                  <td>{this.state.calculations.depositBonus}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td>{this.state.calculations.totalDebt}</td>
                </tr>
              </tbody>
            </table>


            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th></th>
                  <th></th>
                  <th>ABONOS MENSUALES</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3 ABONOS DE</td>
                  <td>{this.state.calculations.bonds3}</td>
                  <td>
                    TOTAL A PAGAR
                    <legend>{this.state.calculations.timelimit3}</legend>
                  </td>
                  <td>
                    SE AHORRA<legend>{this.state.calculations.savings3}</legend>
                  </td>
                  <td>
                    <input
                      type='radio'
                      name='radio'
                      value={this.state.calculations.timelimit3}
                      required
                      onChange={e => this.handleChangeRadio(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>6 ABONOS DE</td>
                  <td>{this.state.calculations.bonds6}</td>
                  <td>
                    TOTAL A PAGAR
                    <legend>{this.state.calculations.timelimit6}</legend>
                  </td>
                  <td>
                    SE AHORRA<legend>{this.state.calculations.savings6}</legend>
                  </td>
                  <td>
                    <input
                      type='radio'
                      name='radio'
                      value={this.state.calculations.timelimit6}
                      required
                      onChange={e => this.handleChangeRadio(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>9 ABONOS DE</td>
                  <td>{this.state.calculations.bonds9}</td>
                  <td>
                    TOTAL A PAGAR
                    <legend>{this.state.calculations.timelimit9}</legend>
                  </td>
                  <td>
                    SE AHORRA<legend>{this.state.calculations.savings9}</legend>
                  </td>
                  <td>
                    <input
                      type='radio'
                      name='radio'
                      value={this.state.calculations.timelimit9}
                      required
                      onChange={e => this.handleChangeRadio(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>12 ABONOS DE</td>
                  <td>{this.state.calculations.bonds12}</td>
                  <td>
                    TOTAL A PAGAR
                    <legend>{this.state.calculations.timelimit12}</legend>
                  </td>
                  <td>
                    SE AHORRA<legend>{this.state.calculations.savings12}</legend>
                  </td>
                  <td>
                    <input
                      type='radio'
                      name='radio'
                      value={this.state.calculations.timelimit12}
                      required
                      onChange={e => this.handleChangeRadio(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            
            <hr></hr>
                
            <button type='reset' class='btn btn-primary float-right'>
              <i class="fas fa-times mr-2"></i>
              Cancelar
            </button>

            <button type='submit' class='btn btn-success float-right mr-2'>
              <i class="fas fa-save mr-2"></i>
              Guardar
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default Sales;
