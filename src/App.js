import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  const fetchRepositories = async () => {
    const { data } = await api.get('repositories');
    setRepositories(data);
  }

  useEffect(() => {
    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `Novo Repositório ${Date.now()}`,
	      url: `https://github.com/lucasvieira20/new-repository-${Date.now}`,
	      techs: ["NodeJS"]
      })

    setRepositories([...repositories, data])
    } catch(err) {
      console.error(err?.response?.data?.error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (err) {
      console.error(err?.response?.data?.error);
    }
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map(repository => (
          <li key={repository?.id}>
            {repository?.title}

            <button onClick={() => handleRemoveRepository(repository?.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
