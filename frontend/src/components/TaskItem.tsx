import { Form, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Task } from '../api';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) => {
  return (
    <div className={`d-flex align-items-start p-3 mb-2 border rounded ${task.completed ? 'bg-light' : 'bg-white'}`}>
      {/* Checkbox pour marquer comme complété */}
      <Form.Check
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="me-3 mt-1"
      />
      
      {/* Contenu de la tâche */}
      <div className="flex-grow-1">
        <h6 
          className={`mb-1 ${task.completed ? 'text-muted text-decoration-line-through' : ''}`}
        >
          {task.title}
        </h6>
        {task.description && (
          <p 
            className={`mb-0 small ${task.completed ? 'text-muted text-decoration-line-through' : 'text-secondary'}`}
          >
            {task.description}
          </p>
        )}
      </div>
      
      {/* Boutons d'action */}
      <div className="ms-3">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onEdit(task)}
          className="me-2"
          disabled={task.completed}
        >
          <FaEdit />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          <FaTrash />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;