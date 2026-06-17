# frontend/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# A porta padrão do Vite
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]