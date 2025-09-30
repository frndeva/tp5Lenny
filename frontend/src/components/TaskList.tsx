import { Container, Row, Col, Alert } from 'react-bootstrap';
import TaskItem from './TaskItem';
import type { Task } from '../api';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, loading, error, onToggleComplete, onEdit, onDelete }: TaskListProps) => {
  if (loading) {
    return (
      <Container className="mt-4">
        <Alert variant="info">Chargement des tâches...</Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Erreur : {error}</Alert>
      </Container>
    );
  }

  if (tasks.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">Aucune tâche pour le moment. Créez votre première tâche !</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;