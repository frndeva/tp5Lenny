import { useState, useEffect } from 'react';
import { Container, Navbar, Button, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import type { Task } from './api';
import { getTasks, createTask, updateTask, toggleTaskCompleted, deleteTask } from './api';

function App() {
  // États pour gérer les tâches et l'interface
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Charger les tâches au démarrage
  useEffect(() => {
    loadTasks();
  }, []);

  // Fonction pour charger toutes les tâches
  const loadTasks = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le modal pour créer une nouvelle tâche
  const handleCreateTask = (): void => {
    setEditingTask(null);
    setShowModal(true);
  };

  // Ouvrir le modal pour modifier une tâche
  const handleEditTask = (task: Task): void => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Sauvegarder une tâche (créer ou modifier)
  const handleSaveTask = async (title: string, description: string): Promise<void> => {
    try {
      if (editingTask) {
        // Modifier une tâche existante
        const updatedTask = await updateTask(editingTask.id, title, description);
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
      } else {
        // Créer une nouvelle tâche
        const newTask = await createTask(title, description);
        setTasks([...tasks, newTask]);
      }
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  // Basculer l'état completed d'une tâche
  const handleToggleComplete = async (id: number): Promise<void> => {
    try {
      const updatedTask = await toggleTaskCompleted(id);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = async (id: number): Promise<void> => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      }
    }
  };

  return (
    <div className="App">
      {/* Barre de navigation */}
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>📝 Gestionnaire de Tâches</Navbar.Brand>
          <Button 
            variant="light" 
            onClick={handleCreateTask}
            className="d-flex align-items-center"
          >
            <FaPlus className="me-2" />
            Créer une tâche
          </Button>
        </Container>
      </Navbar>

      {/* Affichage des erreurs */}
      {error && (
        <Container>
          <Alert 
            variant="danger" 
            dismissible 
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        </Container>
      )}

      {/* Liste des tâches */}
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {/* Modal pour créer/modifier des tâches */}
      <TaskModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}

export default App;
