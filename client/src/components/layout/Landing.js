import React from 'react';

const Landing = () => {
  return (
    <section className='landing'>
      
      <div className='landing-inner'>
        <h1>Bienvenido a Vendimia - ConCrédito</h1>
        <p className='lead'>
          Cumple tus sueños y los de tu familia, el éxito está con tus
          conocidos y gente de confianza.
        </p>
      </div>

      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner position-fixed">

          <div class="carousel-item active">
            <img class='d-block w-100 overlay' src="back-1.jpg" alt="First Background"/>
          </div>

          <div class="carousel-item">
            <img class='d-block w-100 overlay' src="back-2.jpg" alt="Second Background"/>
          </div>

          <div class="carousel-item">
            <img class='d-block w-100 overlay' src="back-3.jpg" alt="Third Background"/>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Landing;
