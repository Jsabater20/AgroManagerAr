FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

EXPOSE 3001

CMD node -e "const {execSync}=require('child_process');try{execSync('npx prisma migrate deploy',{stdio:'inherit'})}catch(e){console.error('Migration failed, continuing...',e.message)}" && node dist/src/main
