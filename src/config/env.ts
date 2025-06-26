const requiredEnvVars = ['MONGODB_URI', 'DB_NAME', 'FRONTEND_ORIGIN', 'PORT'];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}
