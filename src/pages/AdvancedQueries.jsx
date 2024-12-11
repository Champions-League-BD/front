import React, { useState } from "react";
import axios from "axios";

const AdvancedQueries = () => {
  const [queryCategory, setQueryCategory] = useState("");
  const [queryType, setQueryType] = useState("");
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCategoryChange = (e) => {
    setQueryCategory(e.target.value);
    setQueryType(""); // Reset query type when category changes
    setQueryResult([]);
    setError("");
  };

  const handleQueryChange = (e) => {
    setQueryType(e.target.value);
    setQueryResult([]);
    setError("");
  };

  const executeQuery = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "";
      switch (queryType) {
        case "all-players-from-team":
          url = `/api/teams/1/players`; // Endpoint para jogadores de um time específico
          break;
        case "stadiums-after-1990":
          url = `/api/stadiums/after-year/1990`; // Estádios usados por times fundados após 1990
          break;
        case "players-same-stadium-address":
          url = `/api/players/same-stadium-address/1`; // Jogadores que residem no mesmo endereço que um estádio
          break;
        case "count-players-by-team":
          url = `/api/players/count-players-by-team`; // Contagem de jogadores por time
          break;
        case "teams-with-large-stadiums":
          url = `/api/teams/capacity-greater-than/30000`; // Times com estádios maiores que 30.000
          break;
        default:
          throw new Error("Tipo de consulta desconhecido.");
      }

      const response = await axios.get(url);
      setQueryResult(response.data);
    } catch (err) {
      console.error("Erro ao executar consulta:", err);
      setError("Erro ao executar a consulta. Verifique os logs do servidor.");
    } finally {
      setLoading(false);
    }
  };

  const queryOptions = {
    "basic-queries": [
      {
        value: "all-players-from-team",
        label: "Listar todos os jogadores de um time específico",
      },
      {
        value: "stadiums-after-1990",
        label: "Listar estádios usados por times fundados após 1990",
      },
      {
        value: "players-same-stadium-address",
        label: "Listar jogadores que residem no mesmo endereço que um estádio",
      },
      {
        value: "count-players-by-team",
        label: "Contar o número de jogadores de cada time",
      },
      {
        value: "teams-with-large-stadiums",
        label: "Listar times com estádios de capacidade maior que 30.000",
      },
    ],
  };

  const renderTable = () => {
    if (queryType === "count-players-by-team") {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Time ID</th>
              <th>Total Jogadores</th>
            </tr>
          </thead>
          <tbody>
            {queryResult.map((row, index) => (
              <tr key={index}>
                <td>{row.team_id}</td>
                <td>{row.total_jogadores}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(queryResult[0] || {}).map((key) => (
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
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Consultas Avançadas</h1>
      <div className="mt-4">
        <h3>Selecione uma categoria e consulta para executar</h3>
        <div className="form-group">
          <label>Categoria de Consultas</label>
          <select
            className="form-control"
            value={queryCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Selecione uma categoria...</option>
            <option value="basic-queries">Consultas Básicas e Aninhadas</option>
          </select>
        </div>

        {queryCategory && (
          <div className="form-group mt-3">
            <label>Tipo de Consulta</label>
            <select
              className="form-control"
              value={queryType}
              onChange={handleQueryChange}
            >
              <option value="">Selecione uma consulta...</option>
              {queryOptions[queryCategory].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

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
          {renderTable()}
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
