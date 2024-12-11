import React, { useEffect, useState } from "react";
import axios from "axios";

const Championships = () => {
  const [championships, setChampionships] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [editingChampionship, setEditingChampionship] = useState(null);

  // Carrega os campeonatos do backend
  useEffect(() => {
    fetchChampionships();
  }, []);

  const fetchChampionships = async () => {
    try {
      const response = await axios.get("/api/champs");
      setChampionships(response.data);
    } catch (error) {
      console.error("Erro ao buscar campeonatos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingChampionship) {
        // Atualiza o campeonato
        await axios.put(`/api/champs/${editingChampionship.id}`, formData);
        setEditingChampionship(null);
      } else {
        // Cria um novo campeonato
        await axios.post("/api/champs", formData);
      }
      setFormData({ name: "" });
      fetchChampionships();
    } catch (error) {
      console.error("Erro ao salvar campeonato:", error);
    }
  };

  const handleEdit = (championship) => {
    setEditingChampionship(championship);
    setFormData({
      name: championship.name,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/champs/${id}`);
      fetchChampionships();
    } catch (error) {
      console.error("Erro ao excluir campeonato:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gerenciamento de Campeonatos</h1>

      <div className="mt-4">
        <h3>
          {editingChampionship
            ? "Editar Campeonato"
            : "Adicionar Novo Campeonato"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Campeonato</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingChampionship
              ? "Atualizar Campeonato"
              : "Adicionar Campeonato"}
          </button>
          {editingChampionship && (
            <button
              type="button"
              className="btn btn-secondary mt-3 ms-3"
              onClick={() => {
                setEditingChampionship(null);
                setFormData({ name: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="mt-5">
        <h3>Lista de Campeonatos</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {championships.map((championship) => (
              <tr key={championship.id}>
                <td>{championship.name}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(championship)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(championship.id)}
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

export default Championships;
