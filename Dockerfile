# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create a smaller production image
FROM node:20-slim

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
