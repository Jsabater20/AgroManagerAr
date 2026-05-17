FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Suppress Prisma update notices in logs
ENV PRISMA_HIDE_UPDATE_MESSAGE=1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build

# Verify the build output exists
RUN ls -la /app/dist/main.js && echo "BUILD OK: dist/main.js found"

# Fix CRLF line endings in startup script (Windows git may have converted them)
RUN sed -i 's/\r//' /app/start.sh && chmod +x /app/start.sh

EXPOSE 3001

CMD ["/bin/sh", "/app/start.sh"]
