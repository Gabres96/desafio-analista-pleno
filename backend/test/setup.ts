if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    'postgresql://admin:adminpassword@db:5432/luto_curitiba';
}
