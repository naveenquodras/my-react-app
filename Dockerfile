# Build the React frontend
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Empty = same-origin /api calls when Express serves the SPA
ARG VITE_API_SERVER=
ENV VITE_API_SERVER=$VITE_API_SERVER

RUN npm run build

# Production image: Express API + static frontend
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY server ./server
COPY --from=build /app/dist ./dist

EXPOSE 3001

CMD ["node", "server/index.js"]
