import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">
        Bem-vindo ao Sistema de Gerenciamento Esportivo
      </h1>
      <p className="text-center mt-3">
        Use o menu abaixo para navegar pelas diferentes seções da aplicação.
      </p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Times</h5>
              <p className="card-text">
                Adicione, edite ou exclua informações sobre os times.
              </p>
              <Link to="/teams" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Jogadores</h5>
              <p className="card-text">
                Adicione, edite ou exclua informações sobre os jogadores.
              </p>
              <Link to="/players" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Estádios</h5>
              <p className="card-text">
                Adicione, edite ou exclua informações sobre os estádios.
              </p>
              <Link to="/stadiums" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gerenciar Campeonatos</h5>
              <p className="card-text">
                Adicione, edite ou exclua informações sobre os campeonatos.
              </p>
              <Link to="/championships" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Consultas Avançadas</h5>
              <p className="card-text">
                Acesse relatórios e dados complexos do sistema.
              </p>
              <Link to="/advanced-queries" className="btn btn-primary">
                Acessar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
