import React, { useEffect, useState } from "react";
import api from "../services/api";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    api
      .get("/pacientes")
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar pacientes:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Lista de Pacientes</h1>
      <ul className="list-group">
        {pacientes.map((paciente) => (
          <li
            key={paciente.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {paciente.nome}
            <button className="btn btn-danger btn-sm">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pacientes;
