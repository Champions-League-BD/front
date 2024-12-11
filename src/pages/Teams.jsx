import React, { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    founded_year: "",
    fifa_ranking: "",
    market_value: "",
  });
  const [editingTeam, setEditingTeam] = useState(null);

  // Carrega os times do backend
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/teams");
      console.log("Resposta da API:", response.data);
      const formattedTeams = Array.isArray(response.data)
        ? response.data.map((team) => ({
            ...team,
            foundedYear: team.foundedYear || "Ano não informado", // Substitui 0 por texto padrão
          }))
        : [];
      setTeams(formattedTeams);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        foundedYear: formData.founded_year, // Ajusta para o formato esperado pelo backend
        fifaRanking: formData.fifa_ranking,
        marketValue: formData.market_value,
      };
      if (editingTeam) {
        // Atualiza o time
        await axios.put(`/api/teams/${editingTeam.id}`, payload);
        setEditingTeam(null);
      } else {
        // Cria um novo time
        await axios.post("/api/teams", payload);
      }
      setFormData({
        name: "",
        founded_year: "",
        fifa_ranking: "",
        market_value: "",
      });
      fetchTeams();
    } catch (error) {
      console.error("Erro ao salvar time:", error);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      founded_year:
        team.foundedYear === "Ano não informado" ? "" : team.foundedYear, // Adapta o valor para o formulário
      fifa_ranking: team.fifaRanking || "",
      market_value: team.marketValue || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/teams/${id}`);
      fetchTeams();
    } catch (error) {
      console.error("Erro ao excluir time:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gerenciamento de Times</h1>

      <div className="mt-4">
        <h3>{editingTeam ? "Editar Time" : "Adicionar Novo Time"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Time</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Ano de Fundação</label>
            <input
              type="number"
              className="form-control"
              name="founded_year"
              value={formData.founded_year}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Ranking FIFA</label>
            <input
              type="number"
              className="form-control"
              name="fifa_ranking"
              value={formData.fifa_ranking}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Valor de Mercado (em milhões)</label>
            <input
              type="number"
              className="form-control"
              name="market_value"
              value={formData.market_value}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingTeam ? "Atualizar Time" : "Adicionar Time"}
          </button>
          {editingTeam && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-3"
              onClick={() => {
                setEditingTeam(null);
                setFormData({
                  name: "",
                  founded_year: "",
                  fifa_ranking: "",
                  market_value: "",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="mt-5">
        <h3>Lista de Times</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ano de Fundação</th>
              <th>Ranking FIFA</th>
              <th>Valor de Mercado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.foundedYear}</td>
                  <td>{team.fifaRanking}</td>
                  <td>{team.marketValue} milhões</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(team)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(team.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum time encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
