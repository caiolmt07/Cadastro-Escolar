import { useEffect, useState } from 'react';
import AddCard from './components/addCard';
import axios from 'axios';
import './App.css';

interface Aluno {
  id_aluno: number;
  nomeCompleto: string;
  dataNascimento: string;
  numeroMatricula: string;
  email: string;
  telefone: string;
  endereco: string;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([]);

  const [isVisible, setVisible] = useState(false);
  const handleButton = () => {
    setVisible((prev) => {
      if (prev) {
        setEditingAluno(null);
      }
      return !prev;
    });
  };
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
        setFilteredAlunos(alunos);
    } else {
        const query = searchQuery.toLowerCase();
        const filtered = alunos.filter(aluno =>
            aluno.nomeCompleto.toLowerCase().includes(query) ||
            aluno.numeroMatricula.includes(query) ||
            aluno.email.toLowerCase().includes(query)
        );
        setFilteredAlunos(filtered);
    }
}, [searchQuery, alunos]);

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:8090/aluno');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  // Método POST
  const handleSubmit = async (formData: any) => {
    await axios.post('http://localhost:8090/aluno', formData);
    fetchAlunos();
    handleButton();
  };

  // Método DELETE
  const handleDelete = async (id_aluno: number) => {
    try {
      console.log('ID do aluno a ser deletado:', id_aluno);
      await axios.delete(`http://localhost:8090/aluno/${id_aluno}`);
      fetchAlunos();
    } catch (error) {
      console.log('Erro ao excluir aluno: ', error);
    }
  };

  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);

  const handleUpdate = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setVisible(true);
  };

  const handleSave = async (formData: any) => {
    try {
      if (editingAluno) {
        await axios.put(`http://localhost:8090/aluno/${editingAluno.id_aluno}`, formData);
        setEditingAluno(null);
      } else {
        await axios.post('http://localhost:8090/aluno', formData);
      }
      fetchAlunos();
      handleButton();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  return (
    <>
        <div className="container">
            <h1>Cadastro Escolar</h1>
            <div className="bar">
                <div className="searchbar">
                    <button id="search">
                        <span>🔍</span>
                    </button>
                    <input
                        type="text"
                        id="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar por nome, matrícula ou e-mail"
                    />
                </div>
                <button onClick={handleButton} className='add'>
                    <span>Adicionar aluno</span>
                </button>
            </div>
            {isVisible ? (
                <AddCard
                    onCancel={handleButton}
                    onSave={handleSave}
                    initialData={editingAluno ? {
                        nomeCompleto: editingAluno.nomeCompleto,
                        dataNascimento: editingAluno.dataNascimento,
                        numeroMatricula: editingAluno.numeroMatricula,
                        email: editingAluno.email,
                        telefone: editingAluno.telefone,
                        endereco: editingAluno.endereco
                    } : undefined}
                />
            ) : (
                <div className="lista">
                    {filteredAlunos.length > 0 ? (
                        filteredAlunos.map((aluno) => (
                            <div key={aluno.id_aluno} className="aluno-list">
                                <div className="ro">
                                    <span>👤</span>
                                    <p>
                                        <strong>{aluno.nomeCompleto}</strong> matrícula: {aluno.numeroMatricula} <br />
                                        contato: {aluno.email} | {aluno.telefone} | {aluno.endereco}
                                    </p>
                                </div>
                                <div className="btns">
                                    <button onClick={() => handleDelete(aluno.id_aluno)}>Deletar</button>
                                    <button onClick={() => handleUpdate(aluno)}>Atualizar</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum aluno encontrado</p>
                    )}
                </div>
            )}
        </div>
    </>
);


}

export default App;
