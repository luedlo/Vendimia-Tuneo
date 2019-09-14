import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClientForm = props => {
  const [formData, setFormData] = useState({
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    RFC: ''
  });

  const { name, apellidoPaterno, apellidoMaterno, RFC } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onReset = e => {
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
        props.history.push('/clientes');
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
      const body = JSON.stringify(formData);

      await axios.post('/api/clients', body, config);

      Swal.fire({
        title: 'Bien Hecho!',
        text: "Cliente Registrado con Éxito",
        type: 'success',
        confirmButtonColor: '#3085d6',  
        confirmButtonText: '<i class="fas fa-check mr-2"></i>Aceptar'
      }).then(() => {
        props.history.push('/clientes');
      });


    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>

      <div class="container px-0 my-3 pb-5">
        <h1 class='d-inline-block'>
          <i class="fas fa-user mr-2"></i>
          Registro de Cliente
        </h1>
        <hr></hr>
        <p className='lead'>
          Información del Cliente
        </p>

        <form className='form' onSubmit={e => onSubmit(e)} onReset={e => onReset(e)}>

          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Nombre(s):</label>
            <div class="col-sm-10">
              <input
                type='text'
                placeholder='Nombre(s)'
                name='name'
                value={name}
                onChange={e => onChange(e)}
                required
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-2">Apellido Paterno:</label>
            <div class="col-sm-10">
              <input
                type='text'
                placeholder='Apellido Paterno'
                name='apellidoPaterno'
                value={apellidoPaterno}
                onChange={e => onChange(e)}
                required
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-2">Apellido Materno:</label>
            <div class="col-sm-10">
              <input
                type='text'
                placeholder='Apellido Materno'
                name='apellidoMaterno'
                value={apellidoMaterno}
                onChange={e => onChange(e)}
                required
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-2">RFC:</label>
            <div class="col-sm-10">
              <input
                type='text'
                placeholder='RFC'
                name='RFC'
                value={RFC}
                onChange={e => onChange(e)}
                required
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
};

export default ClientForm;
