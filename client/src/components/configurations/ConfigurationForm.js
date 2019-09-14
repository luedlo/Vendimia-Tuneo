import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConfigurationForm = props => {
  const [formData, setFormData] = useState({
    financeRate: '',
    deposit: '',
    timeLimit: ''
  });

  const { financeRate, deposit, timeLimit } = formData;

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
        return props.history.push('/');
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

      await axios.post('/api/configurations', body, config);

      Swal.fire({
        title: 'Bien Hecho!',
        text: "Configuración Guardada con Éxito",
        type: 'success',
        confirmButtonColor: '#3085d6',  
        confirmButtonText: '<i class="fas fa-check mr-2"></i>Aceptar'
      }).then(() => {
        props.history.push('/');
      });

    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <Fragment>
      
      <div class="container px-0 my-3">
        <h1 class='d-inline-block'>
            <i class="fas fa-cogs mr-2"></i>
            Configuración 
        </h1>
          <hr></hr>
      
        <form
          onSubmit={e => onSubmit(e)}
          onReset={e => onReset(e)}
        >
          <div class='form-group'>
            <label>Tasa de Financiamiento:</label>
            <input
              type='number'
              placeholder='Tasa de Financiamiento'
              name='financeRate'
              value={financeRate}
              onChange={e => onChange(e)}
              required
              class="form-control"
            />
          </div>

          <div className='form-group'>
            <label>% Enganche:</label>
            <input
              type='number'
              placeholder='% Enganche'
              name='deposit'
              value={deposit}
              onChange={e => onChange(e)}
              required
              class="form-control"
            />
          </div>
          <div className='form-group'>
            <label>Plazo Máximo:</label>
            <input
              type='number'
              placeholder='Plazo Máximo'
              name='timeLimit'
              value={timeLimit}
              onChange={e => onChange(e)}
              required
              class="form-control"
            />
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

export default ConfigurationForm;
