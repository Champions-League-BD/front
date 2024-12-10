import React, { useEffect, useState } from "react";
import axios from "axios";

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    address_id: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [editingStadium, setEditingStadium] = useState(null);

  // Carrega os estádios e os endereços do backend
  useEffect(() => {
    fetchStadiums();
    fetchAddresses();
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
      setFormData({ name: "", capacity: "", address_id: "" });
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
      address_id: stadium.address_id || "",
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
          <button type="submit" className="btn btn-primary mt-3">
            {editingStadium ? "Atualizar Estádio" : "Adicionar Estádio"}
          </button>
          {editingStadium && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-3"
              onClick={() => {
                setEditingStadium(null);
                setFormData({ name: "", capacity: "", address_id: "" });
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
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium) => (
              <tr key={stadium.id}>
                <td>{stadium.name}</td>
                <td>{stadium.capacity}</td>
                <td>
                  {stadium.address
                    ? `${stadium.address.street}, ${stadium.address.city}, ${stadium.address.state}`
                    : "Sem endereço"}
                </td>
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
