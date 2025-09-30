const express = require('express');
const cors = require('cors');
const app = express();

// Middleware CORS pour permettre les requêtes depuis le frontend
app.use(cors({
  origin: '*', // Port du frontend React
  credentials: true
}));

app.use(express.json());

let tasks = [
	{ id: 1, title: 'Préparer TP5', description: 'Préparer le TP5 pour les CDA à l\'EKOD, reprendre le TP3 et ajouter un frontend.', completed: true },
	{ id: 2, title: 'Faire les courses', description: 'Acheter du pain, du lait et des œufs.', completed: false },
	{ id: 3, title: 'Appeler le plombier', description: 'Prendre rendez-vous pour la fuite dans la salle de bain.', completed: false }
];
let nextId = 2;

// POST /tasks : Ajoute une nouvelle tâche
app.post('/tasks', (req, res) => {
	const { title, description, completed } = req.body;
	if (!title) {
		return res.status(400).json({ error: 'Le titre est requis.' });
	}
	const task = { 
		id: nextId++, 
		title, 
		description: description || '', 
		completed: !!completed 
	};
	tasks.push(task);
	res.status(201).json(task);
});

// GET /tasks : Récupère la liste complète des tâches
app.get('/tasks', (req, res) => {
    if(req.query.status && req.query.status === 'completed'){
        return res.json(tasks.filter(t => t.completed));
    }
	res.json(tasks);
});

// PUT /tasks/:id : Modifie une tâche spécifique
app.put('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { title, description, completed } = req.body;
	const task = tasks.find(t => t.id === id);
	if (!task) {
		return res.status(404).json({ error: 'Tâche non trouvée.' });
	}
	if (title !== undefined) task.title = title;
	if (description !== undefined) task.description = description;
	if (completed !== undefined) task.completed = !!completed;
	res.json(task);
});

// DELETE /tasks/:id : Supprime une tâche spécifique
app.delete('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = tasks.findIndex(t => t.id === id);
	if (index === -1) {
		return res.status(404).json({ error: 'Tâche non trouvée.' });
	}
	const deleted = tasks.splice(index, 1)[0];
	res.json(deleted);
});

// PATCH /tasks/:id/completed : Bascule l'état d'une tâche a complétée
app.patch('/tasks/:id/completed', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée.' });
    }
    task.completed = !task.completed;
	console.log(`Tâche "${task.title}" ${task.completed ? "complétée" : "non complétée"}`);
    res.json(task);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
