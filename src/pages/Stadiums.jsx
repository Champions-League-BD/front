import React, { useEffect, useState } from "react";
import axios from "axios";

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    built_year: "",
    owner: "",
    address_id: "",
    team_id: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editingStadium, setEditingStadium] = useState(null);

  // Carrega os estádios, endereços e times do backend
  useEffect(() => {
    fetchStadiums();
    fetchAddresses();
    fetchTeams();
  }, []);

  const fetchStadiums = async () => {
    try {
      const response = await axios.get("/api/stadiums");
      setStadiums(response.data);
    } catch (error) {
      console.error("Erro ao buscar estádios:", error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("/api/addresses");
      setAddresses(response.data);
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
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
      if (editingStadium) {
        // Atualiza o estádio
        await axios.put(`/api/stadiums/${editingStadium.id}`, formData);
        setEditingStadium(null);
      } else {
        // Cria um novo estádio
        await axios.post("/api/stadiums", formData);
      }
      setFormData({
        name: "",
        capacity: "",
        built_year: "",
        owner: "",
        address_id: "",
        team_id: "",
      });
      fetchStadiums();
    } catch (error) {
      console.error("Erro ao salvar estádio:", error);
    }
  };

  const handleEdit = (stadium) => {
    setEditingStadium(stadium);
    setFormData({
      name: stadium.name,
      capacity: stadium.capacity,
      built_year: stadium.built_year,
      owner: stadium.owner,
      address_id: stadium.address_id || "",
      team_id: stadium.team_id || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/stadiums/${id}`);
      fetchStadiums();
    } catch (error) {
      console.error("Erro ao excluir estádio:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gerenciamento de Estádios</h1>

      <div className="mt-4">
        <h3>{editingStadium ? "Editar Estádio" : "Adicionar Novo Estádio"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Estádio</label>
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
            <label>Capacidade</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Ano de Construção</label>
            <input
              type="number"
              className="form-control"
              name="built_year"
              value={formData.built_year}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Proprietário</label>
            <input
              type="text"
              className="form-control"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Endereço</label>
            <select
              className="form-control"
              name="address_id"
              value={formData.address_id}
              onChange={handleInputChange}
            >
              <option value="">Selecione um endereço</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {`${address.street}, ${address.city}, ${address.state}`}
                </option>
              ))}
            </select>
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
            {editingStadium ? "Atualizar Estádio" : "Adicionar Estádio"}
          </button>
          {editingStadium && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-3"
              onClick={() => {
                setEditingStadium(null);
                setFormData({
                  name: "",
                  capacity: "",
                  built_year: "",
                  owner: "",
                  address_id: "",
                  team_id: "",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="mt-5">
        <h3>Lista de Estádios</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Capacidade</th>
              <th>Ano de Construção</th>
              <th>Proprietário</th>
              <th>Endereço</th>
              <th>Time</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium) => (
              <tr key={stadium.id}>
                <td>{stadium.name}</td>
                <td>{stadium.capacity}</td>
                <td>{stadium.built_year}</td>
                <td>{stadium.owner}</td>
                <td>
                  {stadium.address
                    ? `${stadium.address.street}, ${stadium.address.city}, ${stadium.address.state}`
                    : "Sem endereço"}
                </td>
                <td>{stadium.team ? stadium.team.name : "Sem time"}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(stadium)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(stadium.id)}
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

export default Stadiums;
