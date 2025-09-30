# Image de base
FROM node:20-alpine

# Copier les fichiers de l'application dans le container
COPY . /app

# Définir le répertoire de travail dans le container
WORKDIR /app

# Commande exécutée au lancement du container
CMD ["node", "server.js"]