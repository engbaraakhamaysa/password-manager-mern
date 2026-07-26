# Development
docker compose up -d --build

# Test
docker compose -f docker-compose.test.yml up -d --build

# Production
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build

                 Docker Host
                     │
       ┌─────────────┼──────────────┐
       │             │              │
       ▼             ▼              ▼
    DEV Project   TEST Project   PROD Project
       │             │              │
       ▼             ▼              ▼
    API :5000     API :5001      API :5002
       │             │              │
       ▼             ▼              ▼
 Mongo :27017   Mongo :27018    MongoDB Atlas