FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Suppress Prisma update notices in logs
ENV PRISMA_HIDE_UPDATE_MESSAGE=1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3001

CMD set -x && node -e "const {execSync}=require('child_process');try{execSync('npx prisma migrate deploy',{stdio:'inherit',timeout:30000})}catch(e){console.error('Migration failed:',e.message)}" && echo "=== Starting node dist/main ===" && node dist/main
