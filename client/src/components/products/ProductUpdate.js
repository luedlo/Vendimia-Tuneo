import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductUpdate(props) {
  const { id } = props.match.params;
  const { product } = props.location.state;
  console.log('Producto');
  console.log(product);

  const [formData, setFormData] = useState({
    description: '',
    model: '',
    cost: '',
    stock: ''
  });

  const { description, model, cost, stock } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = async e => {
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
        props.history.push(`/productos`);
      }
    });

  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (formData.description === '') {
        formData.description = product.description;
      }
      if (formData.model === '') {
        formData.model = product.model;
      }
      if (formData.cost === '') {
        formData.cost = product.cost;
      }
      if (formData.stock === '') {
        formData.stock = product.stock;
      }
      const body = JSON.stringify(formData);

      await axios.patch(
        `/api/products/product/${id}`,
        body,
        config
      );
      
      Swal.fire({
        title: 'Bien Hecho!',
        text: "Artículo Editado con Éxito",
        type: 'success',
        confirmButtonColor: '#3085d6',  
        confirmButtonText: '<i class="fas fa-check mr-2"></i>Aceptar'
      }).then(() => {
        props.history.push(`/productos`);
      });

    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>

      <div class="container px-0 my-3 pb-5">
        <h1 class='d-inline-block'>
          <i class="fas fa-gift mr-2"></i>
          Editar Artículo
        </h1>
        <hr></hr>
        <p className='lead'>
          Información del Artículo
        </p>

      <form className='form' onSubmit={e => onSubmit(e)} onReset={e => onReset(e)}>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Descripción:</label>
            <div class="col-sm-10">
            <input
              type='text'
              placeholder={product.description}
              name='description'
              value={description}
              onChange={e => onChange(e)}
              class="form-control"
            />
          </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Modelo:</label>
            <div class="col-sm-10">
            <input
              type='text'
              placeholder={product.model}
              name='model'
              value={model}
              onChange={e => onChange(e)}
              class="form-control"
            />
          </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Precio:</label>
            <div class="col-sm-10">
            <input
              type='number'
              placeholder={product.cost}
              name='cost'
              value={cost}
              onChange={e => onChange(e)}
              class="form-control"
            />
          </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Existencia:</label>
            <div class="col-sm-10">
            <input
              type='number'
              placeholder={product.stock}
              name='stock'
              value={stock}
              onChange={e => onChange(e)}
              class="form-control"
            />
          </div>
        </div>

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

export default ProductUpdate;
