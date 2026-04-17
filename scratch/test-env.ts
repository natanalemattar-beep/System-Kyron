const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
if (connectionString) {
  const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
  console.log('Connection URL found:', masked);
} else {
  console.log('No connection string found.');
}
