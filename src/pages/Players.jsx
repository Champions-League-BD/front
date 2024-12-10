import React, { useEffect, useState } from "react";
import axios from "axios";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    team_id: "",
  });
  const [teams, setTeams] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Carrega os jogadores e os times do backend
  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/api/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get("/api/teams");
      setTeams(response.data);
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
      if (editingPlayer) {
        // Atualiza o jogador
        await axios.put(`/api/players/${editingPlayer.id}`, formData);
        setEditingPlayer(null);
      } else {
        // Cria um novo jogador
        await axios.post("/api/players", formData);
      }
      setFormData({ name: "", position: "", team_id: "" });
      fetchPlayers();
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData({
      name: player.name,
      position: player.position,
      team_id: player.team_id || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/players/${id}`);
      fetchPlayers();
    } catch (error) {
      console.error("Erro ao excluir jogador:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gerenciamento de Jogadores</h1>

      <div className="mt-4">
        <h3>{editingPlayer ? "Editar Jogador" : "Adicionar Novo Jogador"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Jogador</label>
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
            <label>Posição</label>
            <input
              type="text"
              className="form-control"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Time</label>
            <select
              className="form-control"
              name="team_id"
              value={formData.team_id}
              onChange={handleInputChange}
            >
              <option value="">Selecione um time</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingPlayer ? "Atualizar Jogador" : "Adicionar Jogador"}
          </button>
          {editingPlayer && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-3"
              onClick={() => {
                setEditingPlayer(null);
                setFormData({ name: "", position: "", team_id: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="mt-5">
        <h3>Lista de Jogadores</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posição</th>
              <th>Time</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{player.team?.name || "Sem time"}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(player)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(player.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
