#!/bin/sh
set -e

echo "========================================"
echo "=== RAILWAY STARTUP DIAGNOSTICS      ==="
echo "========================================"
echo "NODE_VERSION : $(node --version)"
echo "NPM_VERSION  : $(npm --version)"
echo "PORT         : ${PORT:-NOT SET}"
echo "NODE_ENV     : ${NODE_ENV:-NOT SET}"
echo "PWD          : $(pwd)"
echo ""

echo "=== /app/dist contents ==="
ls -la /app/dist/ 2>&1 || { echo "ERROR: /app/dist not found - BUILD FAILED?"; exit 1; }
echo ""

echo "=== Verifying dist/src/main.js ==="
if [ -f "/app/dist/src/main.js" ]; then
  echo "OK: /app/dist/src/main.js exists"
else
  echo "ERROR: /app/dist/src/main.js NOT FOUND - nest build failed?"
  exit 1
fi
echo ""

echo "=== Running Prisma migrations ==="
cd /app
npx prisma migrate deploy 2>&1
MIGRATE_CODE=$?
echo "Migration exit code: ${MIGRATE_CODE}"
echo ""

echo "=== Starting NestJS (node /app/dist/src/main.js) ==="
node /app/dist/src/main.js 2>&1
EXIT_CODE=$?
echo "=== node exited with code: ${EXIT_CODE} ==="
exit ${EXIT_CODE}
