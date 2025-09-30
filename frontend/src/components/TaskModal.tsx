import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { Task } from '../api';

interface TaskModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (title: string, description: string) => void;
  task?: Task | null;
}

const TaskModal = ({ show, onHide, onSave, task = null }: TaskModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Mettre à jour le titre et la description quand on édite une tâche
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {task ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titre de la tâche *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le titre de la tâche..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Entrez une description pour la tâche (optionnel)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={!title.trim()}
          >
            {task ? 'Modifier' : 'Créer'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;