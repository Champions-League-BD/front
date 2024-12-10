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
      const response = await axios.get(`/api/queries/${queryType}`);
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
      { value: "all-teams", label: "Listar todos os times" },
      { value: "all-players", label: "Listar todos os jogadores" },
      { value: "teams-without-stadiums", label: "Times sem estádios" },
      { value: "players-without-address", label: "Jogadores sem endereço" },
      { value: "championship-teams", label: "Times por campeonato" },
    ],
    "string-operations": [
      { value: "team-name-search", label: "Pesquisar times por nome" },
      { value: "player-name-search", label: "Pesquisar jogadores por nome" },
      { value: "city-search", label: "Pesquisar cidades por substring" },
      { value: "stadium-name-pattern", label: "Estádios com nome padrão" },
      { value: "team-name-length", label: "Times com nomes curtos/longos" },
    ],
    "aggregate-functions": [
      { value: "max-capacity", label: "Estádio com maior capacidade" },
      { value: "team-player-count", label: "Quantidade de jogadores por time" },
      { value: "average-capacity", label: "Capacidade média dos estádios" },
      { value: "players-by-position", label: "Jogadores por posição" },
      {
        value: "teams-in-championship",
        label: "Times por campeonato (HAVING)",
      },
    ],
    ordering: [
      { value: "teams-by-founding", label: "Times por ano de fundação" },
      { value: "stadiums-by-capacity", label: "Estádios por capacidade" },
      { value: "players-by-name", label: "Jogadores por nome" },
      { value: "championships-by-name", label: "Campeonatos por nome" },
      { value: "addresses-by-city", label: "Endereços por cidade" },
    ],
    joins: [
      { value: "teams-and-stadiums", label: "Times e seus estádios" },
      { value: "players-and-teams", label: "Jogadores e seus times" },
      { value: "players-address", label: "Jogadores e seus endereços" },
      { value: "teams-with-championships", label: "Times com campeonatos" },
      { value: "stadiums-address", label: "Estádios e endereços" },
    ],
    "multiset-operators": [
      {
        value: "players-in-multiple-teams",
        label: "Jogadores em mais de um time",
      },
      {
        value: "teams-in-all-championships",
        label: "Times em todos os campeonatos",
      },
      { value: "players-in-any-team", label: "Jogadores em qualquer time" },
      {
        value: "teams-with-some-championships",
        label: "Times com alguns campeonatos",
      },
      {
        value: "players-without-teams",
        label: "Jogadores sem times (diferença)",
      },
    ],
    exists: [
      {
        value: "exists-teams-without-stadiums",
        label: "Existem times sem estádios?",
      },
      {
        value: "exists-championship-teams",
        label: "Existem campeonatos com times?",
      },
      {
        value: "exists-stadium-capacity",
        label: "Existem estádios com mais de 50 mil lugares?",
      },
      {
        value: "exists-players-in-team",
        label: "Existem jogadores em algum time?",
      },
      {
        value: "exists-address-with-team",
        label: "Existem endereços associados a times?",
      },
    ],
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
            <option value="string-operations">Operações com Strings</option>
            <option value="aggregate-functions">Funções Agregadas</option>
            <option value="ordering">Ordenação</option>
            <option value="joins">Joins</option>
            <option value="multiset-operators">
              Operadores de Multiconjunto
            </option>
            <option value="exists">Operador Exists</option>
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
