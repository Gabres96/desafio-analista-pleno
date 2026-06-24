// When running inside Docker, DATABASE_URL is already set by docker-compose.
// This fallback only applies when running tests outside Docker.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    'postgresql://admin:adminpassword@db:5432/luto_curitiba';
}
