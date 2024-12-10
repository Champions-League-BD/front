import React, { useState } from "react";
import axios from "axios";

const AdvancedQueries = () => {
  const [queryType, setQueryType] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQueryChange = (e) => {
    setQueryType(e.target.value);
    setQueryResult([]);
    setError("");
  };

  const executeQuery = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/queries/${queryType}`);
      setQueryResult(response.data);
    } catch (err) {
      console.error("Erro ao executar consulta:", err);
      setError("Erro ao executar a consulta. Verifique os logs do servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Consultas Avançadas</h1>
      <div className="mt-4">
        <h3>Selecione uma consulta para executar</h3>
        <div className="form-group">
          <label>Tipo de Consulta</label>
          <select
            className="form-control"
            value={queryType}
            onChange={handleQueryChange}
          >
            <option value="">Selecione...</option>
            <option value="top-teams">Times com mais campeonatos</option>
            <option value="player-stats">Estatísticas de jogadores</option>
            <option value="stadium-capacity">Estádios por capacidade</option>
            <option value="team-addresses">Times e seus endereços</option>
            <option value="players-without-teams">Jogadores sem time</option>
          </select>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={executeQuery}
          disabled={!queryType || loading}
        >
          {loading ? "Carregando..." : "Executar Consulta"}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {queryResult.length > 0 && (
        <div className="mt-5">
          <h3>Resultado da Consulta</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(queryResult[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResult.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {queryResult.length === 0 && !loading && !error && queryType && (
        <div className="alert alert-info mt-3" role="alert">
          Nenhum dado encontrado para a consulta selecionada.
        </div>
      )}
    </div>
  );
};

export default AdvancedQueries;
