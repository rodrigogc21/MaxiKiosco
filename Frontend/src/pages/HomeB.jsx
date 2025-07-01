import { Link } from 'react-router-dom';

const HomeB = () => {
  return (
    <div>
      <div className="bg-danger-subtle text-dark text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">¡Bienvenido a MaxiKiosco!</h1>
          <p className="lead">Tu tienda de confianza para snacks, chocolates y mucho más.</p>
          <Link to="/catalogo" className="btn btn-dark btn-lg mt-3">Ver Catálogo</Link>
        </div>
      </div>

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://i.imgur.com/RG0HjGg.jpg"
              alt="Kiosco"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2>¿Quiénes somos?</h2>
            <p>
              En <strong>MaxiKiosco</strong> ofrecemos una amplia variedad de productos para
              satisfacer tus antojos en cualquier momento del día. Desde golosinas clásicas
              hasta bebidas bien frías y artículos de uso diario.
            </p>
            <p>
              Atendemos con buena onda y buscamos que cada compra sea rápida, fácil y cercana.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-4">Categorías destacadas</h3>
          <div className="row justify-content-center">
            <div className="col-6 col-md-3 mb-3">
              <div className="card h-100 shadow-sm">
                <img src="https://i.imgur.com/MZ4Z318.png" className="card-img-top" alt="Golosinas" />
                <div className="card-body">
                  <h5 className="card-title">Golosinas</h5>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="card h-100 shadow-sm">
                <img src="https://i.imgur.com/grUmjiu.png" className="card-img-top" alt="Chocolates" />
                <div className="card-body">
                  <h5 className="card-title">Chocolates</h5>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="card h-100 shadow-sm">
                <img src="https://i.imgur.com/ObbuRPY.jpeg" className="card-img-top" alt="Snacks" />
                <div className="card-body">
                  <h5 className="card-title">Snacks</h5>
                </div>
              </div>
            </div>
          </div>
          <Link to="/catalogo" className="btn btn-outline-danger mt-4">Explorar todas las categorías</Link>
        </div>
      </div>
    </div>
  );
}

export default HomeB;
