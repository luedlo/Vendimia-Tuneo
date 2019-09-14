import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const date = new Date().toLocaleDateString();
  return (

    <nav class="navbar navbar-expand-lg navbar-dark bg-navbar">
      <a class="navbar-brand" href="/"><i class="fas fa-money-check-alt d-inline-block mr-2"></i>
       
        Vendimia
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item active">
            <a href="/ventas">
              <Link className="nav-link" to='/ventas'>Ventas</Link>
            </a>
          </li>

          <li class="nav-item">
            <a href="/clientes">
              <Link className="nav-link" to='/clientes'>Clientes</Link>
            </a>
          </li>
          
          <li class="nav-item">
            <a href="/productos">
              <Link className="nav-link" to='/productos'>Artículos</Link>
            </a>
          </li>
          
          <li class="nav-item">
            <a href="/configuracion">
              <Link className="nav-link" to='/configuracion'>Configuración</Link>
            </a>
          </li>
          
          <li class="nav-item">
            <span class="nav-link">
              {date}
            </span>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
