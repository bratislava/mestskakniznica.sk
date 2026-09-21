export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "city-library"),
      user: env("DATABASE_USERNAME", "city-library"),
      password: env("DATABASE_PASSWORD", "password"),
      schema: env("DATABASE_SCHEMA", "public"), // Not required
    },
    debug: false,
  },
});
