// Service API simple pour gérer les tâches

// Interface pour définir la structure d'une tâche
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Type pour créer une nouvelle tâche
export interface CreateTaskRequest {
  title: string;
  description?: string;
  completed: boolean;
}

// Type pour mettre à jour une tâche
export interface UpdateTaskRequest {
  title: string;
  description?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Fonction pour récupérer toutes les tâches
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des tâches');
  }
  return response.json();
};

// Fonction pour créer une nouvelle tâche
export const createTask = async (title: string, description: string = ''): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, completed: false } as CreateTaskRequest),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création de la tâche');
  }
  return response.json();
};

// Fonction pour modifier une tâche
export const updateTask = async (id: number, title: string, description: string = ''): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description } as UpdateTaskRequest),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la modification de la tâche');
  }
  return response.json();
};

// Fonction pour basculer l'état completed d'une tâche
export const toggleTaskCompleted = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}/completed`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Erreur lors du changement d\'état de la tâche');
  }
  return response.json();
};

// Fonction pour supprimer une tâche
export const deleteTask = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la tâche');
  }
  return response.json();
};