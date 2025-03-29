## Getting Started

create .env.local
AUTH_SECRET=generated auth secret (pnpm dlx auth secret)

Google OAuth Configuration: https://console.developers.google.com/apis/credentials
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

create .env
DB setup
$ docker run -d --name kalorize-postgres -p 5432:5432 -e POSTGRES_PASSWORD=admin123 -v kalorize-postgres:/var/lib/postgresql/data postgres

Connection string
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/kalorize

execute when making changes to schema
pnpm exec prisma migrate dev

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
